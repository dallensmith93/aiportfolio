import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { PortfolioProject } from "../../domain/projects";

type CommandPaletteProps = {
  projects: PortfolioProject[];
};

type CommandItem = {
  label: string;
  path: string;
  hint: string;
};

export function CommandPalette({ projects }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const items = useMemo<CommandItem[]>(() => {
    const navigation: CommandItem[] = [
      { label: "Home", path: "/", hint: "Route" },
      { label: "Projects", path: "/projects", hint: "Route" },
      { label: "Playground", path: "/playground", hint: "Route" },
      { label: "About", path: "/about", hint: "Route" },
      { label: "Resume", path: "/resume", hint: "Route" }
    ];

    const projectItems = projects.map((project) => ({
      label: project.title,
      path: `/projects/${project.slug}`,
      hint: project.slug
    }));

    const all = [...navigation, ...projectItems];
    const search = query.trim().toLowerCase();
    if (!search) return all;
    return all.filter((item) =>
      `${item.label} ${item.hint}`.toLowerCase().includes(search)
    );
  }, [projects, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  function selectItem(item: CommandItem) {
    navigate(item.path);
    setOpen(false);
    setQuery("");
  }

  function onListKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (!open || items.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, items.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectItem(items[activeIndex]);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/35 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="mx-auto mt-14 w-full max-w-2xl rounded-xl border border-slate-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onListKeyDown}
          placeholder="Search projects or routes..."
          className="w-full rounded-t-xl border-0 border-b border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <ul className="max-h-72 overflow-y-auto p-2">
          {items.map((item, index) => (
            <li key={`${item.path}-${item.label}`}>
              <button
                type="button"
                className={[
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm",
                  index === activeIndex
                    ? "bg-sky-600 text-white"
                    : "text-slate-900 hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-800"
                ].join(" ")}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectItem(item)}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-80">{item.hint}</span>
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
              No matches.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
