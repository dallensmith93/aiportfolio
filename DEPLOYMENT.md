# Deployment

## Netlify
### Git-connected
1. Import this repo into Netlify.
2. Configure exactly:
   - Base directory: `portfolio`
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy.

Netlify config source:
- Root [`netlify.toml`](/c:/Users/Dallen/Documents/aiportfolio/netlify.toml) is the single source of truth.

### Manual drag-drop
1. Build locally:
   - `cd portfolio`
   - `npm install`
   - `npm run build`
2. In Netlify, choose **Deploy manually**.
3. Upload `portfolio/dist`.

SPA rewrite is already configured via `portfolio/public/_redirects`:
`/* /index.html 200`

Screenshot placeholders:
- Hero/overview: `portfolio/public/screenshots/home.png`
- Projects grid: `portfolio/public/screenshots/projects.png`
- Project detail: `portfolio/public/screenshots/rule-engine-studio.png`

## Vercel
1. Import this repo in Vercel.
2. Configure:
   - Root directory: `portfolio`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy.

SPA rewrite is configured in `portfolio/vercel.json`.

## Build values
- Build command: `npm run build`
- Publish directory: `dist` (when base is `portfolio`)
