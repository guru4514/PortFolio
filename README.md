# Gururaj B Kandagal — portfolio

A five-page static portfolio focused on software engineering and applied AI. The homepage introduces four public projects; dedicated case studies explain their architecture, decisions, tradeoffs, interfaces, and source code. Content is rendered in HTML, with optional JavaScript enhancements.

## Run and verify

Requires Node.js 24.x and Python 3 for the optional preview server. No npm packages need to be installed.

```powershell
npm run check
npm test
npm run build
npm run preview
```

Open http://127.0.0.1:4174. To preview the working source instead, run `python -m http.server 4174 --bind 127.0.0.1` from this folder. Stop the server with Ctrl+C.

## Editing

- `index.html`: biography, projects, links, education, contact fields, and SEO metadata.
- `css/style.css`: design tokens, layout, dark/light themes, responsive and print styles.
- `css/experience.css`: project spotlight, case-study layouts, galleries, and responsive refinements.
- `data/case-studies.mjs`: public project evidence and case-study copy.
- `scripts/generate-cases.mjs`: generates the four `work/*.html` pages and sitemap. Edit the data or template, then run `npm run generate`; the build also runs this step.
- `js/app.js`: navigation, filters, theme controls, and clipboard interaction.
- `js/experience.js`: keyboard-accessible project tabs, screenshot viewer, architecture explorers, reading progress, and reduced-motion-aware entry animation.
- `js/theme.js`: saved theme selection before first paint.
- `js/form.js`: existing Web3Forms integration with timeout and error recovery.
- `assets/resume.pdf`: existing public resume. The two local DOCX drafts are unchanged and are not included in the deployment build.
- `scripts/build.mjs`: explicit public-asset allowlist, copied to `dist/`.
- `404.html`: branded error page with root-relative assets and navigation.
- `tests/form.test.mjs`: mocked network tests; these never submit real messages.
- `docs/portfolio-review.md`: research, evidence, content decisions, and follow-up priorities.

Project descriptions are deliberately static so they remain accessible without JavaScript and appear in the initial HTML. Without JavaScript, architecture explanations remain visible and gallery links open their image files directly. Use native `details` elements for the homepage technical notes. Keep claims aligned with linked code and evidence.

## Deployment

This repository retains the existing Vercel destination. `vercel.json` specifies `npm test && npm run build` and the `dist` output directory, following [Vercel's file-based configuration](https://vercel.com/docs/project-configuration). Node is pinned to 24.x. The build recreates the generated output directory and verifies its contents against the public-file allowlist. Deploy the updated source through the existing Vercel project/Git workflow. No new hosting account or Sites project is required.

Push a release branch to create a Vercel preview through the connected Git integration. Merge the verified branch into the configured production branch to publish. A local Vercel CLI login is not required for this workflow. Record the previous production deployment before each release.

The canonical, Open Graph, structured-data, and sitemap URLs point to `https://gururaj-portfolio-roan.vercel.app/`. Update all of them together if a custom domain is configured later.

Google Fonts is the only external presentation dependency; system/Georgia fallbacks remain available. The contact form uses the existing public Web3Forms access key. Unit tests cover the client behavior, but provider acceptance and inbox delivery have not been verified by sending a message.
