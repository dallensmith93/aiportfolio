import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { AskProjectsPanel } from "../components/AskProjectsPanel";
import { ProjectCard } from "../components/ProjectCard";

export function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-panel transition dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          React + TypeScript + Python Development
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          React + TypeScript + Python Portfolio
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">
          A case-study hub for React + TypeScript and Python development where
          domain rules, tests, and documentation are treated as product
          features.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
          >
            Explore Projects
          </Link>
          <Link
            to="/resume"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            Resume View
          </Link>
        </div>
      </section>

      <AskProjectsPanel projects={projects} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Link to="/projects" className="text-sm font-medium text-sky-600">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
