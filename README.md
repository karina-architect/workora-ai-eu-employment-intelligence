# Workora AI — Final Go Live Fixed Package

This package includes the full Workora AI platform and fixes the Vercel build errors:
- Tailwind v4 PostCSS fixed using `@tailwindcss/postcss`
- `@/*` path alias fixed in `tsconfig.json`
- All required `data/*.json` files included
- `lib/verified-data-gate.ts` included
- Next.js app files included

## Included
- Premium Workora AI UI
- AI advisor API
- Salary simulator UI with verified-data lock
- Enterprise dashboard / admin panel
- All 27 EU country modules
- EU languages + Russian
- Verified-data gate
- Formspree lead capture: https://formspree.io/f/xkokebwk
- Workora link: https://getworkora.com/
- Source-monitoring GitHub Action

## Legal position
Information only — not legal, tax, accounting, payroll or immigration advice.

## Deploy
1. Upload all files/folders to GitHub root.
2. In Vercel, deploy as Next.js.
3. Add environment variables:
   - OPENAI_API_KEY
   - OPENAI_MODEL=gpt-4.1-mini
   - FORMSPREE_ENDPOINT=https://formspree.io/f/xkokebwk
   - NEXT_PUBLIC_WORKORA_URL=https://getworkora.com/
   - SOURCE_UPDATE_WEBHOOK_URL optional
