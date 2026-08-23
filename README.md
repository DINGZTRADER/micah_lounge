# Mica Lounge

Mobile-first nightlife prototype with a high-visibility theme-night advertising board and a grounded intelligent concierge.

## Live prototype

**https://mica-lounge.vercel.app**

The production Vercel project is now `mica-lounge`. The live prototype runs as the full Next.js application and demonstrates the visual direction, weekly advertising board and grounded concierge while clearly labelling sample theme nights as concepts rather than confirmed Mica Lounge events.

## Owner content console

**https://mica-lounge.vercel.app/owner**

The owner console is deliberately `noindex, nofollow`. It lets the owner prepare:

- exact address and Google Maps URL
- WhatsApp / phone / email
- opening hours
- Instagram / Facebook / TikTok
- confirmed weekly theme nights

Drafts are stored only in the current browser using `localStorage`. The console can copy or download a structured `mica-lounge-content.json` payload for review and publication. It does not directly alter the public website.

## Local path

The existing working folder is:

```text
D:\projects\micah\micah_lounge_project
```

The local folder and GitHub repository retain their original `micah` technical names for now; the public brand is **Mica Lounge**.

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

The current event cards are **concepts for owner approval**, not claims about Mica Lounge's real weekly programme. They are stored under `conceptThemeNights`.

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
- strict grounding against confirmed Mica Lounge facts
- explicit separation between confirmed events and prototype concepts
- automatic fallback if the AI service is unavailable

## Security baseline

- Next.js 16.3.2
- React 19.2.8
- React DOM 19.2.8
- Node.js runtime for the concierge API
- latest Mica production install reported zero npm vulnerabilities

## Deployment

- Brand: `Mica Lounge`
- GitHub repository: `DINGZTRADER/micah_lounge` (legacy technical slug)
- Branch: `main`
- Vercel project: `mica-lounge`
- Public URL: `https://mica-lounge.vercel.app`
- Owner console: `https://mica-lounge.vercel.app/owner`

The older `micah-lounge` Vercel project is legacy and has been superseded by `mica-lounge`. GitHub remains the canonical source repository.
