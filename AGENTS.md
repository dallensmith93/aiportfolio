# AGENTS

## Repo Layout
- Monorepo projects: `apps/*`
- Marketing site: `portfolio/*`

## App Structure
- `src/app`
- `src/domain`
- `src/features`
- `src/test`

## Required Scripts (per app)
- `dev`
- `build`
- `lint`
- `typecheck`
- `test`
- `test:coverage`
- `e2e`

## Testing Standard
- Unit/integration: Vitest + RTL + jest-dom
- E2E: Playwright (1 smoke test per app)
- MSW: use only if needed

## Rules
- Keep business logic in `src/domain` (pure TypeScript)
- Keep UI in `src/features`

## README Style
- Keep READMEs short and copy/paste friendly

## Shell/Platform
- Ensure scripts and examples work in Windows PowerShell
