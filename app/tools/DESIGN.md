# Tools Design System

Source of truth for the visual language of **`/tools/*`** — the private workspace. Edit [tools.css](tools.css) first when you change a color, radius, or component. The goal is to be able to add new tools under `/tools` without visual drift and without reaching back into the portfolio design.

> This is **not** the portfolio design. The portfolio design lives in [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) and [globals.css](../globals.css). The two systems are deliberately isolated — see [Isolation](#isolation) below.

---

## Philosophy

A Claude Code-inspired workspace: warm dark charcoal, a single terracotta accent, a single informational blue. Flat surfaces, subtle hover feedback, no decorative layers. Every pixel on screen should be doing work — no marketing chrome, no glossy bevels, no radial gradient ambience.

### Five rules

1. **Flat surfaces, no outlines on fills.** Depth comes from layered warm-charcoal fills (`--tools-bg`, `--tools-bg-elevated`, `--tools-bg-panel`, `--tools-bg-panel-alt`). Never both a fill and a border on the same element.
2. **Two accents, each with a purpose.**
   - **Terracotta** (`--tools-accent`) — selection, active state, primary actions.
   - **Claude sky blue** (`--tools-info`) — section hierarchy, informational emphasis, info callouts.
   No third accent. Status colors (success/warning/danger) are semantic only — tinted backgrounds, never decorative.
3. **Selected = accent chip, not a bordered box.** An active tab, selected template, or current page in the sidebar gets a tinted background + tinted text. Hover a selected thing: the background deepens, the text stays the accent color.
4. **Hover never swaps color.** Hovering a button changes its background opacity or fill, never its text color when that text is already the accent. White → accent on hover is fine; accent → white on hover is wrong.
5. **Focus rings are soft and keyboard-only.** Default browser focus rings are disabled. `:focus-visible` gets a 2px terracotta glow at `outline-offset: 2px`.

---

## Isolation

The tools shell is scoped under the `.tools-app` wrapper applied at `app/tools/layout.tsx`. Every token and every class lives under that scope:

- **Tokens** (`--tools-bg`, `--tools-accent`, etc.) are defined on `.tools-app` — not `:root`. They do not exist outside `/tools`.
- **Classes** all start with `tools-`. No generic class names (`.card`, `.btn`, `.container`).
- **Fonts** are pinned to Poppins inside `.tools-app`, independent of whatever the portfolio uses globally.
- **No imports from `globals.css`** or portfolio tokens (`--ink`, `--accent`, `--bg`, etc.). If you need a color, it comes from the tokens below.
- **No imports from portfolio components** (`PageHeader`, `SectionHead`, `.card-elevated`, `.inline-chip`, `.profile-icon-chip`, etc.).

If you find yourself writing a class without the `tools-` prefix or referencing a portfolio token inside `/tools`, stop — it's a leak.

---

## Color tokens

Declared on `.tools-app`. All values are warm-charcoal neutrals + Anthropic terracotta + Claude blue.

### Surfaces (stacked from back to front)

| Token | Value | Role |
|---|---|---|
| `--tools-bg` | `#1a1a19` | Page background. |
| `--tools-bg-elevated` | `#1f1f1d` | Sidebar, primary panels (`.tools-surface`). |
| `--tools-bg-panel` | `#242422` | Secondary cards, tabs, CTAs at rest, sub-elements inside a surface. |
| `--tools-bg-panel-alt` | `#2a2a27` | Hover state for `--bg-panel` elements. |
| `--tools-bg-input` | `#161615` | Input backgrounds, PDF preview dock. |

Rule: adjacent layers always differ by exactly one step. Never skip a level or recycle a non-adjacent token.

### Lines (used sparingly — only for dividers)

| Token | Value | Role |
|---|---|---|
| `--tools-line` | `rgba(234, 227, 214, 0.08)` | Page-header bottom rule, pane-header bottom rule, sidebar divider. |
| `--tools-line-strong` | `rgba(234, 227, 214, 0.16)` | Not currently used on surfaces — reserved for future emphasis. |

Borders on filled surfaces are forbidden (rule #1). Lines are only for horizontal rules between content regions.

### Text

| Token | Value | Role |
|---|---|---|
| `--tools-text` | `#faf9f5` | Primary text, titles. |
| `--tools-text-muted` | `#b5b0a3` | Body copy, descriptions, placeholder titles. |
| `--tools-text-dim` | `#7a766d` | Field labels, sidebar section titles, mono notes. |

### Accent — Anthropic terracotta

Used for selection, active state, primary actions.

| Token | Value | Role |
|---|---|---|
| `--tools-accent` | `#d97757` | Primary button fill, selected text color, active icon tint. |
| `--tools-accent-soft` | `#e8a589` | Primary button hover. |
| `--tools-accent-dim` | `rgba(217, 119, 87, 0.12)` | Selected background tint (chips, tabs, option cards, current sidebar link). |

### Info — Claude sky blue

Used for hierarchy and informational emphasis. **Never** for actions or selection.

| Token | Value | Role |
|---|---|---|
| `--tools-info` | `#3b82f6` | Reserved — not currently rendered directly; use the soft variant for text. |
| `--tools-info-soft` | `#7fb0fa` | Blue text on dim background (`.tools-highlight`, `.tools-section-title`, `.tools-callout`, `.tools-alert--info`). |
| `--tools-info-dim` | `rgba(59, 130, 246, 0.14)` | Blue chip/callout background. |
| `--tools-info-line` | `rgba(59, 130, 246, 0.32)` | Reserved (unused). |

### Semantic

Status only. Do not use decoratively.

| Token | Value | Role |
|---|---|---|
| `--tools-success` | `#8aa776` | Success alert text. |
| `--tools-warning` | `#d2b46f` | Warning alert text. |
| `--tools-danger` | `#cf6b57` | Destructive icon-button hover, error alert text. |

---

## Typography

- **Sans** — `'Poppins', Arial, sans-serif`. Applied to everything inside `.tools-app` via a blanket selector.
- **Mono** — `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`. Used only on `.tools-note`, `.tools-statusbar`, and any element given the `.tools-mono` utility.
- **Feature settings** — `'ss01' 1, 'cv11' 1` for stylistic refinement.

### Scale

No ad-hoc font sizes. Every size below corresponds to a named class.

| Role | Size | Weight | Letter-spacing | Class |
|---|---|---|---|---|
| Page title | `clamp(1.75rem, 1.25rem + 1.2vw, 2.2rem)` | 600 | -0.035em | `.tools-view-header__title` |
| Auth panel title | `1.65rem` | 600 | -0.035em | `.tools-auth-panel__title` |
| Section/card title | `1rem` | 600 | -0.02em | `.tools-pane-header__title` |
| Sub-module title | `0.92rem` | 600 | -0.02em | `.tools-module__title` |
| Section chip (blue) | `0.84rem` | 600 | -0.01em | `.tools-section-title` |
| Body copy | `0.82rem` | 400 | 0 | `.tools-pane-header__copy`, `.tools-module__description` |
| Lead copy | `0.9rem` | 400 | 0 | `.tools-view-header__lead` |
| Eyebrow | `0.64rem` | 600 | 0.14em, uppercase | `.tools-pane-header__eyebrow`, `.tools-view-header__eyebrow`, `.tools-group-label`, `.tools-auth-panel__eyebrow` |
| Field label | `0.64rem` | 600 | 0.14em, uppercase | `.tools-field__label`, `.tools-auth-form__label` |
| Tab | `0.72rem` | 500 | 0 | `.tools-switch__tab`, `.tools-subnav__tab` |
| Button | `0.76rem` | 500 | 0 | `.tools-cta` |
| Pill / meta | `0.7rem` | 500 | 0 | `.tools-pill`, `.tools-list-row__toggle` |

### Eyebrow coloring

All **content eyebrows** are terracotta: `.tools-pane-header__eyebrow`, `.tools-view-header__eyebrow`, `.tools-auth-panel__eyebrow`, `.tools-group-label`.

**Form labels** (`.tools-field__label`, `.tools-auth-form__label`) and **sidebar section titles** (`.tools-sidebar__section-title`) stay dim — they are not accents, just navigation labels.

---

## Radius & spacing

Three radii. Nothing in between.

| Radius | Use |
|---|---|
| `0.4rem` | Chips, small buttons, icon buttons (`.tools-icon-action`), inline highlight (`.tools-highlight`). |
| `0.5rem`–`0.65rem` | Cards, inputs, tabs, rows (`.tools-command-row`, `.tools-option-card`, `.tools-list-row`, `.tools-auth-form__input`). |
| `0.75rem`–`0.85rem` | Main surfaces (`.tools-surface`, `.tools-auth-panel`). |

Padding inside `.tools-surface` is `1.1rem`. Inner cards sit at `0.6rem`–`0.85rem` padding. Gaps between major blocks are `1rem`; inside a card use `0.4rem`–`0.75rem`.

---

## Layout

### Shell

`app/tools/layout.tsx` wraps every tools page in `<ToolsRouteShell>`, which renders:

```
.tools-app
 └── .tools-shell  (grid: 15rem sidebar | 1fr main)
      ├── .tools-sidebar   (sticky, full-height)
      └── .tools-main
           └── .tools-main__inner  (max-width 1360px, centered)
```

Below `1080px` the sidebar disappears and `.tools-mobilebar` takes over — a sticky top bar with horizontal-scroll nav + sign-out.

### Page structure

Every tools page follows this skeleton:

```tsx
<section className="tools-view">
  <ToolsViewHeader eyebrow="..." title="..." lead={...} />
  <section className="tools-surface">...</section>
  <section className="tools-surface">...</section>
</section>
```

- `.tools-view` — flex column, `gap: 1.5rem`, the outer container of a page body.
- `<ToolsViewHeader>` — terracotta eyebrow, big title, optional ReactNode lead (may contain `<span className="tools-highlight">`). Divider underneath.
- `.tools-surface` — the primary panel. Flat fill on `--tools-bg-elevated`, `0.75rem` radius, `1.1rem` padding. **No border.**

### Two-column workspace (desktop)

When a tool has editor + preview:

```
.tools-workspace  (grid: 0.9fr | 1.1fr, align-items: start)
 ├── #resume-editor .tools-surface         (scrolls with page)
 └── #resume-preview .tools-surface        (position: sticky; top: 1rem; height: calc(100dvh - 2rem))
```

The preview column is sticky and flex-fills. Any new tool that has a "preview" half should reuse this exact pattern — `id="resume-preview"` (or an equivalent `id="<tool>-preview"` with a matching CSS rule) ensures sticky behavior.

---

## Component reference

Every recurring pattern has a class. Use these — do not invent inline variants.

### Containers

| Class | Use |
|---|---|
| `.tools-app` | Root wrapper that carries the token scope. Applied once by `layout.tsx`. |
| `.tools-shell` | Desktop sidebar + main grid. |
| `.tools-sidebar` | Left nav rail (sticky, full viewport height). |
| `.tools-mobilebar` | Mobile top nav (≤ 1080px). |
| `.tools-main` / `.tools-main__inner` | Right-hand content column. `__inner` enforces max-width and padding. |
| `.tools-view` | Page-level flex column wrapper. |
| `.tools-surface` | Main content panel. Flat fill, no border, `0.75rem` radius. |
| `.tools-auth-shell` / `.tools-auth-panel` | Auth-only alternate layout (used by `/tools/login`). |

### Headings & eyebrows

| Class | Use |
|---|---|
| `.tools-view-header` + `__eyebrow` + `__title` + `__lead` | Page-level heading. Used via `<ToolsViewHeader>`. |
| `.tools-pane-header` + `__eyebrow` + `__title` + `__copy` + `__actions` | Panel-level heading inside a `.tools-surface`. Terracotta eyebrow, white title, optional muted copy, right-aligned actions. |
| `.tools-module__header` + `.tools-module__title` + `.tools-module__description` | Sub-module heading inside a surface (e.g., "Config rail", "Include and order"). |
| `.tools-group-label` | Terracotta uppercase eyebrow. Used anywhere outside a pane-header when you need an accent label. |
| `.tools-section-title` | **Blue chip heading.** Full-width blue-tinted block used for section names inside the Sections/Include card (Experience, Projects, etc.). |
| `.tools-sidebar__section-title` | Dim uppercase label in the sidebar. Not an accent — it's navigation structure. |

### Navigation

| Class | Use |
|---|---|
| `.tools-navlist` + `.tools-navlist__link` + `__icon` + `__content` + `__label` + `__meta` | Sidebar primary nav. `--active` modifier: terracotta fill + terracotta label. |
| `.tools-navlist__link--mobile` | Same list rendered horizontally in the mobilebar. |
| `.tools-sidebar__back` / `.tools-mobilebar__back` | "Back to portfolio" link. Subtle, text-dim. |
| `.tools-sidebar__brand` + `__brand-mark` + `__title` | Top-left lockup. `__brand-mark` is the terracotta square. |

### Selection — tabs & option cards

All selection uses **terracotta fill + terracotta text**. Hovering a selected item deepens the fill but keeps the text terracotta (never swap to white).

| Class | Use |
|---|---|
| `.tools-switch` + `.tools-switch__tab` | Two-option toggle (e.g., Library / Resume). `--active` is accent-dim + accent text. Container has a panel fill. |
| `.tools-subnav` + `.tools-subnav__tab` | Multi-option toggle that wraps when tabs don't fit (e.g., the 9 library tabs). Same active state. |
| `.tools-option-card` + `__title` + `__hint` | Selectable card with title + hint (e.g., a template: "Editorial — Warm accent, portfolio match"). `--active` is accent-dim + accent title. |
| `.tools-config-entry` + `__label` + `__input` | Inline row with a label and action buttons (used for named resume configs). `--active` is accent-dim + accent label. |
| `.tools-list-row` + `__label` + `__toggle` (+ `__toggle--active`) | Thin sortable row. Items included in a section, drag handle, "Compact" toggle, remove button. |

### Rows & cards

| Class | Use |
|---|---|
| `.tools-command-row` + `__icon` + `__main` + `__title` + `__copy` + `__action` | Tool launcher row on the landing page. Panel fill, translates up 1px on hover. |
| `.tools-mini-card` + `__icon` + `__title` + `__copy` | Small info card (3-up grid item). |
| `.tools-record-card` / `.tools-rail-card` / `.tools-list-card` | Inner grouping cards within a surface. All flat panel fill, no border. |

### Buttons (CTA)

All CTAs are borderless fills. Active feedback is a subtle `scale(0.98)` — that is intentional and should not be removed.

| Class | Use |
|---|---|
| `.tools-cta` | Default button. Panel fill, white text. |
| `.tools-cta--primary` | Solid terracotta fill, dark text. Primary submit button (e.g., "Sign in"). |
| `.tools-cta--accent` | Terracotta-dim fill, terracotta text. Secondary add/confirm buttons (e.g., "+ Awards", "Switch to compact"). |
| `.tools-cta--ghost` | Transparent at rest, subtle white fill on hover, muted text. Toolbar actions (Export, Import, Download PDF). |
| `.tools-cta--compact` | Modifier: tighter padding, smaller font. Combine with `--ghost` or `--accent`. |
| `.tools-cta--full` | Modifier: `width: 100%`. Sidebar sign-out, auth form submit. |
| `.tools-cta__glyph` | Small nested glyph box inside a `.tools-cta--primary` (e.g., the arrow on the "Sign in" button). |

### Icon buttons

| Class | Use |
|---|---|
| `.tools-icon-action` | Standard 1.85rem icon button. Drag handles, pencil, copy, remove X. |
| `.tools-icon-action--danger` | Modifier: hover tints to terracotta-danger for destructive actions. |
| `.tools-glyph-button` / `.tools-drag-handle` | Aliases of `.tools-icon-action` for semantic clarity in code. Identical styling. |

### Form controls

| Class | Use |
|---|---|
| `.tools-auth-form` + `__group` + `__label` + `__input` | Login form. |
| `.tools-field` + `__label` + `__control` | Library editor fields. |
| `.tools-config-entry__input` | Inline rename input. Shares the same input styling. |

Focus state: border shifts to `--tools-accent`. Placeholder uses `--tools-text-dim`.

### Highlight / callout / alerts (all use the blue family)

| Class | Use |
|---|---|
| `.tools-highlight` | **Inline blue chip.** Used inside prose to emphasize a key phrase (e.g., "the preview stays <span class='tools-highlight'>docked while you edit</span>"). Must be a `<span>`, never a block element. |
| `.tools-callout` + `__label` | Block-level blue panel. Used for informational notes under the editor (e.g., the "Synced" Supabase note). |
| `.tools-alert` | Base inline alert — panel fill, muted text. |
| `.tools-alert--quiet` | Quiet variant (identical bg, used for transient "Estimating…" state). |
| `.tools-alert--info` | **Blue alert** for informational overflow/status. Actions go **outside** the alert as sibling `.tools-cta--accent` buttons, never nested inside. |
| `.tools-alert--success` | Muted green success alert. |
| `.tools-alert--warning` | Muted amber warning alert. Rarely used — prefer `--info` when the alert is actionable. |
| `.tools-message--error` / `.tools-message--success` | Login-form inline messages. |
| `.tools-statusbar` | Compact mono-font status pill with a leading dot. Used for validation counts. |

### Preview pane

| Class | Use |
|---|---|
| `.tools-preview` + `__toolbar` + `__dock` + `__empty` | PDF preview scaffold. `__dock` holds the `<PDFViewer>`. `__empty` is the dashed placeholder. |

### Utility primitives

| Class | Use |
|---|---|
| `.tools-pill` / `.tools-pill--muted` | Small read-only tag. |
| `.tools-note` | Mono-font dim note for captions. |
| `.tools-empty` | Muted empty-state copy. |
| `.tools-mono` | Apply JetBrains Mono to an arbitrary element. |
| `.tools-stack` | Flex column with `gap: 1rem`. |
| `.tools-config-stack` | Flex column with `gap: 0.4rem`. |
| `.tools-loading-card` | Shimmering placeholder for suspense/loading states. |
| `.tools-text-button` | Unstyled inline text button (used for "Create one" in login). |

---

## States & interactions

### At rest

- Surfaces: flat fill, no border, no shadow.
- Buttons: panel fill + white text (or the `--accent`/`--primary` variant).
- Inputs: panel fill + subtle divider line (input border is acceptable because an input is the one place where the edge needs to read).

### Hover

- Generic hover: fill goes one step up (`--bg-panel` → `--bg-panel-alt`, or `rgba(255,255,255,0.04)` for ghosts). Translate-Y by -1px only on `.tools-command-row` and primary rows.
- **Selected (accent-dim) hover:** fill deepens to `color-mix(in srgb, var(--tools-accent) 22%, transparent)`. Text stays `--tools-accent`. Never turn accent text white on hover.
- Ghost buttons: no border appears on hover. Only the fill changes.

### Active (pressed)

- CTAs: `transform: scale(0.98)`. Subtle but perceptible.

### Focus

- All default browser outlines are removed inside `.tools-app`.
- `:focus-visible` on any interactive element: 2px terracotta glow (`color-mix(in srgb, var(--tools-accent) 55%, transparent)`) at `outline-offset: 2px`.
- Inputs additionally change `border-color` to terracotta on focus.

### Drag & drop

Handled by `@dnd-kit/core` via `components/tools/resume/library/sortable-list.tsx`. The library passes `transition` and `transform` through CSS — do not override them. If you need snappier feel in a new tool, set `activationConstraint.distance` on the `PointerSensor` (currently `4px`).

---

## Icons

- Library: **Phosphor** (`@phosphor-icons/react/dist/ssr`). Do not add a second icon set.
- Default weight: `regular` for navigation, `bold` only on dense controls (`ArrowLeft` in the back button, icons inside `.tools-cta--primary__glyph`).
- Sizes: `13`–`16px` inside buttons; `14`–`16px` inside icon wells.
- Icons take `currentColor` — do not tint with inline style. Color comes from the surrounding class.

---

## Motion

All transitions are short and subtle — this is a tool, not a showcase.

- **Standard:** `160ms ease` on `background`, `color`, `transform`.
- **Hover lift:** `translateY(-1px)` only on `.tools-command-row`.
- **Press:** `scale(0.98)` on `.tools-cta:active`.
- **Loading shimmer:** `tools-loading-shimmer` keyframes on `.tools-loading-card`.
- **Typewriter caret:** `tools-inline-typewriter-blink` on `.inline-typewriter__caret`.

No other keyframes. No spring physics. No scale-on-hover. No shadow transitions.

---

## Adding a new tool

1. Create `app/tools/<tool>/page.tsx`. Set `metadata.robots = { index: false, follow: false }` (the workspace is private).
2. Set page structure:
   ```tsx
   <section className="tools-view">
     <ToolsViewHeader eyebrow="<Eyebrow>" title="<Title>" lead={<>...</>} />
     <section className="tools-surface">...</section>
   </section>
   ```
3. Use `<span className="tools-highlight">…</span>` in the lead to emphasize a key phrase — once per page, not more.
4. Add the tool to the sidebar nav in `components/tools/shell/tools-route-shell.tsx`:
   ```tsx
   <SidebarLink href="/tools/<tool>" active={Boolean(is<Tool>)} icon={<Icon>} label="<Label>" meta="" />
   ```
   Also add it to `tools-mobilebar__rail` below.
5. Add a link on the landing page (`app/tools/page.tsx`) using `.tools-command-row`.
6. If the tool has a preview:
   - Wrap the two-column content in `<div className="tools-workspace hidden lg:grid">`.
   - Give the preview `<section>` an `id="<tool>-preview"`.
   - Add a rule in `tools.css` mirroring the resume one:
     ```css
     .tools-workspace > #<tool>-preview { position: sticky; top: 1rem; height: calc(100dvh - 2rem); ... }
     ```
7. Every card inside the tool must be one of the existing card classes (`.tools-surface`, `.tools-record-card`, `.tools-rail-card`, `.tools-list-card`, `.tools-mini-card`, `.tools-command-row`). Do not author new card classes unless a recurring pattern emerges across ≥2 tools.
8. Every button must be a `.tools-cta` variant. Icon-only actions are `.tools-icon-action`.
9. Every selectable item must use terracotta-accent selection (`--tools-accent-dim` fill + `--tools-accent` text).
10. Every informational callout/highlight must use the blue family (`.tools-highlight`, `.tools-callout`, `.tools-alert--info`).

---

## Don't do this

- **`border: 1px solid var(--tools-line)` on a filled element.** Depth comes from fill steps, not outlines.
- **A third accent color.** If you need emphasis, use the blue for info or the terracotta for action — pick one.
- **Accent text that turns white on hover.** Selected items keep their accent on hover. (Generic buttons going muted-text → white on hover is fine; that's the inverse direction and always safe.)
- **Nesting CTAs inside alerts.** Actions go next to alerts, not inside them. See the overflow-banner pattern.
- **Custom radii.** Use `0.4rem`, `0.5`–`0.65rem`, or `0.75`–`0.85rem`. Nothing else.
- **Importing from `globals.css` or referencing portfolio tokens.** If you see `var(--accent)`, `var(--ink)`, `var(--line)` inside `/tools`, that's a leak — replace with `var(--tools-*)`.
- **Reaching for `.card-elevated`, `.inline-chip`, `.profile-icon-chip`, etc.** Those are portfolio classes. They do not exist in the tools theme.
- **Using a second font.** Poppins and JetBrains Mono are the only fonts.
- **Drop shadows, inset highlights, radial gradients on cards.** None of these exist in the system.
- **Uppercase button labels.** Only eyebrows are uppercase.
- **Borders on shaded boxes** (anything with a tinted accent-dim or info-dim fill). The tint is the visual signal — an outline on top of it reads as noise.

---

## File map

- [tools.css](tools.css) — all tokens and component classes.
- [layout.tsx](layout.tsx) — imports `tools.css`, wraps children in `<ToolsRouteShell>`.
- [page.tsx](page.tsx) — landing.
- [../../components/tools/shell/tools-route-shell.tsx](../../components/tools/shell/tools-route-shell.tsx) — sidebar + mobile nav.
- [../../components/tools/shell/tools-view-header.tsx](../../components/tools/shell/tools-view-header.tsx) — `<ToolsViewHeader>` component.
- [../../components/tools/resume/library/fields.tsx](../../components/tools/resume/library/fields.tsx) — `SectionWrap`, `Field`, `TextInput`, `AddButton`, `IconButton` primitives.
- [DESIGN.md](DESIGN.md) — this file.
