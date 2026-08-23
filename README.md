# Micah Lounge

Mobile-first nightlife prototype with a high-visibility theme-night advertising board and a grounded intelligent concierge.

## Live prototype

**https://micah-lounge.vercel.app**

The live owner-facing prototype is deployed in the `micah-lounge` Vercel project. It demonstrates the visual direction, weekly advertising board and grounded concierge while clearly labelling the sample theme nights as concepts rather than confirmed Micah Lounge events.

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

The Next.js source contains a grounded fallback and an OpenAI Responses API route. It therefore works safely without an API key and becomes AI-assisted when the deployment environment includes:

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

## Deployment architecture

- GitHub `main` is the production source for the full Next.js application.
- Vercel project: `micah-lounge`.
- Current public owner prototype: `https://micah-lounge.vercel.app`.
- The current public prototype is a self-contained deployment for immediate review; the next deployment step is to connect the Vercel project to this GitHub repository and publish the full Next.js application with verified venue data.
