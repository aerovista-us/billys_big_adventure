# Billy's Big Adventure

Interactive road-trip planner (CDA → Dworshak corridor) with data-driven stops, alerts, source links, and recommendations. **Voice:** playful nods to *Pee-wee’s Big Adventure* (quest energy) and *The Hangover* (wolfpack logistics, adult humor)—still meant for a **real, responsible** trip; jokes are morale, not a playbook.

## What to open

Use **`index.html`** or **`billys_big_adventure.html`** — they are identical. Both embed a copy of the trip JSON so the page works when `fetch` fails (for example `file://`).

## Source of truth

| File | Purpose |
|------|---------|
| `billy_big_adventure_tripdata.json` | Trip entities, routes, alerts, `source_registry`, **`fun_option` side quests** — **edit this** for data changes. Schema **1.1.0** adds `coverage.narrative_voice` and nine scripted side quests in-data (no duplicate list in the shell). |
| `billys_big_adventure.shell.html` | UI, styles, and app script — **edit this** for layout or planner logic. |
| `index.html`, `billys_big_adventure.html` | **Generated** — do not hand-edit. |
| `assets/poster.png` | Preferred hero art when present (e.g. copy from `mini.shops/av-backup/poster.png`). |
| `assets/poster.svg` | Vector fallback if the PNG is missing; loads automatically via `img` `onerror`. |
| `assets/decor.svg` | Landscape / sun / dashed route motif in the hero corner. |

## After you change the JSON or shell

From the repo root:

```bash
node mini.shops/billys_big_adventure/build-embed.mjs
```

Or from this folder:

```bash
node build-embed.mjs
```

That rewrites **both** `index.html` and `billys_big_adventure.html` from `billy_big_adventure_tripdata.json` + `billys_big_adventure.shell.html`.

## Features (current)

- **Poster-inspired theme** — Sky blue, fire red, golden yellow, and forest green; **Lilita One** + **Nunito**; inline SVG icons (dam, UFO, pine, motel, map, fish); dashed “highway” in the hero corridor; `assets/decor.svg` in the hero wash.
- **Copy trip summary** — Markdown-friendly export to the clipboard.
- **Source links** — Alerts, stops, and routes link to entries in `source_registry` when `source_ids` are present.
- **Data version chip** — Shows `schema_version` and `generated_at` from the loaded dataset.
- **Local storage** — Last dates, sliders, and radio choices persist in the browser.
- **Accessibility** — Skip link, in-page nav, `aria-live` for plan updates (not on every slider tick), fieldsets for radio groups, focus-visible outlines, collapsible sections (`<details>`).
- **Live checks** — Quick links to Idaho 511 and ITD travel.

## Optional: HTTP server (live JSON without rebuild)

```bash
npx --yes serve mini.shops/billys_big_adventure
```

The page will `fetch('./billy_big_adventure_tripdata.json')` when served over HTTP.

## Manual JSON load

Use the **Trip JSON** file input if auto-fetch fails.

## Trip data schema highlights (v1.1.0)

- **`coverage.narrative_voice`** — Declares the Pee-wee + Hangover *spirit* vs hard facts; includes a short disclaimer.
- **`coverage.intent_tags`** — Adds `narrative_voice_pee_wee_hangover` and `wolfpack_logistics_humor` for filtering or tooling.
- **`fun_option` entities** — All side quests (museum convoy, velvet suite, rooftop headcount, mystery cooler, Alamo stop, morning kit, singalong tax, tuxedo tow, goose escort fiction) live here; the app no longer duplicates them in JavaScript.
- **`operational_notes.wolfpack_reminders`** — Extra operator-facing reminders in the same voice.

Edit JSON → run `build-embed.mjs` → ship updated `index.html` / `billys_big_adventure.html` if you rely on embedded fallback.
