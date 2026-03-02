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
  }
];
