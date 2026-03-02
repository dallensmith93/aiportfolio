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
