# aiportfolio

Monorepo root for app projects and a premium portfolio site.

## Portfolio
Path: `portfolio/`

Highlights:
- Product-style UI with responsive layout and dark mode
- Case-study project details (Problem, Approach, Domain Model, Algorithms, Edge Cases, Tests, Next steps)
- Command palette (`Ctrl+K`) and local "Ask My Projects" assistant with citations
- Interactive playground demos for rule engine, feature flags, spreadsheet logic

Run locally (PowerShell):
```powershell
cd portfolio
npm install
npm run sync:projects
npm run dev
```

Quality checks:
```powershell
cd portfolio
npm run typecheck
npm run test
npm run e2e
npm run build
```

## Deploy
See [DEPLOYMENT.md](./DEPLOYMENT.md) for Netlify + Vercel settings.

## App convenience scripts
Run any app in `apps/<name>` from repo root using `APP`.

```powershell
$env:APP="rule-form-builder"; pnpm run dev:app
$env:APP="rule-form-builder"; pnpm run test:app
$env:APP="rule-form-builder"; pnpm run e2e:app
```
