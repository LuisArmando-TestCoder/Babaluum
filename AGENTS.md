<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Babaluum rules

Most rules are enforced by `npm run check`. Run it before you finish. If you correct an agent mistake, add a lint rule or a test, not a sentence here.

Judgment calls that are not checks:

- Copy lives in `src/content`. Components take it through props.
- New visuals reuse the notch presets in `NotchedSurface/presets.ts` before inventing a shape.
- Characters react through `PoseValues`. Add a channel to `domain/rig/pose.ts` (with a test) instead of reading the DOM inside a rig.
