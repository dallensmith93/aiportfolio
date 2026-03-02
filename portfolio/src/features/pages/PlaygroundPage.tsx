import { useMemo, useState } from "react";
import {
  runFeatureFlagsDemo,
  runRuleEngineDemo,
  runSpreadsheetDemo
} from "../../domain/playground";

type DemoKey = "rule-engine-studio" | "feature-flags-control-plane" | "spreadsheet-lite-engine";

export function PlaygroundPage() {
  const [demo, setDemo] = useState<DemoKey>("rule-engine-studio");

  const [age, setAge] = useState("24");
  const [country, setCountry] = useState("US");
  const [userId, setUserId] = useState("user_42");
  const [rollout, setRollout] = useState("35");
  const [targetCountry, setTargetCountry] = useState("US");
  const [cells, setCells] = useState("100,25,40");
  const [discount, setDiscount] = useState("12");

  const result = useMemo(() => {
    if (demo === "rule-engine-studio") {
      return runRuleEngineDemo(
        { age: Number(age), country },
        [
          { field: "age", op: "gt", value: 18 },
          { field: "country", op: "eq", value: "US" }
        ]
      );
    }
    if (demo === "feature-flags-control-plane") {
      return runFeatureFlagsDemo(userId, Number(rollout), targetCountry, country);
    }
    const numbers = cells
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value));
    return runSpreadsheetDemo(numbers, Number(discount));
  }, [demo, age, country, userId, rollout, targetCountry, cells, discount]);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Playground</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Run tiny in-browser demos of domain engines and inspect explanation traces.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["rule-engine-studio", "Rule Engine"],
          ["feature-flags-control-plane", "Feature Flags"],
          ["spreadsheet-lite-engine", "Spreadsheet"]
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setDemo(key as DemoKey)}
            className={[
              "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
              demo === key
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {demo === "rule-engine-studio" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Age
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Country
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </label>
          </div>
        )}

        {demo === "feature-flags-control-plane" && (
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm">
              User ID
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Rollout %
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={rollout}
                onChange={(event) => setRollout(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Target Country
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={targetCountry}
                onChange={(event) => setTargetCountry(event.target.value)}
              />
            </label>
          </div>
        )}

        {demo === "spreadsheet-lite-engine" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Cell values (comma-separated)
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={cells}
                onChange={(event) => setCells(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Discount %
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={discount}
                onChange={(event) => setDiscount(event.target.value)}
              />
            </label>
          </div>
        )}

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm font-semibold">Output</p>
          <p className="mt-1 text-lg font-bold text-sky-600">{result.output}</p>
          <p className="mt-3 text-sm font-semibold">Trace</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {result.trace.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
