import { Link } from "react-router-dom";
import type { PortfolioProject } from "../../domain/projects";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-300 bg-white p-5 shadow-panel transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-semibold text-ink dark:text-slate-100">{project.title}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-slate-700 dark:text-slate-400">
        {project.category}
      </p>
      <p className="mt-2 text-sm text-slate-800 dark:text-slate-300">
        {project.shortDescription}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <code className="rounded border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {project.repoPath}
        </code>
        <Link
          to={`/projects/${project.slug}`}
          className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-500"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
