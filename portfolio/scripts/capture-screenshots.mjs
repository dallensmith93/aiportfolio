import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const portfolioRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(portfolioRoot, "..");
const appsRoot = path.join(repoRoot, "apps");
const shotsDir = path.join(portfolioRoot, "public", "screenshots");

const args = process.argv.slice(2);
const allMode = args.includes("--all");
const appArg = args.find((arg) => arg.startsWith("--app="));
const oneApp = appArg?.split("=")[1] || process.env.npm_config_app;

function listApps() {
  if (!fs.existsSync(appsRoot)) {
    return [];
  }

  return fs
    .readdirSync(appsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function ensureShotsDir() {
  fs.mkdirSync(shotsDir, { recursive: true });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForUrl(url, timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // App may still be booting.
    }
    await wait(1000);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function killProcessTree(child) {
  if (!child?.pid) {
    return;
  }

  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
      stdio: "ignore"
    });
    return;
  }

  child.kill("SIGTERM");
}

async function captureForApp(slug, port) {
  const appDir = path.join(appsRoot, slug);
  if (!fs.existsSync(appDir)) {
    throw new Error(`App not found: ${slug} (${appDir})`);
  }

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const dev = spawn(
    npmCmd,
    ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)],
    {
      cwd: appDir,
      stdio: ["ignore", "pipe", "pipe"]
    }
  );

  dev.stdout.on("data", (chunk) => process.stdout.write(`[${slug}] ${chunk}`));
  dev.stderr.on("data", (chunk) => process.stderr.write(`[${slug}] ${chunk}`));

  const url = `http://127.0.0.1:${port}`;
  try {
    console.log(`Starting ${slug} on ${url}...`);
    await waitForUrl(url);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: "networkidle" });

    const output = path.join(shotsDir, `${slug}.png`);
    await page.screenshot({ path: output, fullPage: true });
    await browser.close();
    console.log(`Saved screenshot: ${path.relative(repoRoot, output)}`);
  } finally {
    killProcessTree(dev);
  }
}

async function main() {
  ensureShotsDir();

  const apps = listApps();
  if (apps.length === 0) {
    throw new Error("No apps found in apps/*");
  }

  if (!allMode) {
    if (!oneApp) {
      throw new Error(
        "Missing app name. Use: npm run shots:one --app=<app-slug>"
      );
    }
    await captureForApp(oneApp, 4300);
    return;
  }

  let port = 4300;
  for (const app of apps) {
    await captureForApp(app, port);
    port += 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
