import { Link, NavLink, Outlet } from "react-router-dom";
import { projects } from "../../data/projects";
import { CommandPalette } from "../components/CommandPalette";
import { DarkModeToggle } from "../components/DarkModeToggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/playground", label: "Playground" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" }
];

export function SiteLayout() {
  return (
    <div className="min-h-screen text-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-300 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-lg font-bold tracking-tight">
              AI Apps Portfolio
            </Link>
            <kbd className="hidden rounded border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:inline">
              Ctrl+K
            </kbd>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "rounded-lg px-3 py-2 text-sm font-semibold transition",
                      isActive
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "text-slate-800 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
      <CommandPalette projects={projects} />
    </div>
  );
}
