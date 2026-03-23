import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  runBacktesterDemo,
  runFraudScoringDemo,
  runFeatureFlagsDemo,
  runJobLegitimacyDemo,
  runLeadScoringDemo,
  runMusicPlayerDemo,
  runRuleEngineDemo,
  runSpreadsheetDemo,
  runSupportTriageDemo
} from "../../domain/playground";

type DemoKey =
  | "rule-engine-studio"
  | "feature-flags-control-plane"
  | "spreadsheet-lite-engine"
  | "fraud-scoring-api"
  | "quant-backtester-lab"
  | "ai-music-player-codex"
  | "job-legitimacy-checker"
  | "lead-scoring-sandbox"
  | "support-triage-simulator";

const defaultDemo: DemoKey = "rule-engine-studio";
const validDemos = new Set<DemoKey>([
  "rule-engine-studio",
  "feature-flags-control-plane",
  "spreadsheet-lite-engine",
  "fraud-scoring-api",
  "quant-backtester-lab",
  "ai-music-player-codex",
  "job-legitimacy-checker",
  "lead-scoring-sandbox",
  "support-triage-simulator"
]);

const demoOptions: Array<{ key: DemoKey; label: string; hint: string }> = [
  { key: "rule-engine-studio", label: "Rule Engine", hint: "Eligibility decisions" },
  { key: "feature-flags-control-plane", label: "Feature Flags", hint: "Rollout targeting" },
  { key: "spreadsheet-lite-engine", label: "Spreadsheet", hint: "Formula recalculation" },
  { key: "fraud-scoring-api", label: "Fraud API", hint: "Risk thresholds" },
  { key: "quant-backtester-lab", label: "Backtester", hint: "Returns and drawdown" },
  { key: "ai-music-player-codex", label: "AI Music Player", hint: "Library and queueing" },
  { key: "job-legitimacy-checker", label: "Job Legitimacy", hint: "Scam signal analysis" },
  { key: "lead-scoring-sandbox", label: "Lead Scoring", hint: "Sales qualification" },
  { key: "support-triage-simulator", label: "Support Triage", hint: "Priority routing" }
];

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

  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [userId, setUserId] = useState("");
  const [rollout, setRollout] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [cells, setCells] = useState("");
  const [discount, setDiscount] = useState("");
  const [amount, setAmount] = useState("");
  const [txLastHour, setTxLastHour] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [returns, setReturns] = useState("");
  const [startingCapital, setStartingCapital] = useState("");
  const [musicSearch, setMusicSearch] = useState("");
  const [preferredArtist, setPreferredArtist] = useState("");
  const [musicMood, setMusicMood] = useState("focus");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [recruiterMessage] = useState("");
  const [postingUrl, setPostingUrl] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [leadSource, setLeadSource] = useState("organic");
  const [leadCompanySize, setLeadCompanySize] = useState("");
  const [leadPagesViewed, setLeadPagesViewed] = useState("");
  const [leadRequestedDemo, setLeadRequestedDemo] = useState(false);
  const [ticketSeverity, setTicketSeverity] = useState("medium");
  const [ticketTier, setTicketTier] = useState("pro");
  const [ticketImpactedUsers, setTicketImpactedUsers] = useState("");
  const [ticketPaymentImpact, setTicketPaymentImpact] = useState(false);

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
    if (demo === "ai-music-player-codex") {
      return runMusicPlayerDemo({
        search: musicSearch,
        preferredArtist,
        mood:
          musicMood === "night" || musicMood === "boost"
            ? musicMood
            : "focus"
      });
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
    if (demo === "lead-scoring-sandbox") {
      return runLeadScoringDemo({
        source: leadSource === "referral" || leadSource === "ads" ? leadSource : "organic",
        companySize: Number(leadCompanySize),
        pagesViewed: Number(leadPagesViewed),
        requestedDemo: leadRequestedDemo
      });
    }
    if (demo === "support-triage-simulator") {
      return runSupportTriageDemo({
        severity:
          ticketSeverity === "critical" || ticketSeverity === "high" || ticketSeverity === "low"
            ? ticketSeverity
            : "medium",
        customerTier: ticketTier === "enterprise" || ticketTier === "free" ? ticketTier : "pro",
        impactedUsers: Number(ticketImpactedUsers),
        hasPaymentImpact: ticketPaymentImpact
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
    musicSearch,
    preferredArtist,
    musicMood,
    jobTitle,
    companyName,
    jobDescription,
    salaryRange,
    recruiterMessage,
    postingUrl,
    companyWebsite,
    recruiterEmail,
    leadSource,
    leadCompanySize,
    leadPagesViewed,
    leadRequestedDemo,
    ticketSeverity,
    ticketTier,
    ticketImpactedUsers,
    ticketPaymentImpact
  ]);

  const inferredRisk = inferRiskLevel(result.output);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Interactive Playground</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Run tiny in-browser demos of domain engines and inspect explanation traces.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {demoOptions.map(({ key, label, hint }) => (
          <button
            key={key}
            type="button"
            onClick={() => setDemo(key)}
            className={[
              "h-full rounded-xl border px-5 py-4 text-left transition",
              demo === key
                ? "border-sky-600 bg-sky-600 text-white shadow-sm"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-500 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            ].join(" ")}
          >
            <span className="block text-sm font-semibold leading-5 tracking-[0.01em]">{label}</span>
            <span
              className={[
                "mt-1 block text-xs leading-5",
                demo === key ? "text-sky-100" : "text-slate-500 dark:text-slate-400"
              ].join(" ")}
            >
              {hint}
            </span>
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

        {demo === "ai-music-player-codex" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Search Track
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={musicSearch}
                onChange={(event) => setMusicSearch(event.target.value)}
                placeholder="Beaver Creek"
              />
            </label>
            <label className="text-sm">
              Preferred Artist
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={preferredArtist}
                onChange={(event) => setPreferredArtist(event.target.value)}
                placeholder="Aiguille"
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Mood
              <select
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={musicMood}
                onChange={(event) => setMusicMood(event.target.value)}
              >
                <option value="focus">Focus</option>
                <option value="night">Night</option>
                <option value="boost">Boost</option>
              </select>
            </label>
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

        {demo === "lead-scoring-sandbox" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Lead Source
              <select
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={leadSource}
                onChange={(event) => setLeadSource(event.target.value)}
              >
                <option value="organic">Organic</option>
                <option value="ads">Ads</option>
                <option value="referral">Referral</option>
              </select>
            </label>
            <label className="text-sm">
              Company Size
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={leadCompanySize}
                onChange={(event) => setLeadCompanySize(event.target.value)}
              />
            </label>
            <label className="text-sm">
              Pages Viewed
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={leadPagesViewed}
                onChange={(event) => setLeadPagesViewed(event.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="block">Demo Requested</span>
              <input
                type="checkbox"
                className="mt-2 h-4 w-4 rounded border-slate-300 text-sky-600 dark:border-slate-700 dark:bg-slate-950"
                checked={leadRequestedDemo}
                onChange={(event) => setLeadRequestedDemo(event.target.checked)}
              />
            </label>
          </div>
        )}

        {demo === "support-triage-simulator" && (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Severity
              <select
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={ticketSeverity}
                onChange={(event) => setTicketSeverity(event.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </label>
            <label className="text-sm">
              Customer Tier
              <select
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={ticketTier}
                onChange={(event) => setTicketTier(event.target.value)}
              >
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </label>
            <label className="text-sm">
              Impacted Users
              <input
                className="mt-1 w-full rounded border border-slate-300 px-2 py-1 dark:border-slate-700 dark:bg-slate-950"
                value={ticketImpactedUsers}
                onChange={(event) => setTicketImpactedUsers(event.target.value)}
              />
            </label>
            <label className="text-sm">
              <span className="block">Payment Impact</span>
              <input
                type="checkbox"
                className="mt-2 h-4 w-4 rounded border-slate-300 text-sky-600 dark:border-slate-700 dark:bg-slate-950"
                checked={ticketPaymentImpact}
                onChange={(event) => setTicketPaymentImpact(event.target.checked)}
              />
            </label>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
          <p className="text-sm font-semibold tracking-[0.01em]">Output</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
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
          <p className="mt-4 text-sm font-semibold tracking-[0.01em]">Trace</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {result.trace.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
