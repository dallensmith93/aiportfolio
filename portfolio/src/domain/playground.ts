export type Rule = {
  field: string;
  op: "eq" | "gt" | "lt" | "includes";
  value: string | number;
};

export type PlaygroundResult = {
  output: string;
  trace: string[];
};

type MusicTrack = {
  title: string;
  artist: string;
  energy: number;
};

const MUSIC_LIBRARY: MusicTrack[] = [
  { title: "Beaver Creek", artist: "Aso, Middle School, Aviino", energy: 32 },
  { title: "Daylight", artist: "Aiguille", energy: 46 },
  { title: "Keep Going", artist: "Sworn", energy: 58 },
  { title: "Nightfall", artist: "Aiguille", energy: 41 },
  { title: "Reflection", artist: "Sworn", energy: 24 },
  { title: "Under the City Stars", artist: "Aso, Middle School, Aviino", energy: 36 },
  { title: "Jazz Cabbage", artist: "Ian Ewing, Strehlow", energy: 63 },
  { title: "Lagoons", artist: "Strehlow, Chris Mazuera", energy: 52 }
];

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "proton.me",
  "protonmail.com"
]);

export function runRuleEngineDemo(input: Record<string, string | number>, rules: Rule[]): PlaygroundResult {
  const trace: string[] = [];
  let passed = true;

  for (const rule of rules) {
    const current = input[rule.field];
    let check = false;
    switch (rule.op) {
      case "eq":
        check = current === rule.value;
        break;
      case "gt":
        check = Number(current) > Number(rule.value);
        break;
      case "lt":
        check = Number(current) < Number(rule.value);
        break;
      case "includes":
        check = String(current ?? "").toLowerCase().includes(String(rule.value).toLowerCase());
        break;
    }
    trace.push(`${rule.field} ${rule.op} ${rule.value} => ${check ? "pass" : "fail"}`);
    if (!check) {
      passed = false;
    }
  }

  return {
    output: passed ? "APPROVED" : "REJECTED",
    trace
  };
}

export function runFeatureFlagsDemo(
  userId: string,
  rollout: number,
  targetingCountry: string,
  country: string
): PlaygroundResult {
  const trace: string[] = [];
  const hash = userId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bucket = hash % 100;
  trace.push(`user bucket: ${bucket}`);
  trace.push(`rollout threshold: ${rollout}`);

  const rolloutPass = bucket < rollout;
  const countryPass = targetingCountry === country;
  trace.push(`country match (${country} === ${targetingCountry}): ${countryPass}`);
  trace.push(`rollout pass: ${rolloutPass}`);

  return {
    output: rolloutPass && countryPass ? "FLAG ON" : "FLAG OFF",
    trace
  };
}

export function runSpreadsheetDemo(
  numbers: number[],
  discountPct: number
): PlaygroundResult {
  const trace: string[] = [];
  const subtotal = numbers.reduce((acc, n) => acc + n, 0);
  trace.push(`subtotal = ${numbers.join(" + ")} = ${subtotal}`);
  const discount = subtotal * (discountPct / 100);
  trace.push(`discount = subtotal * ${discountPct}% = ${discount.toFixed(2)}`);
  const total = subtotal - discount;
  trace.push(`total = subtotal - discount = ${total.toFixed(2)}`);

  return {
    output: `Total: ${total.toFixed(2)}`,
    trace
  };
}

export function runFraudScoringDemo(
  amount: number,
  txLastHour: number,
  billingCountry: string,
  shippingCountry: string
): PlaygroundResult {
  const trace: string[] = [];
  let score = 0;

  const amountRisk = Math.min(40, Math.max(0, Math.floor(amount / 50)));
  score += amountRisk;
  trace.push(`amount risk = min(40, floor(${amount} / 50)) = ${amountRisk}`);

  const velocityRisk = Math.min(35, txLastHour * 5);
  score += velocityRisk;
  trace.push(`velocity risk = min(35, ${txLastHour} * 5) = ${velocityRisk}`);

  const crossBorder = billingCountry.trim().toUpperCase() !== shippingCountry.trim().toUpperCase();
  if (crossBorder) {
    score += 25;
  }
  trace.push(`cross-border risk (${billingCountry} != ${shippingCountry}) = ${crossBorder ? 25 : 0}`);

  const capped = Math.min(100, score);
  const decision = capped >= 70 ? "REVIEW" : "APPROVE";
  trace.push(`final score = min(100, ${score}) = ${capped}`);

  return {
    output: `${decision} (${capped}/100)`,
    trace
  };
}

export function runBacktesterDemo(returns: number[], startingCapital: number): PlaygroundResult {
  const trace: string[] = [];
  let equity = startingCapital;
  let peak = startingCapital;
  let maxDrawdown = 0;

  returns.forEach((dailyReturn) => {
    equity = equity * (1 + dailyReturn / 100);
    peak = Math.max(peak, equity);
    const drawdown = ((peak - equity) / peak) * 100;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  });

  const cumulative = ((equity - startingCapital) / startingCapital) * 100;
  trace.push(`start capital = ${startingCapital.toFixed(2)}`);
  trace.push(`end equity = ${equity.toFixed(2)}`);
  trace.push(`cumulative return = ${cumulative.toFixed(2)}%`);
  trace.push(`max drawdown = ${maxDrawdown.toFixed(2)}%`);

  return {
    output: `PnL ${cumulative.toFixed(2)}% | Max DD ${maxDrawdown.toFixed(2)}%`,
    trace
  };
}

export function runMusicPlayerDemo(input: {
  search: string;
  preferredArtist: string;
  mood: "focus" | "night" | "boost";
}): PlaygroundResult {
  const trace: string[] = [];
  const search = input.search.trim().toLowerCase();
  const preferredArtist = input.preferredArtist.trim().toLowerCase();
  const targetEnergy = input.mood === "focus" ? 35 : input.mood === "night" ? 25 : 60;

  trace.push(`library size: ${MUSIC_LIBRARY.length} tracks`);
  trace.push(`target mood energy (${input.mood}) = ${targetEnergy}`);

  const ranked = MUSIC_LIBRARY.map((track) => {
    let score = 0;

    if (
      search &&
      `${track.title} ${track.artist}`.toLowerCase().includes(search)
    ) {
      score += 50;
    }

    if (preferredArtist && track.artist.toLowerCase().includes(preferredArtist)) {
      score += 35;
    }

    score += Math.max(0, 25 - Math.abs(track.energy - targetEnergy));

    return { track, score };
  }).sort((a, b) => b.score - a.score);

  const [selected, ...queue] = ranked;
  trace.push(`selected: ${selected.track.title} by ${selected.track.artist}`);
  trace.push(`match score: ${selected.score}`);
  trace.push(
    `next up: ${queue
      .slice(0, 2)
      .map(({ track }) => track.title)
      .join(" -> ")}`
  );

  return {
    output: `Now playing: ${selected.track.title} | Queue ready: ${queue.length} tracks`,
    trace
  };
}

function riskLabelFromScore(score: number): "low" | "moderate" | "elevated" | "high" {
  if (score >= 80) return "low";
  if (score >= 65) return "moderate";
  if (score >= 45) return "elevated";
  return "high";
}

export function runJobLegitimacyDemo(input: {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  salaryRange?: string;
  recruiterMessage?: string;
  recruiterEmail?: string;
  postingUrl?: string;
  companyWebsite?: string;
  notes?: string;
}): PlaygroundResult {
  const trace: string[] = [];
  const combined = [
    input.jobTitle,
    input.companyName,
    input.jobDescription,
    input.salaryRange ?? "",
    input.recruiterMessage ?? "",
    input.postingUrl ?? "",
    input.companyWebsite ?? "",
    input.notes ?? ""
  ]
    .join(" ")
    .toLowerCase();

  const suspiciousTokens = ["gift card", "urgent payment", "crypto", "wire fee", "pay to apply", "whatsapp only"];
  const scamHits = suspiciousTokens.filter((token) => combined.includes(token));
  const scamRisk = Math.min(100, scamHits.length * 18 + (input.salaryRange?.trim() ? 0 : 12));

  let postingQuality = 45;
  if (input.jobDescription.length >= 350) postingQuality += 20;
  if (input.jobDescription.toLowerCase().includes("responsibilities")) postingQuality += 8;
  if (input.jobDescription.toLowerCase().includes("requirements")) postingQuality += 8;
  if ((input.salaryRange ?? "").trim()) postingQuality += 10;
  postingQuality = Math.min(100, postingQuality);

  const domainToken = input.companyName.toLowerCase().replace(/\s+/g, "").slice(0, 4);
  const domainSource = (input.companyWebsite ?? input.postingUrl ?? "").toLowerCase();
  const domainConsistency = Math.min(100, 58 + (domainSource.includes(domainToken) ? 28 : 0) + (domainSource.includes("https://") ? 10 : 0));

  const recruiterAuthenticityBase =
    82 -
    (input.recruiterMessage?.toLowerCase().includes("whatsapp only") ? 22 : 0) -
    (input.recruiterMessage?.toLowerCase().includes("send money") ? 20 : 0);

  let recruiterAuthenticity = Math.max(10, recruiterAuthenticityBase);
  let forcedHighRiskEmail = false;
  if (input.recruiterEmail) {
    const recruiterDomain = input.recruiterEmail.toLowerCase().split("@")[1] ?? "";
    if (FREE_EMAIL_DOMAINS.has(recruiterDomain)) {
      forcedHighRiskEmail = true;
      recruiterAuthenticity = Math.min(recruiterAuthenticity, 30);
    }
  }

  const legitimacyScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(postingQuality * 0.34 + domainConsistency * 0.22 + recruiterAuthenticity * 0.24 + (100 - scamRisk) * 0.2)
    )
  );
  const riskLevel = forcedHighRiskEmail ? "high" : riskLabelFromScore(legitimacyScore);
  const confidence = Math.round((Math.max(0.35, Math.min(0.96, (postingQuality + domainConsistency + recruiterAuthenticity) / 300)) * 100));

  trace.push(`legitimacy score: ${legitimacyScore}/100`);
  trace.push(`scam risk score: ${scamRisk}/100`);
  trace.push(`risk level: ${riskLevel}`);
  trace.push(`confidence: ${confidence}%`);
  trace.push(`posting quality: ${postingQuality}, domain consistency: ${domainConsistency}, recruiter authenticity: ${recruiterAuthenticity}`);
  if (forcedHighRiskEmail) {
    trace.push("critical red flag: recruiter uses a free/non-business email domain");
  }
  trace.push(scamHits.length ? `red flags: ${scamHits.join(", ")}` : "red flags: none major detected");
  trace.push("recommended action: verify recruiter identity + role requisition before sharing sensitive details");
  trace.push("follow-up: ask for official domain email, interview stages, and hiring manager confirmation");

  return {
    output: `Legitimacy ${legitimacyScore}/100 | ${riskLevel.toUpperCase()} RISK`,
    trace
  };
}

export function runRecruiterCheckDemo(input: { message: string; recruiterEmail?: string }): PlaygroundResult {
  const lowered = `${input.message} ${input.recruiterEmail ?? ""}`.toLowerCase();
  const redFlags = [
    ["whatsapp only", "Requests unverified off-platform communication"],
    ["send money", "Requests money from candidate"],
    ["gift card", "Mentions gift card payment"],
    ["crypto", "Requests crypto transfer"],
    ["no interview", "Promises hiring without normal interview process"]
  ]
    .filter(([token]) => lowered.includes(token))
    .map(([, reason]) => reason);

  const trustSignals: string[] = [];
  if (lowered.includes("interview")) trustSignals.push("Mentions interview process");
  if (lowered.includes("hiring manager")) trustSignals.push("References hiring manager");
  let forcedHighRiskEmail = false;
  if (input.recruiterEmail) {
    const emailDomain = input.recruiterEmail.toLowerCase().split("@")[1] ?? "";
    if (FREE_EMAIL_DOMAINS.has(emailDomain)) {
      redFlags.push("Recruiter uses free/non-business email domain");
      forcedHighRiskEmail = true;
    } else {
      trustSignals.push("Business-domain recruiter email provided");
    }
  }

  let authenticity = Math.max(8, 88 - redFlags.length * 18 + trustSignals.length * 6);
  if (forcedHighRiskEmail) {
    authenticity = Math.min(authenticity, 30);
  }
  const risk = forcedHighRiskEmail ? "high" : riskLabelFromScore(authenticity);
  const confidence = Math.round((Math.max(0.35, Math.min(0.95, authenticity / 100)) * 100));

  return {
    output: `Authenticity ${authenticity}/100 | ${risk.toUpperCase()} RISK`,
    trace: [
      `confidence: ${confidence}%`,
      trustSignals.length ? `trust signals: ${trustSignals.join("; ")}` : "trust signals: limited",
      redFlags.length ? `red flags: ${redFlags.join("; ")}` : "red flags: none critical",
      "follow-up: request requisition ID and official career-site link",
      "follow-up: confirm interview panel and timeline"
    ]
  };
}

export function runCompanyCredibilityDemo(input: {
  companyName: string;
  domain: string;
  website?: string;
  postingUrl?: string;
}): PlaygroundResult {
  const nameToken = input.companyName.toLowerCase().replace(/\s+/g, "").slice(0, 4);
  const domain = input.domain.toLowerCase();
  const website = (input.website ?? "").toLowerCase();
  const posting = (input.postingUrl ?? "").toLowerCase();

  const consistency = Math.min(100, 52 + (domain.includes(nameToken) ? 28 : 0) + (domain.endsWith(".com") || domain.endsWith(".io") || domain.endsWith(".ai") ? 12 : 0));
  const domainTrust = Math.min(100, consistency + (website.startsWith("https://") ? 10 : 0));
  const legitimacy = Math.round(domainTrust * 0.6 + consistency * 0.4);
  const risk = riskLabelFromScore(legitimacy);

  const trace = [
    `company legitimacy: ${legitimacy}/100 (${risk} risk)`,
    `domain trust: ${domainTrust}, consistency: ${consistency}`,
    website.startsWith("https://") ? "trust signal: website uses HTTPS" : "red flag: website does not use HTTPS"
  ];

  if (posting) {
    trace.push(posting.includes(domain) ? "trust signal: posting URL aligns with company domain" : "red flag: posting URL and company domain mismatch");
  }
  trace.push("recommended action: verify domain ownership and compare against official careers page");

  return {
    output: `Company ${legitimacy}/100 | ${risk.toUpperCase()} RISK`,
    trace
  };
}

export function runLeadScoringDemo(input: {
  source: "organic" | "ads" | "referral";
  companySize: number;
  pagesViewed: number;
  requestedDemo: boolean;
}): PlaygroundResult {
  const trace: string[] = [];
  let score = 0;

  const sourceScore = input.source === "referral" ? 28 : input.source === "organic" ? 18 : 10;
  score += sourceScore;
  trace.push(`source score (${input.source}) = ${sourceScore}`);

  const companySizeScore = Math.min(22, Math.max(0, Math.floor(input.companySize / 50)));
  score += companySizeScore;
  trace.push(`company size score = min(22, floor(${input.companySize} / 50)) = ${companySizeScore}`);

  const engagementScore = Math.min(30, input.pagesViewed * 4);
  score += engagementScore;
  trace.push(`engagement score = min(30, ${input.pagesViewed} * 4) = ${engagementScore}`);

  if (input.requestedDemo) {
    score += 20;
  }
  trace.push(`demo request bonus = ${input.requestedDemo ? 20 : 0}`);

  const finalScore = Math.min(100, score);
  const tier = finalScore >= 75 ? "HOT" : finalScore >= 50 ? "WARM" : "COLD";
  trace.push(`final lead score = min(100, ${score}) = ${finalScore}`);

  return {
    output: `${tier} LEAD (${finalScore}/100)`,
    trace
  };
}

export function runSupportTriageDemo(input: {
  severity: "low" | "medium" | "high" | "critical";
  customerTier: "free" | "pro" | "enterprise";
  impactedUsers: number;
  hasPaymentImpact: boolean;
}): PlaygroundResult {
  const trace: string[] = [];
  let priority = 0;

  const severityScore =
    input.severity === "critical" ? 55 : input.severity === "high" ? 40 : input.severity === "medium" ? 25 : 10;
  priority += severityScore;
  trace.push(`severity score (${input.severity}) = ${severityScore}`);

  const tierScore = input.customerTier === "enterprise" ? 20 : input.customerTier === "pro" ? 12 : 6;
  priority += tierScore;
  trace.push(`customer tier score (${input.customerTier}) = ${tierScore}`);

  const impactScore = Math.min(18, Math.max(0, Math.floor(input.impactedUsers / 25)));
  priority += impactScore;
  trace.push(`impact score = min(18, floor(${input.impactedUsers} / 25)) = ${impactScore}`);

  if (input.hasPaymentImpact) {
    priority += 12;
  }
  trace.push(`payment impact bonus = ${input.hasPaymentImpact ? 12 : 0}`);

  const finalPriority = Math.min(100, priority);
  const queue = finalPriority >= 80 ? "PAGE ON-CALL" : finalPriority >= 55 ? "PRIORITY QUEUE" : "STANDARD QUEUE";
  trace.push(`final priority = min(100, ${priority}) = ${finalPriority}`);

  return {
    output: `${queue} (${finalPriority}/100)`,
    trace
  };
}
