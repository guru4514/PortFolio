# Portfolio release — 6 November 2026

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
