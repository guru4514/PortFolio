# Verification — 6 November 2026

## Update — 17 November 2026

- Simplified the homepage by removing repeated project navigation, filters, expandable notes, and the repeated engineering-topics section; case-study content remains available.
- Increased small labels, reserved spotlight-control space, and initialized the enhanced header before paint with a five-second fallback if the main module fails to load. No new Core Web Vitals score is claimed.
- Seven existing tests passed; production build checked six pages and 58 local references and emitted 24 public files. Browser JavaScript syntax and Git whitespace checks passed.
- Browser checked desktop, 390px and 320px layouts; all four case studies had no horizontal document overflow at 320px. Verified mobile menu/Escape, spotlight switching, gallery Escape/focus return and theme persistence. No browser warnings/errors were observed in the checked flows.
- Current SDE resume checksum remains unchanged. Personal-contribution and evaluation-claim revisions were excluded at the owner's request.
- Public descriptions and topics were updated and read back for the five featured/project portfolio repositories. After the owner signed in, the GitHub bio and portfolio link were saved and five relevant public repositories were pinned; GitHub confirmed the updates.
- Added five responsive WebP variants (480px and, where useful, 960px) with `srcset`/`sizes` on homepage cards, spotlight and generated case galleries. The 480px files are 56–90% smaller than their originals; full-resolution viewer links remain available. Browser checks confirmed the mobile hero and AgroConnect gallery load 480px variants, spotlight switching clears stale candidates, and the viewer opens originals. No document overflow at 390px or warnings/errors in the checked homepage flow.
- Follow-up build checked six pages and 68 local references and emitted 30 public files; all seven tests, JavaScript syntax and whitespace checks passed.
- Added the Google Search Console HTML verification tag supplied by the owner's signed-in account. Verification and sitemap submission follow production deployment. Project recordings have not been added.

## Original verification

- `npm run build`: passed. Five content pages plus a branded 404 page, 26 public files, including the PDF resume and social image.
- `npm test`: 7 tests passed, 0 failed. Contact requests were mocked; these tests send no messages. The additional build regression test verifies stale-output removal and exclusion of local drafts.
- JavaScript syntax checks for the browser scripts: passed.
- HTML nesting, unique IDs, local assets, internal anchors, image attributes, and JSON-LD checks: passed.
- `git diff --check`: passed (only Windows line-ending conversion notices).
- Browser layouts inspected at widths 320, 390, 768, and 1440 pixels; no horizontal document overflow observed.
- Light/dark switching and preference persistence after reload: verified.
- Mobile menu open, Escape close, section navigation, and focus transfer: verified.
- All/Full-stack/AI filters and disclosure keyboard activation: verified.
- Copy-email confirmation and native empty-form validation: verified.
- Final `dist` bundle loaded in the browser with all six displayed images present. No warning/error console entries returned during the checks.
- Release validation checked six HTML pages and 59 local references, cross-page anchors, ARIA control targets, metadata, and image attributes.
- Version 3 browser checks verified all four case-study routes, architecture panel selection, project filtering, project spotlight arrow/Home keyboard controls, and cross-page mobile navigation.
- Gallery checks verified next/previous states, arrow navigation, Escape dismissal, restored page scrolling, and focus restoration. Fixed focus loss when a navigation button becomes disabled at a gallery boundary, then verified the fix.
- Version 3 layouts inspected at 320, 390, 768, and 1440 pixels, including light and dark themes. No horizontal document overflow or browser warning/error logs observed in these checks.
- Production screenshots saved under ignored `artifacts/`: `portfolio-v3-desktop.png`, `portfolio-v3-mobile.png`, `portfolio-v3-full.png`, and `portfolio-v3-case-study.png`.
- The original public resume PDF and both pre-existing untracked DOCX files are unchanged. DOCX files are absent from the production output.

The screenshot and DOCX paths above describe the original verification. These files were archived outside the repository during the 17 November 2026 cleanup; the current public SDE resume remains in `assets/resume.pdf`.

Production verification is recorded in `docs/release.md`: the site is deployed, the authorized contact test reached the owner's inbox, and a PageSpeed mobile lab report is available. No exhaustive assistive-technology audit or real-user performance measurement was performed. Run `npm run preview` to reopen the production bundle locally.
