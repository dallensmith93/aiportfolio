import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  runBacktesterDemo,
  runFraudScoringDemo,
  runFeatureFlagsDemo,
  runRuleEngineDemo,
  runSpreadsheetDemo
} from "../../domain/playground";

type DemoKey =
  | "rule-engine-studio"
  | "feature-flags-control-plane"
  | "spreadsheet-lite-engine"
  | "fraud-scoring-api"
  | "quant-backtester-lab"
  | "rockwell-agency-site";

const defaultDemo: DemoKey = "rule-engine-studio";
const validDemos = new Set<DemoKey>([
  "rule-engine-studio",
  "feature-flags-control-plane",
  "spreadsheet-lite-engine",
  "fraud-scoring-api",
  "quant-backtester-lab",
  "rockwell-agency-site"
]);

function parseDemoKey(value: string | null): DemoKey {
  if (value && validDemos.has(value as DemoKey)) {
    return value as DemoKey;
  }
  return defaultDemo;
}

export function PlaygroundPage() {
  const [searchParams] = useSearchParams();
  const [demo, setDemo] = useState<DemoKey>(() => parseDemoKey(searchParams.get("demo")));

  const [age, setAge] = useState("24");
  const [country, setCountry] = useState("US");
  const [userId, setUserId] = useState("user_42");
  const [rollout, setRollout] = useState("35");
  const [targetCountry, setTargetCountry] = useState("US");
  const [cells, setCells] = useState("100,25,40");
  const [discount, setDiscount] = useState("12");
  const [amount, setAmount] = useState("420");
  const [txLastHour, setTxLastHour] = useState("4");
  const [billingCountry, setBillingCountry] = useState("US");
  const [shippingCountry, setShippingCountry] = useState("CA");
  const [returns, setReturns] = useState("1.2,-0.8,0.4,2.1,-1.3");
  const [startingCapital, setStartingCapital] = useState("10000");

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
    if (demo === "fraud-scoring-api") {
      return runFraudScoringDemo(
        Number(amount),
        Number(txLastHour),
        billingCountry,
        shippingCountry
      );
    }
    if (demo === "quant-backtester-lab") {
      const parsedReturns = returns
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value));
      return runBacktesterDemo(parsedReturns, Number(startingCapital));
    }
    if (demo === "rockwell-agency-site") {
      return {
        output: "Rockwell site showcase ready",
        trace: [
          "Custom WordPress contractor theme",
          "Conversion sections: hero, services, testimonials, FAQ, contact",
          "Use the launch button below to open the local site"
        ]
      };
    }
    const numbers = cells
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value));
    return runSpreadsheetDemo(numbers, Number(discount));
  }, [
    demo,
    age,
    country,
    userId,
    rollout,
    targetCountry,
    cells,
    discount,
    amount,
    txLastHour,
    billingCountry,
    shippingCountry,
    returns,
    startingCapital
  ]);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Playground</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Run tiny in-browser demos of domain engines and inspect explanation traces.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-6">
        {[
          ["rule-engine-studio", "Rule Engine"],
          ["feature-flags-control-plane", "Feature Flags"],
          ["spreadsheet-lite-engine", "Spreadsheet"],
          ["fraud-scoring-api", "Fraud API"],
          ["quant-backtester-lab", "Backtester"],
          ["rockwell-agency-site", "Rockwell Site"]
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

        {demo === "fraud-scoring-api" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm">
              Amount
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Tx Last Hour
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={txLastHour}
                onChange={(event) => setTxLastHour(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Billing Country
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={billingCountry}
                onChange={(event) => setBillingCountry(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Shipping Country
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={shippingCountry}
                onChange={(event) => setShippingCountry(event.target.value)}
              />
            </label>
          </div>
        )}

        {demo === "quant-backtester-lab" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Daily returns % (comma-separated)
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={returns}
                onChange={(event) => setReturns(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Starting Capital
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={startingCapital}
                onChange={(event) => setStartingCapital(event.target.value)}
              />
            </label>
          </div>
        )}

        {demo === "rockwell-agency-site" && (
          <div className="space-y-3">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This playground entry launches your local Rockwell Agency WordPress site.
            </p>
            <a
              href="http://rockwell-agency-site.local"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
            >
              Open Rockwell Site
            </a>
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
