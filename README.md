# Babaluum web

The Babaluum site: Next.js 16 (App Router), TypeScript, SCSS modules, Lenis smooth scroll and Framer Motion. No Tailwind.

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + eslint + stylelint + tests
npm run build
```

## Architecture

Folders are layers. Each layer may only import from the layers below it, and ESLint enforces this (`eslint.config.mjs`).

```
src/
  app/                 routes only: compose sections, nothing else
  components/
    sections/          page sections (HomeHero, ProgramsGrid, CtaBanner, …) + cast/
    layout/            Header, Footer, Cursor, PageCurtain
    cards/             ProgramCard, OfferCard, StatCard, ProjectCard, PostCard, MemberCard, ReviewCard
    playground/        physics stage that binds the world to the DOM
    characters/        SVG rigs (Robot, Alien, Globe), Artifact, Sticker
    motion/            SplitWords, ScrubWords, Reveal, ImageDrift, CountUp, Tilt, Magnetic, Parallax
    primitives/        Button, Heading, NotchedSurface, Media, Accordion, Icon, …
  content/             all copy and image references (Spanish)
  hooks/               the only place (with providers/) allowed to use effects
  providers/           SmoothScroll (Lenis + MotionConfig)
  domain/              pure TypeScript: physics, NPC behaviors, rig pose, contact rules. No React.
  styles/              tokens (colors, type, spacing, motion) + mixins
```

Each component is a folder: `Name.tsx`, `Name.module.scss`, `index.ts`.

## Guardrails

These are checks, not conventions:

| Rule | Enforced by |
| --- | --- |
| Layer boundaries (e.g. primitives can't import content, routes can't import primitives) | `no-restricted-imports` per folder |
| `useEffect`/`useLayoutEffect` only in `hooks/` and `providers/` | `no-restricted-imports` |
| No `setTimeout`/`setInterval` in components | `no-restricted-globals` |
| No comments (fix the root cause, or encode it as a check) | `tooling/eslint-rules/no-comments.js` |
| A component imports only its own `.module.scss` | `tooling/eslint-rules/scss-module-name.js` |
| No hex colors outside `styles/tokens` and `palette.ts` files | ESLint + Stylelint |
| No enums, no default exports outside routes, no non-null `!` | ESLint |
| Small functions: max 3 params, complexity 10, 90 lines | ESLint |
| z-index from tokens, no `transition: all`, no `!important` | Stylelint |

## The cast: characters and physics

The robot, alien and globe are layered SVG rigs, so every part (head, eyes, antennae, arms, continents) moves on its own. They are NPCs in a small 2D physics world (`src/domain/physics`):

- **NPCs** look at the cursor, lean with their velocity, blink, and smile wider when excited. Roamers (alien, globe) patrol the artifacts that live near their own home and bump them, and steer away from each other so they never stack. Anchored NPCs (the hero robot, the CTA globe) sit in a slot in the headline, sized from that slot, and lean out toward the cursor.
- **Artifacts** (stars, crowns, plus signs, asterisks, pills, the sticker) are light bodies. When an NPC hits one, it gets pushed, spins, and glows from the collision energy, then drifts back home. They flee the cursor, lag behind fast scrolling, and scatter when you click or tap.
- Any body can be pinned to an element (`anchor`) instead of a stage position. The hero cast is pinned to the headline, so the composition holds from phone to desktop.
- `castScaleFor(width)` scales drawings and collision radii on small screens.
- With `prefers-reduced-motion`, the world settles at rest and Lenis is off.

To add a character: draw it in `components/characters/`, take `pose: PoseValues`, and add it with `companion()` in `sections/cast/cast.tsx`.

## Motion

One orchestrated moment per page, then motion that answers the visitor:

- `PageCurtain` (in `app/template.tsx`) is pure CSS, so it plays before hydration on first load and on every navigation. Hero words rise as it lifts.
- `SplitWords` masks headings word by word. `ScrubWords` ties a statement's words to scroll position.
- `Media` reveals every photo with a shutter and drifts the image inside its frame while scrolling.
- `CountUp` counts stats when they enter view. `Tilt` and `Magnetic` follow the pointer on cards and buttons.
- `Cursor` reads `data-cursor` on any element: `"hide"` or a short label such as `"Ver"`.
- `useCarousel` drives the draggable projects strip (drag, buttons and keyboard focus all move the same value).

## Working features

- **Contact form** validates in the browser and on the server (`domain/contact`). `POST /api/contact` forwards the message to `CONTACT_WEBHOOK_URL` when that variable is set. Without it, the form opens the visitor's mail app with the message filled in.
- **Newsletter** (`NewsletterBand`, `domain/newsletter`) posts to `/api/newsletter`, which adds the email to MailerLite when `MAILERLITE_API_KEY` is set. `MAILERLITE_GROUP_ID` picks the group; `MAILERLITE_GROUP_ESCRITORES` and `MAILERLITE_GROUP_STUDIO` optionally send the writers' waitlist and the Studio waitlist to their own groups. The form (`SignupFlow`) asks one thing at a time: email, then an optional name, then a confirmation. The email is saved at the first step, so skipping the name loses nothing. Without the key, production says the newsletter isn't connected yet; `npm run dev` walks through the steps without saving and says so.
- **Program pages** (`/programas/[slug]`) come from `src/content/programPages.ts`. The sign-up buttons read `SIGNUP_LINKS` at the top of that file; they point to the contact form until the real form links arrive.
- **Babaluum Studio** (`/studio`) is a coming-soon page; its copy is `src/content/studio.ts`.
- **Phones first.** Hero text animates in CSS so it paints before scripts load. Characters take a `compactHome` for stages under 640px and stop roaming there, so headlines stay readable.
- **Sound** is synthesized with the Web Audio API (`domain/sound`, `providers/Sound`); there are no audio files. Every link and button answers with a quiet press and release; disclosures play an opening or closing tone; forms play a success or error tone. A control opts out with `data-sound="none"`, names a cue with `data-sound`, and shifts pitch with `data-sound-rate`. The mute button sits in the header on small screens and in the bottom-left corner on wide ones, and the choice is remembered in `localStorage`.
- **Sparks** (`layout/Sparks`) throws a small particle burst from any element marked `data-burst`; large buttons carry it by default.
- **Scroll shading** (`motion/ScrubText`) starts a text faint and fills it in reading order as it scrolls into view. Section asides, card summaries and body paragraphs use it.
- **Working method** steps each open in their own colour with their own board (`phases`, `brand`, `sprints`, `results`), built by `buildMethod` in `src/content/method.ts`.
- **Terms** (`/terminos`) and the **privacy notice** (`/privacidad`) carry the client's 2024 documents word for word, from `src/content/legal.ts`. The terms' numbering skips 5 and 6 in the source.
- **404** is a CSS-drawn saucer, piloted by the alien, lifting the road sign in its beam; it follows the cursor. Copy is `src/content/notFound.ts`.
- **Founder** (`FounderQuote`) shows the quote and portrait from the live babaluum.com homepage, text 60% and photo 40%, stacked on phones. Copy is `src/content/founder.ts`; the photo is `public/images/people/mariana-murillo.webp`.
- **Plans and programs** link to `/contacto?plan=…` or `?programa=…` and prefill the subject.
- **Program cards** jump to their detail on `/programas#slug`.
- **Blog and projects** filter by topic. The featured sliders step through real entries.
- `sitemap.xml` and `robots.txt` are generated from the content files.

## Notched shapes

The cutouts from the design are CSS masks generated by `NotchedSurface/notchMask.ts` (tested). There are two cutters, measured from the design files: a `valley` (two corners meeting in a cusp) and a `step` (a corner plus a 45° slash). Use a preset from `NotchedSurface/presets.ts` or pass your own `{ edge, at, kind, mirror }` list.

## Logo

The logo is traced from the files on babaluum.com (`public/brand/*.svg`) and drawn as a CSS mask, so it takes the text colour of wherever it sits and the "B" shows the background through. `src/app/icon.svg` is the same mark as the favicon.

## Design scale

Sizes come from the 1440px design files and scale fluidly below that width (`fluid()` in `styles/tokens/_typography.scss`): container 1280px with 80px margins, headline 144px, section titles 82px, card titles 46px, body 18px/31px.

## Content status

Homepage copy lives in `src/content/home.ts`, one entry per section (`hero`, `integrated`, `whyChoose`, `method`, `impact`, `blogs`). The hero and `integrated` texts are the client's own. The rest replaced the template's English text with Spanish copy inferred from what the client said about Babaluum, so it still needs their approval; `content.test.ts` fails if template text comes back. Inner pages use real data where babaluum.com has it: the twelve latest articles from its blog feed (title, summary, author, date; each links to the original), the social links, the founder and the program descriptions. Everything else is descriptive copy inferred from the business. There are no invented people, quotes, prices or results: the team lists only the founder, testimonials are empty until real ones arrive, and plans carry no prices. `content.test.ts` enforces this. Stock photos from the design files still illustrate articles and initiatives.

"Iniciar sesión" points to the contact page until a sign-in provider is chosen.
