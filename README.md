# Micah Lounge

Premium mobile-first nightlife website with a theme-night advertising board and grounded intelligent concierge.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content updates

Edit `lib/site.ts` to add verified contact details and confirmed theme nights. Only entries with `active: true` appear on the advertising board and are supplied to the concierge.

## Intelligent concierge

The concierge works safely without an API key using a deterministic grounded fallback. To enable AI answers, add `OPENAI_API_KEY` in the deployment environment. The default model is `gpt-5.6-luna` and can be changed with `OPENAI_MODEL`.

The AI route has:
- 300-character question limit
- 8-message history cap
- 8-second upstream timeout
- 180-token output cap
- strict grounding against confirmed Micah Lounge facts
- automatic fallback if the AI service is unavailable

## Deployment

Designed for Vercel or another Next.js-compatible host.
