import { useMemo, useState } from "react";
import { projects } from "../../data/projects";
import { collectCategories, collectTags, filterProjects } from "../../domain/projects";
import { FilterChips } from "../components/FilterChips";
import { ProjectCard } from "../components/ProjectCard";

export function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const tags = useMemo(() => ["All", ...collectTags(projects)], []);
  const categories = useMemo(() => ["All", ...collectCategories(projects)], []);

  const visible = useMemo(
    () =>
      filterProjects(projects, {
        search,
        tag: activeTag,
        category: activeCategory
      }),
    [search, activeTag, activeCategory]
  );

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Filter by category, tags, or search terms to inspect architecture and
          engineering choices.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <label htmlFor="project-search" className="text-sm font-semibold">
          Search
        </label>
        <input
          id="project-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title, tags, tech..."
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
        />
        <div className="mt-4 space-y-3">
          <FilterChips
            label="Category filters"
            options={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          <FilterChips
            label="Tag filters"
            options={tags}
            active={activeTag}
            onChange={setActiveTag}
          />
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        {visible.length} project{visible.length === 1 ? "" : "s"} found
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
