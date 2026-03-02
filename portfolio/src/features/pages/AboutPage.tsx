export function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          This portfolio is built as a case-study hub for production-style React
          + TypeScript applications with heavy domain logic. The intent is to
          show not only UI outcomes but also algorithmic reasoning and testing
          discipline.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">AI-Assisted Development</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          I used a deliberate agent workflow with coder, tester, docs, and
          reviewer roles to build 20 logic-heavy apps quickly while preserving
          engineering quality.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
          <li>Faster iteration via agentic workflows</li>
          <li>Strong boundaries: domain logic vs UI</li>
          <li>Tests + smoke e2e per app</li>
        </ul>
      </section>
    </div>
  );
}
