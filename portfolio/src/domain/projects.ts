export type PortfolioProject = {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  architecture: string[];
  tech: string[];
  repoPath: string;
  runCommands: string[];
  demoPaths?: string[];
  hasUnitTests: boolean;
  hasE2E: boolean;
  problem: string;
  approach: string;
  domainModel: string[];
  algorithms: string[];
  edgeCases: string[];
  tests: string[];
  nextSteps: string[];
};

export type ProjectQuery = {
  search: string;
  tag: string;
  category: string;
};

export function collectTags(projects: PortfolioProject[]): string[] {
  return Array.from(
    new Set(projects.flatMap((project) => project.tags.map((tag) => tag.trim())))
  ).sort((a, b) => a.localeCompare(b));
}

export function collectCategories(projects: PortfolioProject[]): string[] {
  return Array.from(new Set(projects.map((project) => project.category))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function searchable(project: PortfolioProject): string {
  return [
    project.title,
    project.slug,
    project.category,
    project.shortDescription,
    project.longDescription,
    project.tags.join(" "),
    project.tech.join(" ")
  ]
    .join(" ")
    .toLowerCase();
}

export function filterProjects(
  projects: PortfolioProject[],
  query: ProjectQuery
): PortfolioProject[] {
  const search = query.search.trim().toLowerCase();
  return projects.filter((project) => {
    if (query.tag !== "All" && !project.tags.includes(query.tag)) {
      return false;
    }
    if (query.category !== "All" && project.category !== query.category) {
      return false;
    }
    if (!search) {
      return true;
    }
    return searchable(project).includes(search);
  });
}

export function findProjectBySlug(
  projects: PortfolioProject[],
  slug?: string
): PortfolioProject | undefined {
  if (!slug) {
    return undefined;
  }
  return projects.find((project) => project.slug === slug);
}

export function hasTestingBadge(project: PortfolioProject): boolean {
  return project.hasUnitTests && project.hasE2E;
}
