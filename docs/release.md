# Portfolio release — 6 November 2026

## Production verification

The redesign was published successfully from commit `42bc2aeb4e4fa6d2d268044a54a35f794a83eed0`.
Public site: https://gururaj-portfolio-roan.vercel.app/
Immutable deployment: https://gururaj-portfolio-akn7hvglw-guru4514.vercel.app

- Home, all four case-study routes, résumé PDF, robots.txt, and sitemap.xml returned HTTP 200.
- An unknown URL returned HTTP 404 with the custom error page.
- A local DOCX draft and this internal release document returned HTTP 404 on the deployed site.
- Web3Forms accepted one authorized test message; inbox receipt was confirmed by the owner.
- Seven automated tests passed, including the clean-output regression test.
- Google PageSpeed Insights mobile lab report: Performance 91, Accessibility 100, Best Practices 100, SEO 100. FCP 1.5 s, LCP 2.9 s, total blocking time 0 ms, CLS 0.113. These are one lab run, not real-user measurements or an accessibility certification.
- Report: https://pagespeed.web.dev/analysis/https-gururaj-portfolio-roan-vercel-app/wddaqdd4q4?form_factor=mobile
- Follow-up performance work: investigate mobile header initialization/layout shift and reduce oversized image delivery. No score guarantee is implied.

Screenshots and HTTP-check output are retained locally under ignored `artifacts/`.

## Configuration

- Repository: `guru4514/PortFolio`
- Vercel project: `guru4514/gururaj-portfolio`
- Release branch: `codex/portfolio-launch`
- Production branch: `main` (existing production deployment matches its prior HEAD)
- Node: `24.x`
- Build: `npm test && npm run build`
- Static output: `dist`
- No runtime environment variables are required by this implementation.

## Verified preview

Vercel reported successful deployment of commit `c7c5870cb0056cece86ac88cb1dc9120e82e2cb3`.
Preview: https://gururaj-portfolio-neuuuai5d-guru4514.vercel.app
Deployment record: https://vercel.com/guru4514/gururaj-portfolio/37Kxn3TGP86HSGQ7fQsdT8jkiBRb

The preview redirects unauthenticated visitors to Vercel login. This is deployment protection, not an application failure. Do not disable that protection to run checks. Hosted browser checks must use an authorized session or the public production URL after release.

## Rollback record

Previous production source: `62df723c4d910a52de7f25a6baeca528e3cf8b85`.
Previous production deployment: https://gururaj-portfolio-87iyuq9o7-guru4514.vercel.app

If the release fails, use Vercel's rollback to this previous production deployment. Reconcile the production branch with the intended source before the next deployment. Never force-push or discard unrelated work to roll back.

## Domain

Keep the existing canonical URL until a new domain is registered, connected, and working over HTTPS. The requested path is a student .me domain, free for the first year subject to eligibility and availability. Renewal is paid. Registration and connection must finish before changing metadata or redirecting the existing address.

Namecheap's education search reported `gururaj.me` as taken on 6 November 2026. No domain has been registered by this release process.
