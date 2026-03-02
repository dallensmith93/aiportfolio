export type Rule = {
  field: string;
  op: "eq" | "gt" | "lt" | "includes";
  value: string | number;
};

export type PlaygroundResult = {
  output: string;
  trace: string[];
};

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
