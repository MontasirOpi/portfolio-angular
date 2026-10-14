# Fahim Montasir Opi — Portfolio (Angular)

Modern, editorial portfolio rebuilt from scratch in Angular. Source of truth: the previous Flutter portfolio at https://opi.codes and https://github.com/MontasirOpi/portfolio_flutter. Content is paraphrased from that source. No invented education, certifications, awards, metrics, or business results.

## Stack
- Angular 22 (standalone components, signals, control flow)
- TypeScript strict
- SCSS with design tokens in `src/styles/_tokens.scss`
- No heavy state library. Icons are inline SVG (Lucide-style).

## Run
```bash
npm install
npm start
# http://localhost:4200/
```

## Build
```bash
npm run build
# output: dist/portfolio-angular/browser
npx tsc --noEmit -p tsconfig.app.json
```

## Deploy to Vercel (opi.codes)
- This repo includes `vercel.json` with SPA rewrites to `/index.html` and `outputDirectory: dist/portfolio-angular/browser`.
- In Vercel: Import the new repo, Framework = Angular, Build Command = `npm run build`, Output = `dist/portfolio-angular/browser`.
- Do NOT overwrite the live site or change DNS without explicit authorization. Verify the Vercel preview first, then promote.
- Canonical URL is `https://opi.codes/` in `src/index.html`.

## Structure
- `src/app/data/portfolio.data.ts` — typed content (edit projects/skills here)
- `src/app/core/services/theme.service.ts` — light/dark theme signal + localStorage
- `src/app/features/home/components/*` — nav, hero, about, skills, ai-section, projects, experience, workflow, contact, footer
- `src/app/shared/components/*` — section-heading, icon
- `src/assets/images/` — real images copied from source repo (profile, jomi, lms, grocery, fastfood, weather, abohawa_pal, tea)

## Content notes / gaps
- Education, certifications, awards: not in source — omitted.
- Google Antigravity / OpenCode: not in source — omitted.
- Unverified metric claims from source (35% faster, 80% less rebuilds, 20% engagement, 60 FPS claims) omitted entirely.
- Production travel apps (InnoTrip, NoSafer, Travojet, Mehndi) have no repo-specific GitHub links in source — only store links shown.
- NoSafer / Travojet / date picker have no screenshots in source — placeholder initials used.
