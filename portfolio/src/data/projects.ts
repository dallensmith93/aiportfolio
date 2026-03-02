import type { PortfolioProject } from "../domain/projects";

// AUTO-GENERATED CORE FIELDS by `npm run sync:projects`.
// Custom sections (problem/approach/domainModel/algorithms/edgeCases/tests/nextSteps)
// are intentionally preserved by the sync script.
export const projects: PortfolioProject[] = [
  {
    "title": "Rule Engine Studio",
    "slug": "rule-engine-studio",
    "category": "Decisioning",
    "tags": [
      "Rule Engine",
      "Automation",
      "Validation"
    ],
    "shortDescription": "Composable rules to evaluate applications with explanation traces.",
    "longDescription": "A logic-heavy engine that executes deterministic rule sets against application data. The UI focuses on authoring rules while pure TypeScript domain modules handle evaluation and reasoning traces.",
    "highlights": [
      "Declarative rule model and deterministic execution order.",
      "Trace output for each evaluation step to aid debugging.",
      "Separation between rule authoring UI and domain runtime."
    ],
    "architecture": [
      "src/domain: rule model, evaluator, trace builder",
      "src/features: rule editor, scenario runner, results panel",
      "src/app: route composition and app bootstrap"
    ],
    "tech": [
      "React",
      "TypeScript",
      "Vitest",
      "Playwright"
    ],
    "repoPath": "apps/rule-engine-studio",
    "runCommands": [
      "pnpm -C apps/rule-engine-studio dev"
    ],
    "demoPaths": [
      "/playground?demo=rule-engine-studio"
    ],
    "hasUnitTests": true,
    "hasE2E": true,
    "problem": "Operations teams needed repeatable eligibility decisions without hidden spreadsheet logic.",
    "approach": "Modeled rule conditions as typed predicates and executed them through a predictable evaluator.",
    "domainModel": [
      "Rule { field, operator, value }",
      "EvaluationContext { inputs, metadata }",
      "EvaluationTrace { ruleId, result, rationale }"
    ],
    "algorithms": [
      "Linear scan evaluator with short-circuit options",
      "Weighted score aggregation for composite policies"
    ],
    "edgeCases": [
      "Missing fields in payload",
      "Mixed numeric/string coercion",
      "Conflicting rule outcomes"
    ],
    "tests": [
      "Unit tests for operator semantics",
      "Integration tests for policy bundles",
      "Playwright smoke for scenario runner"
    ],
    "nextSteps": [
      "Add temporal operators for date windows",
      "Introduce versioned policy publishing"
    ]
  },
  {
    "title": "Feature Flags Control Plane",
    "slug": "feature-flags-control-plane",
    "category": "Release Infrastructure",
    "tags": [
      "Feature Flags",
      "Automation",
      "Experimentation"
    ],
    "shortDescription": "Targeted rollouts with deterministic bucketing and audit-ready evaluations.",
    "longDescription": "A feature flag system focused on safe progressive delivery. Domain modules calculate bucket assignment and targeting while the UI provides rollout controls and exposure visibility.",
    "highlights": [
      "Deterministic bucketing for stable rollout behavior.",
      "Audience targeting by traits with explicit precedence.",
      "Exposure trace explaining why a flag resolved on/off."
    ],
    "architecture": [
      "src/domain: bucketing, targeting rules, resolver",
      "src/features: flag management UI, environment toggles",
      "src/test: unit and e2e release safety checks"
    ],
    "tech": [
      "React",
      "TypeScript",
      "Zustand",
      "Vitest",
      "Playwright"
    ],
    "repoPath": "apps/feature-flags-control-plane",
    "runCommands": [
      "pnpm -C apps/feature-flags-control-plane dev"
    ],
    "demoPaths": [
      "/playground?demo=feature-flags-control-plane"
    ],
    "hasUnitTests": true,
    "hasE2E": true,
    "problem": "Teams needed safer releases without shipping hidden behavior or inconsistent targeting.",
    "approach": "Built a deterministic resolver with explicit matching order and explainability metadata.",
    "domainModel": [
      "Flag { key, variants, rollout }",
      "TargetingRule { attribute, comparator, value }",
      "ResolutionResult { enabled, reason, bucket }"
    ],
    "algorithms": [
      "Stable user bucketing modulo 100",
      "Rule precedence with first-match strategy"
    ],
    "edgeCases": [
      "Unknown user attributes",
      "Rollout percentages outside bounds",
      "Variant mismatch after rule edits"
    ],
    "tests": [
      "Unit tests for resolver precedence",
      "Integration tests for segment overrides",
      "Playwright smoke for flag detail navigation"
    ],
    "nextSteps": [
      "Add change approval workflow",
      "Implement metrics-driven auto rollback"
    ]
  },
  {
    "title": "Spreadsheet Lite Engine",
    "slug": "spreadsheet-lite-engine",
    "category": "Data Workflows",
    "tags": [
      "Spreadsheet",
      "Graph",
      "Scheduling"
    ],
    "shortDescription": "Formula evaluation with dependency graph updates and recalculation traces.",
    "longDescription": "A spreadsheet core that parses formulas and evaluates cells through a dependency graph. Domain logic computes recalculation order while the UI visualizes edits and computed values.",
    "highlights": [
      "Dependency graph prevents stale formula values.",
      "Trace output explains recomputation order.",
      "Cycle detection guards invalid formulas."
    ],
    "architecture": [
      "src/domain: parser, dependency graph, evaluator",
      "src/features: grid UI, formula bar, trace inspector",
      "src/test: parser and graph correctness checks"
    ],
    "tech": [
      "React",
      "TypeScript",
      "Vitest",
      "Playwright"
    ],
    "repoPath": "apps/spreadsheet-lite-engine",
    "runCommands": [
      "pnpm -C apps/spreadsheet-lite-engine dev"
    ],
    "demoPaths": [
      "/playground?demo=spreadsheet-lite-engine"
    ],
    "hasUnitTests": true,
    "hasE2E": true,
    "problem": "Analysts needed spreadsheet-like automation with predictable recalculation behavior.",
    "approach": "Implemented a compact formula parser and topological recomputation pipeline in pure TS.",
    "domainModel": [
      "Cell { id, raw, computed }",
      "FormulaAst { op, args }",
      "DependencyGraph { edges, indegree }"
    ],
    "algorithms": [
      "Tokenize + parse arithmetic formula AST",
      "Topological sort for recomputation",
      "Cycle detection via DFS"
    ],
    "edgeCases": [
      "Circular references",
      "Invalid tokens",
      "Empty cell references"
    ],
    "tests": [
      "Unit tests for parser and evaluator",
      "Integration tests for graph recalculation",
      "Playwright smoke for grid interaction"
    ],
    "nextSteps": [
      "Add range functions",
      "Persist workbook snapshots"
    ]
  },
  {
    "title": "Fraud Scoring API",
    "slug": "fraud-scoring-api",
    "category": "Risk Intelligence",
    "tags": [
      "Python",
      "FastAPI",
      "Fraud Detection",
      "Scoring"
    ],
    "shortDescription": "Real-time fraud scoring API with explainable risk factors and review thresholds.",
    "longDescription": "A Python-first fraud scoring service designed for checkout risk decisions under tight latency budgets. It combines deterministic score components, transparent traces, and configurable approval/review thresholds.",
    "highlights": [
      "FastAPI endpoint with typed request/response contracts.",
      "Composable score factors for amount, velocity, and geo mismatch.",
      "Explainability trace suitable for analyst and support workflows."
    ],
    "architecture": [
      "src/domain: scoring policy, thresholds, explanation trace",
      "src/features: scenario runner, risk factor controls",
      "src/test: policy validation and API contract checks"
    ],
    "tech": [
      "Python",
      "FastAPI",
      "Pydantic",
      "Pytest"
    ],
    "repoPath": "apps/fraud-scoring-api",
    "runCommands": [
      "python -m uvicorn src.app.main:app --reload"
    ],
    "demoPaths": [
      "/playground?demo=fraud-scoring-api"
    ],
    "hasUnitTests": true,
    "hasE2E": true,
    "problem": "Fraud teams needed consistent decisions with clear reasons instead of ad-hoc manual reviews.",
    "approach": "Implemented deterministic score factors with transparent traces and strict threshold routing.",
    "domainModel": [
      "FraudSignal { key, value, weight }",
      "RiskScore { total, factors, decision }",
      "DecisionPolicy { approveBelow, reviewBelow }"
    ],
    "algorithms": [
      "Weighted score aggregation with bounded factors",
      "Threshold-based decision routing"
    ],
    "edgeCases": [
      "Missing optional customer fields",
      "Negative or malformed transaction amounts",
      "High-velocity bursts during flash sales"
    ],
    "tests": [
      "Unit tests for each risk factor",
      "Integration tests for decision thresholds",
      "API contract tests for invalid payload handling"
    ],
    "nextSteps": [
      "Add device fingerprint anomaly signal",
      "Introduce model shadow mode for candidate policies"
    ]
  },
  {
    "title": "Quant Backtester Lab",
    "slug": "quant-backtester-lab",
    "category": "Quant Analytics",
    "tags": [
      "Python",
      "Pandas",
      "Backtesting",
      "Finance"
    ],
    "shortDescription": "Strategy backtesting toolkit with PnL curves, drawdown tracking, and parameter sweeps.",
    "longDescription": "A Python backtesting workspace focused on repeatable strategy evaluation. Core domain logic computes position-level performance, cumulative return, and risk metrics while lightweight UI tools expose what changed between runs.",
    "highlights": [
      "Deterministic backtest pipeline from signals to filled positions.",
      "Performance outputs including cumulative return and max drawdown.",
      "Parameter sweep support for controlled strategy tuning."
    ],
    "architecture": [
      "src/domain: signal engine, fills, risk metrics",
      "src/features: run controls, equity chart, summary cards",
      "src/test: metric correctness and scenario-based regression tests"
    ],
    "tech": [
      "Python",
      "Pandas",
      "NumPy",
      "Pytest"
    ],
    "repoPath": "apps/quant-backtester-lab",
    "runCommands": [
      "python -m src.app.cli run-backtest"
    ],
    "demoPaths": [
      "/playground?demo=quant-backtester-lab"
    ],
    "hasUnitTests": true,
    "hasE2E": true,
    "problem": "Trading ideas were hard to compare because each analysis notebook used slightly different assumptions.",
    "approach": "Standardized backtest calculations in domain modules and surfaced risk metrics with reproducible configs.",
    "domainModel": [
      "Signal { timestamp, side, confidence }",
      "Position { entry, exit, size, fees }",
      "BacktestSummary { pnlPct, maxDrawdownPct, winRate }"
    ],
    "algorithms": [
      "Rolling equity curve updates from daily returns",
      "Max drawdown tracking from running peak",
      "Grid search over parameter combinations"
    ],
    "edgeCases": [
      "Sparse trading days",
      "Large overnight gaps",
      "Negative equity prevention for extreme leverage"
    ],
    "tests": [
      "Unit tests for drawdown and return math",
      "Integration tests for signal-to-position flow",
      "Golden dataset regression tests for strategy configs"
    ],
    "nextSteps": [
      "Add walk-forward validation workflow",
      "Export tear sheets for research review"
    ]
  }
];
