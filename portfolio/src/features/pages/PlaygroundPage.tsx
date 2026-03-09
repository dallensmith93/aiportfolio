import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  runBacktesterDemo,
  runCompanyCredibilityDemo,
  runFraudScoringDemo,
  runFeatureFlagsDemo,
  runJobLegitimacyDemo,
  runRecruiterCheckDemo,
  runRuleEngineDemo,
  runSpreadsheetDemo
} from "../../domain/playground";

type DemoKey =
  | "rule-engine-studio"
  | "feature-flags-control-plane"
  | "spreadsheet-lite-engine"
  | "fraud-scoring-api"
  | "quant-backtester-lab"
  | "rockwell-agency-site"
  | "job-legitimacy-checker"
  | "recruiter-message-check"
  | "company-credibility-check";

const defaultDemo: DemoKey = "rule-engine-studio";
const validDemos = new Set<DemoKey>([
  "rule-engine-studio",
  "feature-flags-control-plane",
  "spreadsheet-lite-engine",
  "fraud-scoring-api",
  "quant-backtester-lab",
  "rockwell-agency-site",
  "job-legitimacy-checker",
  "recruiter-message-check",
  "company-credibility-check"
]);

function parseDemoKey(value: string | null): DemoKey {
  if (value && validDemos.has(value as DemoKey)) {
    return value as DemoKey;
  }
  return defaultDemo;
}

function inferRiskLevel(output: string): "low" | "moderate" | "elevated" | "high" | null {
  const text = output.toLowerCase();
  if (text.includes("high risk")) return "high";
  if (text.includes("elevated risk")) return "elevated";
  if (text.includes("moderate risk")) return "moderate";
  if (text.includes("low risk")) return "low";
  return null;
}

function riskBadgeClass(level: "low" | "moderate" | "elevated" | "high"): string {
  if (level === "low") {
    return "border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300";
  }
  if (level === "moderate") {
    return "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300";
  }
  if (level === "elevated") {
    return "border-orange-500/40 bg-orange-500/15 text-orange-700 dark:text-orange-300";
  }
  return "border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-300";
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
  const [jobTitle, setJobTitle] = useState("Founding AI Engineer");
  const [companyName, setCompanyName] = useState("NovaRelay");
  const [jobDescription, setJobDescription] = useState(
    "Responsibilities, interview process, and salary transparency included."
  );
  const [salaryRange, setSalaryRange] = useState("$140k-$175k");
  const [recruiterMessage, setRecruiterMessage] = useState(
    "We can schedule a technical interview and share official role details."
  );
  const [postingUrl, setPostingUrl] = useState("https://novarelay.ai/careers/founding-ai-engineer");
  const [companyWebsite, setCompanyWebsite] = useState("https://novarelay.ai");
  const [companyDomain, setCompanyDomain] = useState("novarelay.ai");
  const [recruiterEmail, setRecruiterEmail] = useState("talent@novarelay.ai");

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
    if (demo === "job-legitimacy-checker") {
      return runJobLegitimacyDemo({
        jobTitle,
        companyName,
        jobDescription,
        salaryRange,
        recruiterMessage,
        recruiterEmail,
        postingUrl,
        companyWebsite
      });
    }
    if (demo === "recruiter-message-check") {
      return runRecruiterCheckDemo({ message: recruiterMessage, recruiterEmail });
    }
    if (demo === "company-credibility-check") {
      return runCompanyCredibilityDemo({
        companyName,
        domain: companyDomain,
        website: companyWebsite,
        postingUrl
      });
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
    startingCapital,
    jobTitle,
    companyName,
    jobDescription,
    salaryRange,
    recruiterMessage,
    postingUrl,
    companyWebsite,
    companyDomain,
    recruiterEmail
  ]);

  const inferredRisk = inferRiskLevel(result.output);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Playground</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Run tiny in-browser demos of domain engines and inspect explanation traces.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-9">
        {[
          ["rule-engine-studio", "Rule Engine"],
          ["feature-flags-control-plane", "Feature Flags"],
          ["spreadsheet-lite-engine", "Spreadsheet"],
          ["fraud-scoring-api", "Fraud API"],
          ["quant-backtester-lab", "Backtester"],
          ["rockwell-agency-site", "Rockwell Site"],
          ["job-legitimacy-checker", "Job Legitimacy"],
          ["recruiter-message-check", "Recruiter Check"],
          ["company-credibility-check", "Company Check"]
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
              Rockwell Agency Site is now featured directly in your portfolio projects.
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Use the Projects page to view the full Rockwell project entry and details without leaving the portfolio app.
            </p>
          </div>
        )}

        {demo === "job-legitimacy-checker" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Job Title
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Company
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Job Description
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Salary Range
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={salaryRange}
                onChange={(event) => setSalaryRange(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Company Website
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={companyWebsite}
                onChange={(event) => setCompanyWebsite(event.target.value)}
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Posting URL
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={postingUrl}
                onChange={(event) => setPostingUrl(event.target.value)}
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Recruiter Email
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={recruiterEmail}
                onChange={(event) => setRecruiterEmail(event.target.value)}
              />
            </label>
          </div>
        )}

        {demo === "recruiter-message-check" && (
          <div className="grid gap-3">
            <label className="text-sm">
              Recruiter Message
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={recruiterMessage}
                onChange={(event) => setRecruiterMessage(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Recruiter Email
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={recruiterEmail}
                onChange={(event) => setRecruiterEmail(event.target.value)}
              />
            </label>
          </div>
        )}

        {demo === "company-credibility-check" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Company
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Domain
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={companyDomain}
                onChange={(event) => setCompanyDomain(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Website
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={companyWebsite}
                onChange={(event) => setCompanyWebsite(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Posting URL
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={postingUrl}
                onChange={(event) => setPostingUrl(event.target.value)}
              />
            </label>
          </div>
        )}

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm font-semibold">Output</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-sky-600">{result.output}</p>
            {inferredRisk && (
              <span
                className={[
                  "rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
                  riskBadgeClass(inferredRisk)
                ].join(" ")}
              >
                {inferredRisk} risk
              </span>
            )}
          </div>
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
