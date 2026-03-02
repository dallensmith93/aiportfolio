import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProjectAssistant } from "../../domain/assistant";
import type { PortfolioProject } from "../../domain/projects";

type AskProjectsPanelProps = {
  projects: PortfolioProject[];
};

export function AskProjectsPanel({ projects }: AskProjectsPanelProps) {
  const [question, setQuestion] = useState("Which projects show strong domain modeling?");
  const [submitted, setSubmitted] = useState(question);
  const assistant = useMemo(() => getProjectAssistant(), []);

  const response = useMemo(
    () => assistant.answer(submitted, projects),
    [assistant, projects, submitted]
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Ask My Projects
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Ask about architecture, testing, or problem domains. Answers are generated
        locally and include citations by project slug.
      </p>
      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(question);
        }}
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          placeholder="How do you handle edge cases in rule engines?"
        />
        <button
          type="submit"
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
        >
          Ask
        </button>
      </form>
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
        {response.answer}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {response.citations.map((citation) => (
          <Link
            key={citation.slug}
            to={`/projects/${citation.slug}`}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {citation.slug}
          </Link>
        ))}
      </div>
    </section>
  );
}
