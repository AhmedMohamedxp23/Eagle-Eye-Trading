# Eagle Eye Trading Est. — Website

Marketing site for Eagle Eye Trading Est., a systems integrator (electrical,
ICT, security and fire/life-safety) based in Riyadh, Kingdom of Saudi Arabia.
Built with Next.js 16 (App Router) and TypeScript.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/                  Route segments (App Router). Each page has its own
                         page.tsx + page.module.css. Pages with interactive
                         state (Products, Contact, RFQ) split into a thin
                         server page.tsx (metadata) + a "*Client.tsx" component.
  components/            Shared UI: Header, Footer, SectionHero, CapabilityDomains,
                         HeroCanvas (animated hero graphic), CountUpStat.
  lib/data.ts             All site content/copy — services, product families,
                         partners, clients, RFQ scopes — as typed data.
public/
  assets/                 Photography, logos, partner/client logos, product images.
  og-image.jpg            Social share preview image.
```

## Content & data

Nearly all copy (services, product families, partner/client logos, RFQ scope
options) lives in [`src/lib/data.ts`](src/lib/data.ts) rather than being
hardcoded in components — update text, add a partner logo, or add a product
by editing that file rather than the page components.

## Scripts

```bash
npm run dev      # start the dev server (Turbopack)
npm run build    # production build
npm run start    # run the production build locally
npm run lint     # ESLint
```

## SEO

- Per-page `<title>`/description via each route's `metadata` export (templated
  as "`Page` | Eagle Eye Trading Est.").
- Open Graph / Twitter card image at `public/og-image.jpg`.
- `robots.ts` and `sitemap.ts` generate `/robots.txt` and `/sitemap.xml`.
- Organization structured data (JSON-LD) in the root layout.
- `metadataBase` and canonical URLs assume the production domain
  `https://www.eagleeye-est.com` — update `SITE_URL` in `layout.tsx`,
  `robots.ts` and `sitemap.ts` if the real domain differs.

## Notes

- Forms (Contact, RFQ) send email via [Resend](https://resend.com) —
  see `src/lib/email.ts` and `src/app/api/{contact,rfq}/route.ts`.
  Configure via `.env.local` (copy `.env.example`): `RESEND_API_KEY`,
  `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`. Submissions deliver to
  `sales@eagleeye-est.com`. RFQ file uploads (PDF/DWG/XLSX, 15MB combined cap)
  are attached to the email for real. Sender is still Resend's shared
  `onboarding@resend.dev` sandbox address — verify the `eagleeye-est.com`
  domain in Resend to send from a branded address and improve deliverability
  (attachment emails have been landing in spam from the sandbox domain).
