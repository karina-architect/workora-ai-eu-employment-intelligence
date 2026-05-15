# Workora AI V6 Ultra Premium — FULL Go Live Package

This is the full deployable Next.js package.

## Included
- V6 ultra premium UI
- AI advisor
- Salary simulator UI with verified-data lock
- Enterprise dashboard / admin panel
- All 27 EU country modules
- EU languages + Russian
- Verified-data gate
- Formspree lead capture: https://formspree.io/f/xkokebwk
- Workora link: https://getworkora.com/
- Source-monitoring GitHub Action

## Critical compliance
Exact tax/social-security/legal values are blocked until source-linked, date-stamped and professionally reviewed.

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel environment variables
- OPENAI_API_KEY
- OPENAI_MODEL=gpt-4.1-mini
- FORMSPREE_ENDPOINT=https://formspree.io/f/xkokebwk
- NEXT_PUBLIC_WORKORA_URL=https://getworkora.com/
- SOURCE_UPDATE_WEBHOOK_URL optional
