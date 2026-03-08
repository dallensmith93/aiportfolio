import { Link, useParams } from "react-router-dom";
import { projects } from "../../data/projects";
import { findProjectBySlug, hasTestingBadge } from "../../domain/projects";

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProjectBySlug(projects, slug);

  if (!project) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          This slug is not present in `src/data/projects.ts`.
        </p>
        <Link to="/projects" className="mt-4 inline-block text-sm font-medium text-sky-600">
          Back to projects
        </Link>
      </section>
    );
  }

  return (
    <article className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-7 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {project.category}
          </span>
          {hasTestingBadge(project) && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              Tested: Unit + E2E
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-bold">{project.title}</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {project.longDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-300 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <code className="rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">
            {project.repoPath}
          </code>
          {project.runCommands.map((command) => (
            <code
              key={command}
              className="rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800"
            >
              {command}
            </code>
          ))}
        </div>
        {project.demoPaths && project.demoPaths.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.demoPaths.map((path) => (
              <a
                key={path}
                href={path}
                target={path.startsWith("http") ? "_blank" : undefined}
                rel={path.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-lg border border-sky-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-sky-700 transition hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-800"
              >
                Open demo
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Problem</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{project.problem}</p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Approach</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{project.approach}</p>
        </section>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionList title="Domain Model" items={project.domainModel} />
        <SectionList title="Algorithms" items={project.algorithms} />
        <SectionList title="Edge Cases" items={project.edgeCases} />
        <SectionList title="Tests" items={project.tests} />
      </section>

      <SectionList title="What I'd do next" items={project.nextSteps} />
    </article>
  );
}
