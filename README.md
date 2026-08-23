# Micah Lounge

Mobile-first nightlife prototype with a high-visibility theme-night advertising board and a grounded intelligent concierge.

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

## Prototype programme

The current event cards are **concepts for owner approval**, not claims about Micah Lounge's real weekly programme. They are stored in `lib/site.ts` under `conceptThemeNights`.

When the owner supplies the actual programme, add the confirmed events to `confirmedThemeNights`. The board automatically switches from the prototype concepts to the live programme.

## Venue details

Add only verified details in `lib/site.ts`:

- WhatsApp
- phone
- exact address
- map URL
- confirmed theme nights

The website deliberately does not invent missing venue details.

## Intelligent concierge

The concierge has a deterministic fallback and therefore works without an API key. To enable AI-assisted answers, add:

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
- no-store response headers
- strict grounding against confirmed Micah Lounge facts
- explicit separation between confirmed events and prototype concepts
- automatic fallback if the AI service is unavailable

## Deployment

Designed for Vercel or another Next.js-compatible host.
