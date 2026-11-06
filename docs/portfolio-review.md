# Portfolio review and redesign

Reviewed 6 November 2026. The implementation was subsequently published to the existing Vercel project; see `docs/release.md` for deployment verification.

## Positioning

The strongest positioning supported by the available material is **a computer science student building full-stack applications and applied AI projects**, graduating in 2027. The projects show useful engineering topics: offline storage, permission boundaries, document parsing, explainable scoring, live image processing, and authenticated marketplace workflows.

The redesign makes those concrete before listing tools. A recruiter can find the work, repository, resume, education, and contact route without discovering terminal shortcuts or waiting for animations. The primary path is introduction → selected work → background/toolkit → education/leadership → contact.

## Findings in the previous site

| Finding | Why it matters | Implemented change |
| --- | --- | --- |
| The live hero rendered `class="word-highlight">ship.` as visible text. The split-text routine split markup on spaces. | The main introduction was visibly broken. | Removed HTML-string splitting; the complete heading is ordinary HTML. |
| “Production-grade,” “survive production,” 99.12%, 95.6%, and sub-200 ms statements lacked linked evaluation context. | These claims invite questions the public material does not yet answer. | Removed headline statistics and broad deployment claims. Explained observable functionality and limitations instead. |
| DrowseGuard was presented as primarily a CNN pipeline. | Its README specifies EAR/MAR as the baseline and an optional CNN. | Corrected the architecture and described it as a webcam prototype. |
| TalentRank was presented with a classification-accuracy figure. | The inspected scorer applies skill-taxonomy matches and weighted heuristics; a ranking score is not model accuracy. | Described explainable matching and role-specific scoring. |
| “Thoughts” looked like articles but linked back to project repositories. | Visitors could not read the promised articles. | Replaced that repeated section with real inline technical notes. |
| The canonical URL named a different domain from the supplied deployment. | Search and sharing metadata pointed away from the actual site. | Unified canonical, Open Graph, structured data, robots, and sitemap URLs. |
| Projects and much of the content were generated only in JavaScript. | Script failures removed important information. | Put core content directly in HTML; interactive controls progressively enhance it. |
| The form added the access key again despite a hidden key field. | The submitted payload included duplicate values and lacked a time limit. | Kept a single key, added timeout handling, duplicate-submit protection, and persistent feedback. |
| Multiple navigation systems, sound effects, pointer effects, and repeated statistics competed with the projects. | The site asked visitors to learn its interface before evaluating the work. | One navigation system, native cursor/scroll, restrained hover states, and reduced-motion support. |

## Project selection and evidence

**Pigmie / KhataFlow — lead project.** Its public materials describe personal IndexedDB storage, shared Firestore workflows, role permissions, approvals, and a Capacitor Android target. These give a useful product-and-architecture story. The portfolio uses a dashboard screenshot from the repository and distinguishes the Firebase edition from the separate TypeScript rebuild. The newer README's `pigmie-web.pages.dev` address did not resolve during verification; the existing `finance-tracker-9st.pages.dev` address returned HTTP 200 and is used instead. This check verifies reachability, not all hosted functionality. [Repository](https://github.com/guru4514/Finance-Tracker-KhataFlow), [separate rebuild](https://github.com/guru4514/PigmieFinance).

**TalentRank Studio — explainable text processing.** The README and `src/app/services/scoring.py` support parsing PDF/DOCX/TXT, exact and related-skill matching, role-specific weighting, and visible evidence/gaps. A committed test report describes parser/API error cases, but those project tests were not re-run as part of the portfolio work. The portfolio avoids a classification accuracy claim. [Repository](https://github.com/guru4514/AI-Resume-Screening), [scorer](https://github.com/guru4514/AI-Resume-Screening/blob/main/src/app/services/scoring.py), [existing test report](https://github.com/guru4514/AI-Resume-Screening/blob/main/docs/TEST_REPORT.md).

**DrowseGuard — computer vision prototype.** The README documents a Flask dashboard, OpenCV/dlib landmarks, EAR/MAR measurements, an MJPEG feed, and an optional TensorFlow model. It does not establish the previous portfolio's generalized accuracy or latency claims. The revised copy explains the baseline, optional model, and setup constraints. [Repository and setup](https://github.com/guru4514/DrowseGuard-DDDS-).

**AgroConnect — backend fundamentals.** The public README describes crop listings, JWT accounts, email verification, gated contact information, request logging, and rate limits. The portfolio focuses on the access-control workflow instead of claiming measurable improvements in farmer income. [Repository](https://github.com/guru4514/Smart-Agriculture-Marketplace).

The GitHub API returned ten public repositories during this review, including a Forage fork, smaller/empty-looking project entries, and a privacy page. Those are not automatically strong portfolio case studies. The four selected projects have enough documented purpose and implementation detail to tell a clearer story. GitHub profile changes were not made.

## Reference research

[Brittany Chiang's portfolio](https://brittanychiang.com/) makes role, experience, technologies, work, and resume easy to scan. The applicable principle here is evidence near the claim: a visitor should be able to move directly from a project description to its code.

[Lee Robinson's personal site](https://leerob.com/) demonstrates concise positioning and a direct route into substantive work. The useful lesson is editing: fewer, more specific statements create a stronger introduction.

These are qualitative design references, not a universal ranking of the “best” portfolios. Their layouts, copy, and assets were not copied. The new design uses your own portrait and project interfaces, a forest/ivory palette, serif display typography, and small monospace annotations.

## Implementation and quality

- A five-page dependency-free HTML/CSS/JavaScript site; no framework migration is needed for the present scope.
- Four homepage project articles with category filters and native expandable architecture notes, plus four complete case studies generated from editable public project data.
- Interactive project spotlight with keyboard-accessible tabs, screenshot galleries with native-dialog focus handling, architecture explorers, and case-study reading navigation.
- Each case study connects its problem, implementation decisions, tradeoffs, actual interface, and relevant source files. All primary content is present in the HTML without JavaScript.
- Real project imagery served as WebP with intrinsic dimensions and lazy loading below the introduction.
- Dark and light themes with storage-safe preference handling.
- Responsive menu with Escape dismissal, accurate expanded state, and focus transfer on navigation.
- Visible keyboard focus, skip link, descriptive image alternatives, form labels/status, reduced motion, and print styles.
- Correct deployment-domain metadata and a dedicated social preview image.
- Production output includes an explicit public-asset allowlist; local DOCX drafts, research, tests, and old files are excluded.
- Six contact-form tests cover successful acceptance, HTTP errors, network/malformed responses, duplicate submissions, timeouts, invalid inputs, and the bot field. They use mocked requests and send no messages.

## What would strengthen the portfolio next

1. **Document project ownership.** If any work was a group project, identify your exact contribution and collaborators. The available material does not justify inventing team size or claiming sole ownership.
2. **Publish reproducible evaluation for DrowseGuard.** Name the data source, train/validation/test split, sample counts, metrics, confusion matrix, hardware, and latency measurement method before reintroducing performance numbers.
3. **Evaluate TalentRank as a ranking system.** A documented comparison set and ranking metrics would support its quality claims more directly than a generic accuracy percentage. Keep the distinction between a heuristic score and measured outcomes.
4. **Finish GitHub presentation.** Add concise repository descriptions and topics, pin the strongest projects, remove demo placeholders from READMEs, and replace the NestJS starter README in the Pigmie rebuild with project-specific setup and architecture.
5. **Record short demonstrations.** A 60–90 second walkthrough of each primary workflow would make locally hosted projects easier for reviewers to assess. Do not add video buttons until the actual recordings exist.
6. **Keep the public resume consistent.** The existing PDF was preserved rather than replaced with either unreviewed local draft. Reconcile its metrics, dates, and project names with the evidence-backed website before the next application campaign.
7. **Link credentials when available.** Keep certifications secondary until verifiable certificate URLs and exact credential names/dates are available. Education and leadership are retained from the original supplied portfolio and are not independently verified.

## Release status and limits

The source changes and production bundle were published through the existing Vercel Git integration; no new hosting project was created. Mocked form tests passed, and a later authorized live test reached the owner's inbox. The measured PageSpeed mobile results and remaining performance work are recorded in `docs/release.md`. No production traffic improvement or complete accessibility certification is claimed.
