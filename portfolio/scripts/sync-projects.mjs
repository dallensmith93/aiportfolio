import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const portfolioRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(portfolioRoot, "..");
const appsRoot = path.join(repoRoot, "apps");
const outputPath = path.join(portfolioRoot, "src", "data", "projects.ts");

function toTitle(name) {
  return name
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function inferTags(name, description) {
  const source = `${name} ${description}`.toLowerCase();
  const tags = new Set();
  if (source.includes("rule")) tags.add("Rule Engine");
  if (source.includes("feature") || source.includes("flag")) tags.add("Feature Flags");
  if (source.includes("spreadsheet") || source.includes("grid")) tags.add("Spreadsheet");
  if (source.includes("automation") || source.includes("workflow")) tags.add("Automation");
  if (source.includes("graph")) tags.add("Graph");
  if (source.includes("schedule")) tags.add("Scheduling");
  if (tags.size === 0) tags.add("App");
  return [...tags];
}

function inferCategory(tags) {
  if (tags.includes("Rule Engine")) return "Decisioning";
  if (tags.includes("Feature Flags")) return "Release Infrastructure";
  if (tags.includes("Spreadsheet")) return "Data Workflows";
  return "Application";
}

function loadExistingProjects() {
  if (!fs.existsSync(outputPath)) return [];
  const source = fs.readFileSync(outputPath, "utf8");
  const match = source.match(/export const projects:[\s\S]*?=\s*(\[[\s\S]*\]);/);
  if (!match) return [];

  try {
    const sandbox = {};
    vm.createContext(sandbox);
    return vm.runInContext(match[1], sandbox, { timeout: 1000 });
  } catch {
    return [];
  }
}

function readApps() {
  if (!fs.existsSync(appsRoot)) {
    return [];
  }

  return fs
    .readdirSync(appsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function buildProjectFromApp(slug) {
  const appDir = path.join(appsRoot, slug);
  const pkgPath = path.join(appDir, "package.json");
  const pkg = fs.existsSync(pkgPath)
    ? JSON.parse(fs.readFileSync(pkgPath, "utf8"))
    : {};
  const title = pkg.displayName || toTitle(slug);
  const shortDescription = pkg.description || `${title} app in this monorepo.`;
  const tags = inferTags(slug, shortDescription);
  const scripts = pkg.scripts ?? {};
  const runCommands = [
    scripts.dev ? `pnpm -C apps/${slug} dev` : undefined,
    scripts.test ? `pnpm -C apps/${slug} test` : undefined,
    scripts.e2e ? `pnpm -C apps/${slug} e2e` : undefined
  ].filter(Boolean);

  return {
    title,
    slug,
    category: inferCategory(tags),
    tags,
    shortDescription,
    longDescription: `${title} focuses on domain-first logic with a React interface.`,
    highlights: [
      "Domain logic implemented in pure TypeScript.",
      "Feature UI isolated in src/features.",
      "Monorepo scripts and tests are standardized."
    ],
    architecture: [
      "src/domain for business logic",
      "src/features for UI behavior",
      "src/test for unit/integration coverage"
    ],
    tech: ["React", "TypeScript"],
    repoPath: `apps/${slug}`,
    runCommands,
    demoPaths: [],
    hasUnitTests: Boolean(scripts.test),
    hasE2E: Boolean(scripts.e2e),
    problem: "Document operational problem statement.",
    approach: "Summarize architectural approach and delivery strategy.",
    domainModel: ["Describe core entities here"],
    algorithms: ["List key algorithms here"],
    edgeCases: ["List key edge cases here"],
    tests: ["Unit and e2e strategy summary"],
    nextSteps: ["List follow-up improvements"]
  };
}

function upsertProjects(existingProjects, appSlugs) {
  if (appSlugs.length === 0) {
    return existingProjects;
  }

  const existingBySlug = new Map(existingProjects.map((project) => [project.slug, project]));
  const next = appSlugs.map((slug) => {
    const generated = buildProjectFromApp(slug);
    const existing = existingBySlug.get(slug);

    if (!existing) {
      return generated;
    }

    // Safe merge: preserve custom manual fields while refreshing core app metadata.
    return {
      ...generated,
      ...existing,
      title: generated.title,
      slug: generated.slug,
      repoPath: generated.repoPath,
      runCommands: generated.runCommands.length > 0 ? generated.runCommands : existing.runCommands,
      hasUnitTests: generated.hasUnitTests,
      hasE2E: generated.hasE2E
    };
  });

  // Keep manually defined entries that are not app-backed.
  const extras = existingProjects.filter(
    (project) => !appSlugs.includes(project.slug)
  );
  return [...next, ...extras];
}

function render(projects) {
  return `import type { PortfolioProject } from "../domain/projects";

// AUTO-GENERATED CORE FIELDS by \`npm run sync:projects\`.
// Custom sections (problem/approach/domainModel/algorithms/edgeCases/tests/nextSteps)
// are intentionally preserved by the sync script.
export const projects: PortfolioProject[] = ${JSON.stringify(projects, null, 2)};
`;
}

const existing = loadExistingProjects();
const appSlugs = readApps();
const merged = upsertProjects(existing, appSlugs);
fs.writeFileSync(outputPath, render(merged), "utf8");

console.log(
  `Updated ${path.relative(repoRoot, outputPath)} with ${merged.length} project(s). apps scanned: ${appSlugs.length}`
);
