const skills = [
  "React + TypeScript architecture",
  "Python application development",
  "Domain-driven frontend design",
  "Rule engines and evaluation pipelines",
  "Automated testing (Vitest, RTL, Playwright)",
  "Developer tooling and monorepo workflows"
];

export function ResumePage() {
  return (
    <article className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Product-focused software engineer specializing in React + TypeScript
          and Python development, with clean domain boundaries and test-first
          delivery habits.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Core Skills</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Working Model</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Agent-assisted workflow with dedicated coding, testing, documentation,
          and review roles. This keeps iteration speed high without sacrificing
          architecture quality or release confidence.
        </p>
      </section>
    </article>
  );
}
