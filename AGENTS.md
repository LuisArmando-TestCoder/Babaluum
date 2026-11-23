<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Babaluum rules

Most rules are enforced by `npm run check`. Run it before you finish. If you correct an agent mistake, add a lint rule or a test, not a sentence here.

Judgment calls that are not checks:

- Check every visual change at 390px wide first; most visitors arrive on phones. A character placed over text needs a `compactHome`.
- Above-the-fold entrances use `Intro` or `SplitWords immediate` (CSS), never a `motion` element that starts hidden.
- Sounds only answer something the visitor did, stay under 0.3s, and never carry information on their own. Add a cue in `domain/sound/cues.ts` and point to it with `data-sound`; don't add audio files or play sound on hover, scroll or load.
- Copy lives in `src/content`. Components take it through props. Homepage copy is `src/content/home.ts`, keyed by section. The hero and `integrated` texts are the client's own words: don't reword them unasked. Never bring back template text; `content.test.ts` checks for it.
- New visuals reuse the notch presets in `NotchedSurface/presets.ts` before inventing a shape.
- Sizes and spacing come from the design files. Measure the reference before changing a token, and use `fluid()` so it scales.
- Characters react through `PoseValues`. Add a channel to `domain/rig/pose.ts` (with a test) instead of reading the DOM inside a rig.
