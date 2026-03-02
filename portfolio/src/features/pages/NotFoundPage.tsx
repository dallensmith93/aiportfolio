import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">The page you requested does not exist.</p>
      <Link
        to="/"
        className="mt-5 inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white"
      >
        Return home
      </Link>
    </section>
  );
}
