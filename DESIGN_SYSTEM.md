# Design System

Source of truth for the visual language of this portfolio. Edit here first when you change a color, radius, or component. The goal is to be able to add/remove pages without UI drift.

The system lives in [app/globals.css](app/globals.css). Component tokens are named semantically (`--ink`, `--muted`, `--line`), not by color, so dark-mode or palette changes happen in one place.

## Design principles

1. **Flat, not skeuomorphic.** No inset highlights. No glossy bevels. No colored "premium" drop shadows. Depth comes from borders and spacing, not lighting.
2. **Warm monochrome + one accent.** The palette is a single warm-gray family (cream background, charcoal ink) plus one burnt-orange accent. Never introduce a second accent.
3. **Consistent geometry.** Chips, pills, and icon wells are fully rounded (`9999px`). Cards use `1.25rem`. Large framed containers use `1.5rem`. Nothing in between.
4. **Hierarchy through de-emphasis, not decoration.** Older/archived items use `card-muted` (dashed border, lower opacity, smaller type) rather than a different accent color or icon.
5. **No gradients on cards.** The only gradient in the system is the fixed background mesh in [`globals.css → .mesh-bg`](app/globals.css), which is ambient, fixed, and low-opacity.

## Color tokens

| Token | Role |
|---|---|
| `--bg` `#f3efe7` | Page background (warm cream) |
| `--surface` `#faf6f0` | Cards, raised surfaces |
| `--surface-deep` `#ece6da` | Recessed/secondary surfaces |
| `--ink` `#1a1714` | Primary text |
| `--muted` `#5e574e` | Secondary text |
| `--line` `#d6d0c6` | Default border |
| `--line-strong` `#c3bcad` | Emphasized border |
| `--accent` `#b06b28` | Sole accent — headings eyebrow, dot, hover |
| `--accent-soft` `#d79052` | Accent in dark panels |
| `--panel` `#17130e` | Dark panel background |
| `--panel-ink` `#f3efe7` | Text on dark panel |

Rule: if you need a new color, first see whether `color-mix(in srgb, var(--accent) N%, var(--surface))` gets you there.

## Scale

- **Radius:** `6px` is banned (looks square). Use one of:
  - `9999px` — chips, pills, icon chips, availability chip, contact-row
  - `1rem` / `1.1rem` — inner cells (e.g., `toolkit-cell`)
  - `1.25rem` — standard cards (`card-elevated`, `card-soft`, `card-muted`, `focus-card`, `project-card`)
  - `1.5rem` — large framed containers (`card-bezel`, `panel-dark`, `site-header`)
- **Spacing:** Tailwind `gap-3/4` inside cards, `gap-10/14` between sections. Top padding slightly less than bottom (optical).
- **Type:** `section-title` and `section-title-dark` are the only H2 sizes. Don't introduce new display sizes outside these classes.

## Component vocabulary

Every recurring visual pattern has a named class. **Add a new page by composing these — don't invent inline variants.**

### Containers

| Class | When to use |
|---|---|
| `.card-elevated` | Default card for current/active items (role, education, certification, focus card). |
| `.card-soft` | Secondary content that's still active (About sections, FAQ entries). Slightly deeper background. |
| `.card-muted` | **Archived / past items.** Dashed border, transparent, muted headings. Use for older roles, prior schools, anything the reader shouldn't weight equally with current work. |
| `.card-bezel` / `.card-bezel-inner` | Large framed region with internal grid (e.g., Toolkit). One outer border, no double-bezel. |
| `.panel-dark` | Full-width dark section. One per page max — avoid jarring mode switches. |
| `.project-card` | Project list card. Subtle lift on hover (border-color shift, 2px Y translate). |
| `.focus-card` | Three-up focus grid on home. Same hover treatment as `project-card`. |
| `.toolkit-cell` | Cell inside `card-bezel` for the Toolkit section. |

### Chips, pills, and signals

| Class | When to use |
|---|---|
| `.inline-chip` | Tags on cards (stack items, education notes). Pill, outline-only, subtle hover. |
| `.inline-chip-dark` | Same for dark panels. |
| `.profile-icon-chip` | 32×32 circular icon well — outline only, no fill. Used next to "Current focus", contact rows, etc. |
| `.toolkit-cell-icon` | 36×36 circular icon well inside toolkit cells. Same outline-only treatment. |
| `.signal-row` | Generic labeled pill. Legacy — prefer `availability-chip` for "open to work" states. |
| `.availability-chip` | **Status chip** replacing the old green pulse. Editorial layout: accent bar → `AVAILABLE` eyebrow → divider → status text. Bar has a slow breathe animation. |

### Content rails

| Class | When to use |
|---|---|
| `.timeline` + `.timeline-item` + `.timeline-dot` | Experience timeline. Current role uses the full-size dot; older/archived roles use `.timeline-dot--muted` (smaller, line-colored, no accent ring). |
| `.contact-row` | Pill-shaped contact link (email, LinkedIn, GitHub). Hover lifts border color only. |
| `.typewriter-slot` + `.typewriter-pill` | See below. |

### Eyebrows and titles

| Class | When to use |
|---|---|
| `.section-eyebrow` / `.section-eyebrow-dark` | Small accent label above a section title. |
| `.section-title` / `.section-title-dark` | Page/section H2. |

## Icons

- Library: **Phosphor** (`@phosphor-icons/react`). Do not add a second icon set.
- Default weight: `bold` (outline). Do not use `fill` or `duotone` — outlines match the flat aesthetic.
- Icons sit inside `.profile-icon-chip` or `.toolkit-cell-icon` (outline-only wells). If you need an icon without a well, it should stand alone at the body text color, not floating tinted accent.

## Motion

- Easing: either `cubic-bezier(0.32, 0.72, 0, 1)` (spring-ish) or `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). Available as `.ease-spring` / `.ease-expo` utilities.
- Hover on cards: `translateY(-2px)` and a border-color shift to `color-mix(accent 35%, line 65%)`. Never a scale or shadow change.
- Stagger on list entry: `.stagger-item` with `--index` custom property. Capped around 8 items — don't stagger big lists.

## Typewriter pill (reserved-slot pattern)

The pill lives inside `.typewriter-slot`, which reserves a fixed height in document flow. The pill itself is absolutely positioned inside the slot, so its content-driven height change never moves siblings below.

- The slot is `6rem` (mobile) / `5.5rem` (desktop). Increase both proportionally if you add longer prompts.
- Border-radius is `9999px` by default (elongated pill). When the typed text wraps to multiple lines, the component sets `data-lines="multi"` and the radius eases to `1.1rem`. Corners animate between the two states.
- Prompts live in [components/typewriter-pill.tsx](components/typewriter-pill.tsx). Keep them under ~65 characters so they fit two lines in the desktop aside.

## Adding a new page

1. Start with `<div className="container py-10 md:py-20">`.
2. Use `<PageHeader>` from [components/page-header.tsx](components/page-header.tsx) for the H1.
3. Wrap each section in `<section className="border-t border-[var(--line)] py-14 md:py-20">` and put a `<SectionHead>` at the top.
4. For lists, prefer existing card classes over inline styles. If you find yourself writing `rounded-md border bg-[...]`, stop and check whether `inline-chip`, `card-soft`, or `card-muted` already does it.

## Don't do this

- `rounded-md` on anything. Use `rounded-full` or `rounded-2xl`.
- `box-shadow: inset 0 1px 0 rgba(255,255,255,...)` — the old glossy bevel. Removed throughout; don't reintroduce.
- Colored/tinted drop shadows. Depth = border + spacing.
- A second accent color. The palette has one.
- Dedicating a green/red "status" dot to anything. Use `availability-chip` for positive states, `muted` treatment for neutral/negative.
- Gradients on cards or chips (radial glows, accent fills). The only allowed gradient is the fixed mesh background.
- `min-h-[Xrem]` on the typewriter pill — it makes the pill push siblings when text wraps. Use the reserved-slot pattern.

## File map

- [app/globals.css](app/globals.css) — all component classes and tokens
- [components/typewriter-pill.tsx](components/typewriter-pill.tsx) — typewriter source
- [components/page-header.tsx](components/page-header.tsx) — `PageHeader` + `SectionHead`
- [components/magnetic-button.tsx](components/magnetic-button.tsx) — primary CTA
- [data/profile.ts](data/profile.ts) — all portfolio content lives here, not in pages
