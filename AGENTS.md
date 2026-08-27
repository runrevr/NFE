# North Fork Enterprises — website

Pitch prototype for a redesign of nfenterprises.co. NFE is a woman-owned heavy
civil contractor in Pinehurst, ID. The audience that matters is an estimator at
a prime contractor, at 9pm, the night before a bid.

Full brief: `../NFE-Website-Redesign-Blueprint (1).md`
Design skill packs to apply: [Notion Skills library](https://app.notion.com/p/3c989aa4a55d80d287b3db8419985fcf?v=3c989aa4a55d8023bcce000c2a2315f1)

## Non-negotiables

**No number ships without a source.** Every fact on the site renders from
`src/data/company.ts`, and each stat carries the owner or agency it came from.
Anything unverified is marked `verify: true` — check with NFE before launch, or
use honest plan-sheet language ("depth varies") instead of inventing a figure.
That module is also the intended input for the capability-statement PDF, so
keep values raw and leave formatting to `fmt`.

**Markup is authored in its finished state.** SVGs are complete, counters hold
their final values, sections are visible. Scripts *subtract* initial states, and
only when `motionOK` is true. This one convention keeps reduced-motion, no-JS,
and flash-of-hidden-content correct simultaneously — so never write an animation
that content depends on JS to become readable. Reveals additionally hide only
after a live ScrollTrigger exists, with a synchronous fallback, because an
earlier bug left whole sections stranded at opacity 0.

**Mono for data.** Every number, ID, license, and title-block cell is IBM Plex
Mono. Numbers should look measured, never marketed.

**Motion is restrained.** Strokes draw on, counters tick once, sections reveal
in 200–300ms. Nothing loops except the hero.

## Layout

- `src/data/company.ts` — single source of truth
- `src/scripts/motion.ts` — shared GSAP setup and the global `motionOK` gate
- `src/components/` — one component per homepage section
- `public/hero/` — drop-in slot for the hero video (see its README)

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and
`astro dev logs`. The server runs at http://localhost:4321.

## Documentation

Full documentation: https://docs.astro.build

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
