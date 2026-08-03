---
name: Indomisa Consulting
description: Custom software development for South African SMEs, styled as a precision engineering instrument
colors:
  midnight-hull: "hsl(217 68% 20%)"
  beacon-blue: "hsl(224 76% 53%)"
  hull-on-light: "hsl(0 0% 100%)"
  signal-on-light: "hsl(0 0% 100%)"
  canvas: "hsl(220 15% 90%)"
  ink: "hsl(222 47% 8%)"
  surface: "hsl(0 0% 100%)"
  surface-muted: "hsl(220 16% 94%)"
  muted-ink: "hsl(220 9% 40%)"
  hairline: "hsl(220 13% 80%)"
  alert: "hsl(4 76% 55%)"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "IBM Plex Sans, Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.16em"
rounded:
  xs: "8px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "24px"
  full: "999px"
components:
  button-primary:
    backgroundColor: "{colors.midnight-hull}"
    textColor: "{colors.hull-on-light}"
    rounded: "{rounded.full}"
    padding: "0.9rem 1.75rem"
    typography: "{typography.body}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.9rem 1.75rem"
  card-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "32px"
---

# Design System: Indomisa Consulting

## Overview

**Creative North Star: "The Night Engineering Desk"**

Indomisa reads like the desk of a precision engineer working late: a deep navy field, one signal-blue instrument light left on, and everything else deliberately quiet so that light means something. The site is B2B software engineering communicated visually — not a marketing stunt, not a generic gradient template. Copy stays plain and confident ("Stop forcing your business into generic tools"); the interface backs that up with instrumentation cues instead of decoration: a live terminal typing itself out in the hero, corner-bracket "viewfinder" frames on a handful of key panels, monospace index badges, and a static schematic-grid backdrop (faint blueprint grid + a couple of circuit traces) that reads as ambient technical texture rather than a hero graphic. Headings carry their own weight directly — no kicker/eyebrow label sits above them.

Within that calm field, the system is tactile and alive rather than static: cards lift on hover, borders warm to signal-blue, dual-layer shadows (a dark structural offset plus an accent glow) make glass surfaces feel genuinely lifted, and backdrop-blur is used generously so panels feel like physical glass over the schematic backdrop, not flat rectangles. The result should feel engineered and awake, never playful or soft. Explicitly rejected: the generic SaaS purple/pink-gradient template look — no purple, no gradient fills, no blob shapes, no neon haze, no drifting particle/dot fields. Every surface is a solid brand color; the only glow is the sanctioned shadow-glow token, and it appears because something is active (a button, a stat, a live cursor), not as ambient decoration.

**Key Characteristics:**
- One accent color (Beacon Blue) carries all "this is active/important" signaling — pulses, links, focus rings, hover borders, glow.
- Instrumentation motifs (terminal, viewfinder brackets, mono labels, index badges) are a signature, used sparingly on a few key panels, not everywhere.
- Every surface responds to hover or focus — lift, border-warm, or glow — so nothing on the page reads as inert.
- Light-only: the site runs a single theme, no dark mode and no toggle. The page canvas is deliberately dulled a step below white so card/panel surfaces read as genuinely lifted rather than blending into the background — see The Pop Rule under Colors.

## Colors

Two brand hues (navy + signal blue) plus a strictly neutral gray-blue scale; no tertiary hue exists or should be introduced.

### Primary
- **Midnight Hull** (`hsl(217 68% 20%)`): deep navy. Primary buttons at rest, heading accents, the hero stat numbers alternating with Beacon Blue.

### Secondary
- **Beacon Blue** (`hsl(224 76% 53%)`): the signal. Links, active states, focus rings, the hero's pulsing status dot, hover borders, and every glow/shadow-glow effect. Used sparingly — its rarity is what makes it read as "live."

### Neutral
- **Canvas** (`hsl(220 15% 90%)`): page background — a deliberately dulled grey, not near-white, so it sits visibly behind Surface.
- **Ink** (`hsl(222 47% 8%)`): primary text.
- **Surface** (`hsl(0 0% 100%)`): cards, dropdowns, inputs, the terminal panel — pure white, the brightest thing on the page.
- **Surface Muted** (`hsl(220 16% 94%)`): subdued fills, badges at rest — sits between Canvas and Surface.
- **Muted Ink** (`hsl(220 9% 40%)`): secondary text, captions, nav links at rest.
- **Hairline** (`hsl(220 13% 80%)`): borders and dividers.
- **Alert** (`hsl(4 76% 55%)`): form validation errors only.

### Named Rules
**The One Signal Rule.** Beacon Blue is the only color allowed to mean "active" — pulses, focus, hover, links, glow. If a second hue starts carrying meaning, the system has drifted.

**The Pop Rule.** Canvas must stay a visible step duller than Surface — never let the page background drift close enough to white that cards stop reading as lifted. If a new neutral token is needed, place it by testing against Canvas and Surface side by side, not in isolation.

## Typography

**Display Font:** Space Grotesk (with sans-serif fallback) — Tailwind class `font-syne`.
**Body Font:** IBM Plex Sans (with Inter, sans-serif fallback) — Tailwind class `font-inter`, applied at `body` level.
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace fallback) — Tailwind class `font-mono`.

**Character:** A geometric, slightly technical display face (Space Grotesk) paired with a humanist, highly legible body face (IBM Plex Sans) and a mechanical mono for anything that reads as "system output" (labels, badges, terminal text, stat captions). The pairing is precise and unadorned — no serif, no script, no decorative weight.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 7vw, 4.5rem)`–`clamp(2.6rem, 6vw, 5rem)`, line-height 0.95, letter-spacing -0.05em): hero H1 and top-of-page H1s. Space Grotesk. Tight negative tracking is deliberate — it's what makes the tight line-height read as engineered rather than cramped.
- **Headline** (700, `clamp(2rem, 4vw, 3.5rem)`, line-height 1, letter-spacing -0.04em): section H2s ("Why businesses choose Indomisa"). Space Grotesk.
- **Title** (700, ~1.35–2.6rem): stat values, card titles. Space Grotesk, often colored `primary` or `accent` instead of `ink`.
- **Body** (400, 1–1.15rem, line-height 1.7–1.75): paragraph copy. IBM Plex Sans, always in Muted Ink, never full Ink — softens long-form reading against the dark/navy field.
- **Label** (600, 0.78rem, letter-spacing 0.16em, uppercase): index badges and other short instrumentation tags. IBM Plex Mono, always in Beacon Blue. Never used as a kicker/eyebrow above a heading — the heading itself is the entry point to a section, unlabeled.

### Named Rules
**The Mono-Means-System Rule.** IBM Plex Mono is reserved for things that look machine-generated or instrumentation-like (labels, badges, the terminal, stat captions) — never for prose. If mono starts appearing in body copy, it's being misused.

## Layout

Centered container at `min(1180px, 90%)`, generous vertical section padding (100–110px, tightening to 80–100px under 900px width). Content grids favor a clean 2-up split on wide sections (copy + visual, form + info) collapsing to a single column under ~900px. Card grids run 3–4 columns on desktop, collapsing to fewer columns responsively; stat and info cards keep consistent `24–32px` gaps. Hero content uses a `lg:grid-cols-2` split (copy+terminal left, systems-diagram panel+stat grid right) that stacks on mobile. Scroll-reveal (`RevealOnScrollDirective`, staggered via `appRevealDelay`) is the default entrance for most sections — content translates up 28px and fades in on intersection, staggered by ~80ms per sibling; it is a no-op under `prefers-reduced-motion`.

## Elevation & Depth

Hybrid: flat-by-default neutral surfaces (stat cards, nav dropdowns) lifted with real dual-layer shadows the moment something needs to read as "raised" or "active" — a dark structural offset shadow paired with a soft Beacon Blue glow, so depth reads as a physical lift rather than a haze. Glass/blur (`backdrop-blur-md`/`xl`) is layered on top of translucent surfaces (terminal panel, nav on scroll, hero stat cards, mobile menu) so panels feel like glass floating over the schematic backdrop rather than opaque boxes. Nearly every interactive surface responds on hover (lift + border warms to accent + shadow intensifies) — depth is not reserved for a couple of hero elements, it is the default feel of the whole tactile system.

### Shadow Vocabulary
- **shadow-sm** (`0 1px 2px hsl(222 47% 8% / .06), 0 1px 1px hsl(222 47% 8% / .04)`): resting cards, subtle separation.
- **shadow-md** (`0 10px 28px hsl(222 47% 8% / .10), 0 2px 8px hsl(222 47% 8% / .06)`): stat cards, terminal panel, standard lifted surfaces.
- **shadow-lg** (`0 24px 56px hsl(222 47% 8% / .14), 0 6px 16px hsl(222 47% 8% / .07)`): hover states, the contact form panel.
- **shadow-glow** (`0 0 40px hsl(var(--accent) / .14)`): paired with shadow-md/lg on anything that should read as "live" — primary buttons, the contact form.

### Named Rules
**The Lift-On-Hover Rule.** Cards and buttons don't just brighten on hover — they physically translate up (2–6px) while their shadow deepens. A hover that only changes color is under-built for this system.

## Shapes

Two families of geometry, used deliberately: **circles/pills** for anything actionable (all buttons are `border-radius: 999px`, the hero status dot, nav mobile-menu button), and **soft rounded rectangles** for containers (cards, panels, inputs sit on a 5-step scale — 8/10/14/18/24px — so nothing hand-rolls an arbitrary radius). The signature `.ix-frame` treatment adds two opposing corner brackets (22px, 2px Beacon Blue border, offset -10px outside the panel edge) to mark a surface as an "instrument reading" — reserved for a small number of key panels (hero terminal today), never applied broadly enough to become wallpaper.

## Components

### Buttons
- **Shape:** full pill (`border-radius: 999px`).
- **Primary:** solid Midnight Hull navy fill, white text, `0.9rem 1.75rem` padding, dual shadow-md/lg + shadow-glow at rest.
- **Hover / Focus:** primary lifts 2px and the fill switches to solid Beacon Blue (a color swap, not a brightness filter — reinforces that Beacon Blue means "active"), shadow escalates to lg+glow; focus-visible gets a 2px Beacon Blue outline at 3px offset on all buttons.
- **Ghost/secondary:** transparent-to-translucent card background (`hsl(var(--card) / 0.4)`) with backdrop-blur, 1px hairline border, ink text; hover warms the border to accent and tints the background with a faint accent wash, same 2px lift.

### Chips / Badges
- **Index badge:** small pill-ish rounded-xs container, 1px Beacon Blue border at 35% opacity, Beacon Blue mono text on a 6%-opacity accent fill — used to number "why us" style feature cards (`01`, `02`...).

### Cards / Containers
- **Corner Style:** `--radius-sm` (10px) is the workhorse for cards, form panels, and info tiles.
- **Background:** Surface color, 1px hairline border at rest.
- **Shadow Strategy:** flat at rest for grid cards (stat/info cards carry shadow-md by default); lift to shadow-lg + border-warm-to-accent on hover. Backgrounds behind cards are solid page canvas — no per-section decorative gradient washes; the schematic-grid backdrop is the only background texture, and it is shared sitewide, not authored per page.
- **Border:** 1px `hairline`; hover/selected states shift it to Beacon Blue (`hsl(var(--accent) / 0.4–0.5)`).
- **Internal Padding:** 28–34px for major cards/panels, 20–22px for smaller tiles.

### Inputs / Fields
- **Style:** Surface background, 1px hairline border, `--radius-sm`, `15px 16px` padding, inherits page font.
- **Focus:** border shifts to Beacon Blue, no shadow/glow added — focus is quiet and precise, not decorative.
- **Error:** helper text (`<small>`) renders in Alert red beneath the field; no red border treatment currently applied to the input itself.
- **Option cards** (staged multi-step form): bordered rectangular buttons acting as radio-style choices; selected/hover state shifts border to accent, lifts 3px, and adds a soft accent glow — the same lift-on-hover rule as everywhere else.

### Navigation
- Fixed top bar, transparent over the hero and gaining a blurred translucent background + hairline bottom border + shadow once scrolled. Links are Muted Ink at rest, shift to full Ink on hover, `text-sm font-medium`. Dropdown submenus are Surface panels with a hairline border and shadow-lg. The "Get Started" nav CTA is always the primary pill button. Mobile collapses to a hamburger driving a full-width translucent panel with the same link/CTA set stacked vertically.

### Signature: The Terminal Panel
A `.ix-frame`-marked glass panel styled as a macOS-style terminal window (three colored traffic-light dots, a `indomisa — zsh` label, then a monospace typewriter line in Ink/Primary with a blinking cursor). This is the clearest expression of the North Star metaphor and should stay unique to the hero — duplicating it elsewhere would dilute the "one instrument reading" effect.

## Do's and Don'ts

### Do:
- **Do** keep Beacon Blue as the only color that signals "active" (links, focus, hover borders, glow, the hero pulse dot).
- **Do** pair every new surface with a hover response — lift, border-warm, or glow — consistent with the Lift-On-Hover Rule.
- **Do** use the 5-step radius scale (8/10/14/18/24px) and full-pill (999px) for anything clickable; never hardcode an arbitrary radius.
- **Do** reserve IBM Plex Mono for system/instrumentation text (labels, badges, terminal, stat captions).
- **Do** check any new neutral token against The Pop Rule — Canvas stays duller than Surface.

### Don't:
- **Don't** introduce a third brand hue (purple, teal, etc.) — the system is strictly navy + signal-blue + neutrals.
- **Don't** reach for the generic SaaS purple/pink gradient, blob-shape, or drifting particle/dot-field aesthetic. No gradient fills anywhere in the system — CTAs, text, and cards are solid brand colors; the only glow is the sanctioned shadow-glow token, motivated by "this is active," not decoration.
- **Don't** give a page its own bespoke background wash or glow — the schematic-grid backdrop (mounted once, sitewide) is the only background texture; page containers stay transparent so it shows through consistently.
- **Don't** reintroduce a dark theme or theme toggle — the site is light-only by design.
- **Don't** apply the `.ix-frame` corner-bracket treatment broadly — it marks a small number of signature "instrument" panels, and loses meaning if it becomes a generic card decoration.
- **Don't** fabricate testimonials, client logos, or case-study results in component examples — no real ones exist yet (see PRODUCT.md); placeholder content must read as illustrative.
- **Don't** use Space Grotesk or mono for long-form body copy; body text stays in IBM Plex Sans at Muted Ink.
- **Don't** put a kicker/eyebrow label above a heading ("OUR PROCESS", "WHY US", etc.) — this is a full ban, not a default. The heading itself is the entry point to a section; delete the label and let the heading speak.
