# Micah Lounge

Mobile-first nightlife prototype with a high-visibility theme-night advertising board and a grounded intelligent concierge.

## Live prototype

**https://micah-lounge.vercel.app**

The live prototype is running as the full Next.js application in the `micah-lounge` Vercel project. It demonstrates the visual direction, weekly advertising board and grounded concierge while clearly labelling sample theme nights as concepts rather than confirmed Micah Lounge events.

## Owner content console

**https://micah-lounge.vercel.app/owner**

The owner console is deliberately `noindex, nofollow`. It lets the owner prepare:

- exact address and Google Maps URL
- WhatsApp / phone / email
- opening hours
- Instagram / Facebook / TikTok
- confirmed weekly theme nights

Drafts are stored only in the current browser using `localStorage`. The console can copy or download a structured `micah-lounge-content.json` payload for review and publication. It does not directly alter the public website.

## Local path

The working folder is intended to be:

```text
D:\projects\micah\micah_lounge_project
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Source-of-truth content

All public venue facts are isolated in `lib/site.ts` so the design does not need to be edited when the owner supplies real information.

Only publish verified details for:

- venue location and exact address
- Google Maps URL
- WhatsApp
- phone
- email
- opening hours
- Instagram / Facebook / TikTok
- confirmed weekly theme nights

The current public prototype deliberately uses **no assumed venue address, phone number, opening hours or social handles**.

## Prototype programme

The current event cards are **concepts for owner approval**, not claims about Micah Lounge's real weekly programme. They are stored under `conceptThemeNights`.

When the owner supplies the actual programme, add the confirmed events to `confirmedThemeNights`. The board automatically switches from the prototype concepts to the live programme.

## Intelligent concierge

The concierge has a deterministic grounded fallback and an OpenAI Responses API route. It therefore works safely without an API key and becomes AI-assisted when the deployment environment includes:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.6-luna
```

The API route includes:

- 300-character question limit
- 8-message history cap
- 12 KB request-body ceiling
- 8-second upstream timeout
- 180-token output cap
- low reasoning effort for latency/cost control
- no-store response headers
- strict grounding against confirmed Micah Lounge facts
- explicit separation between confirmed events and prototype concepts
- automatic fallback if the AI service is unavailable

## Security baseline

- Next.js 16.3.2
- React 19.2.8
- React DOM 19.2.8
- Node.js runtime for the concierge API
- current Vercel install reports zero npm vulnerabilities

## Deployment

- GitHub repository: `DINGZTRADER/micah_lounge`
- Branch: `main`
- Vercel project: `micah-lounge`
- Public URL: `https://micah-lounge.vercel.app`
- Owner console: `https://micah-lounge.vercel.app/owner`

The Vercel project is currently deployed directly from the validated source tree. GitHub remains the canonical source repository.
