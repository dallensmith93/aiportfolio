import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

function resolveInitialTheme(): "dark" | "light" {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function DarkModeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const initial = resolveInitialTheme();
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg border border-slate-400 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:border-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
