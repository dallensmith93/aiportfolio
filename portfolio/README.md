# Portfolio

Premium product-style portfolio and case-study hub for React + TypeScript and Python development.

## Routes
- `/` Home
- `/projects` Projects grid with filters + search
- `/projects/:slug` Project detail
- `/playground` Interactive demos
- `/about`
- `/resume`

## Core features
- Dark mode toggle (persisted)
- Sticky nav + command palette (`Ctrl+K`)
- Ask My Projects panel (local ranking + citations, no API key required)
- Interactive demos for rule engine, feature flags, spreadsheet logic, fraud scoring, and quant backtesting
- Lazy-loaded routes and code splitting

## Commands (PowerShell)
```powershell
cd portfolio
npm install
npm run sync:projects
npm run dev
```

```powershell
cd portfolio
npm run typecheck
npm run test
npm run e2e
npm run build
```

## Data sync
`npm run sync:projects` scans `apps/*/package.json` and upserts project entries in `src/data/projects.ts`.

- Safe merge behavior: custom case-study fields are preserved.
- If `apps/*` is missing, existing entries remain unchanged.
