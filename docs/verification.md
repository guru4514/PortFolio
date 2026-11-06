# Verification — 6 November 2026

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

Limitations: no live message sent, no inbox-delivery verification, no Lighthouse measurement, no exhaustive assistive-technology audit, and no deployment. Preview servers were stopped after verification. Run `npm run preview` to reopen the production bundle locally.
