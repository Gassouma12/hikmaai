# HIKMA AI — Project Guide

> **Beyond Artificial Intelligence, Towards Wisdom.**
> A multi-page, responsive React site for HIKMA AI — a media, research, and public
> education platform reconnecting AI with philosophy, ethics, and social justice, and
> centering the voices of Africa and the Arab world.

This file orients Claude Code (and any contributor) to the codebase. It was created
during the rebuild of the original single-file HTML site into a React app.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server on http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

There is no test suite or linter configured yet.

## Stack

- **React 18** + **Vite 5** (SPA, no SSR)
- **react-router-dom v6** for client-side routing (one route per content section)
- **framer-motion v11** for page transitions, scroll reveals, and the timeline progress line
- **lucide-react** for the contact-form icons (Paperclip/FileText/Send/X). The footer's
  brand badge and social marks (Facebook/Instagram/YouTube/LinkedIn) are inline SVGs —
  lucide v1 dropped brand logos.
- **@paper-design/shaders-react** (`MeshGradient`) powers the Home **`MeshHero`** — an
  animated deep-purple WebGL gradient hero. It's scoped to the hero and **unmounted via
  `useInView` when scrolled off-screen** so the GPU idles. (`GeodesicSphere.jsx` /
  `CalligraphyFlourish.jsx` are now unused — the orb hero was retired.)
- Plain CSS with CSS custom properties (no CSS framework). Three global stylesheets,
  imported once in `src/main.jsx`.

## Architecture

Single-page app. `src/main.jsx` mounts `<BrowserRouter><App/></BrowserRouter>` and imports
all CSS. `src/App.jsx` renders the persistent `<Navbar>` / `<Footer>` and an
`<AnimatePresence mode="wait">` wrapping the `<Routes>`, so each page animates in/out.

Routes (each is a page in `src/pages/`):

| Path          | Page            | Contents                                                        |
| ------------- | --------------- | -------------------------------------------------------------- |
| `/`           | `Home.jsx`      | Full-bleed **purple animated mesh-gradient hero** (`MeshHero`: slogan + amber highlight, glass "Explore Now" CTA, nav overlaid), marquee, **Our Heritage** (Baghdad/Timbuktu **arch-topped cards** with illustrated scenes + stat cards), **Vision** (six pillar cards), quote |
| `/about`      | `About.jsx`     | Masthead lede + **Founder** (Maha Jouini, real photo) only. Nav label is **"Founder"** |
| `/harms`      | `Harms.jsx`     | Four alternating copper-accented harm cards |
| `/media`      | `Media.jsx`     | **The Hikma Dialogues** podcast: episode list (mock data). Nav label is **"Voices"** |
| `/philosophy` | `Philosophy.jsx`| Scroll-driven timeline with star-medallion nodes (Socrates → HIKMA AI) |
| `/contact`    | `Contact.jsx`   | Partnerships/podcast contact: storytelling aside + form (name, email, message, PDF dropzone) with a success state |

`*` falls back to `Home`. **Nav** (`NAV` in `content.js`): Founder · The Harms · Voices ·
Philosophy, plus the highlighted **Get in Touch** pill. There is no longer a Vision page or
a Geography map — that content was folded into Home / removed.

### Key conventions

- **All copy lives in `src/data/content.js`.** Pages are declarative and map over these
  arrays/objects. Edit text there, not in JSX, so wording stays in one place.
- **`src/components/Reveal.jsx`** is the scroll-reveal primitive (framer-motion fade + rise).
  - Default: animates `whileInView` (once it scrolls into view).
  - Pass **`immediate`** for content above the fold on load (page headers). Without it,
    such content renders at opacity 0 for a frame before the IntersectionObserver fires,
    causing a visible flash. **Always use `immediate` on page-header reveals.**
- **`Masthead.jsx`** is the shared editorial section header — an index numeral + bilingual
  (Arabic + English) kicker, a large serif title, and an optional lede. Use it at the top of
  every page/major section so the "indexed manuscript" rhythm stays consistent. Pass
  `immediate` on page-level mastheads (above the fold) for the same reason as `Reveal`.
- **`ArabicTexture.jsx`** renders the site-wide low-opacity Arabic geometric texture
  (girih + khatim SVG `<pattern>`s). It is mounted once in `App.jsx`, fixed at `z-index:-2`
  behind everything. Keep section/card backgrounds transparent or semi-transparent (rgba)
  so the texture reads through — **don't reintroduce opaque section backgrounds.** Tune its
  subtlety via `.arabic-texture { opacity }` in `global.css` (currently ~0.38).
- **`StarMotif.jsx` / `StarDivider.jsx`** are the 8-point-star (khatim) ornament and the
  star-in-a-rule section divider used throughout (timeline nodes, fact bullets, quote).
- **`HeritageScenes.jsx`** exports `BaytAlHikmaScene` / `TimbuktuScene` — portrait light-themed
  SVG illustrations composed to fill the **arch-topped** `.arch-card-media` (dome via
  `border-radius`, scene `preserveAspectRatio="...slice"`). Swap for photos later if desired.
- **`GeodesicSphere.jsx`** is the hero "knowledge orb" (gold wireframe globe, teal-glowing
  `.orb-node`s, `.orb-halo`, float animation). **`CalligraphyFlourish.jsx`** is the faint
  arabesque at the hero edges (`side="left|right"`, mirrored via `scaleX(-1)`).
- The Home **hero has no padding** (`.hero { padding: 0 }`) and is a two-column grid:
  slogan + glowing `.btn-glow` ("Explore Now") + `.hero-watch-link` on the left, the
  `GeodesicSphere` orb on the right, calligraphy flourishes behind. It stacks below 920px.
  (The old `heroimg.png` framed-image hero was retired; its `.hero-frame`/`.hero-watch` CSS
  remains unused.)
- **`CountUp.jsx`** animates a number from 0 to its target when it scrolls into view. It
  parses decorated values — `"2B+"`, `"700K+"`, `"1,200"`, `"34.7%"` — keeping any
  prefix/suffix and the original grouping/decimals; non-numeric values like `"∞"` render
  unchanged. Honours reduced-motion. **Wrap every displayed stat figure in it**
  (heritage stats, founder stats, podcast stats); don't use it on ordinal index numerals.
- **Navbar** (`.nav` → `.nav-pill`, all DM Sans) is a floating centred pill at rest
  (`top:18px`, dot-cluster brand mark + the five links). **On scroll** (`scrolled` state
  toggled at `scrollY > 30`) the wrapper `.nav` pins to `top:0` and becomes a full-width
  glassmorphism bar (blur + translucent bg + hairline border) while the pill flattens to
  transparent; it reverts on scroll up. All transitions live on `.nav` (~0.45s ease). It
  collapses to a hamburger + rounded drawer below 1024px, and lives in `App.jsx`, so it is
  identical on every page.
- **`Contact.jsx`** form is front-end only (no backend) — `handleSubmit` just shows the
  success panel; the PDF dropzone keeps files in local state and uploads nothing. Wire it to
  an email/API service to make it live. The navbar's highlighted **`.nav-cta` "Get in Touch"**
  pill (and the drawer's `.nav-drawer-cta`) and the footer's "Get in Touch" all point to
  `/contact`. Copy lives in `CONTACT` in `content.js`.
- **`Footer.jsx`** (in `App.jsx`, so it's on every page) is a tall "animated" footer:
  brand + description + social row + a single nav row (wired to the real routes via
  `NAV`, plus a "Get in Touch") + legal line, over a giant faded Arabic **حكمة** wordmark
  (`.ftr-bigtext`) with a star-badge centred on a gradient line (`.ftr-*` classes). Social
  links (Facebook/Instagram/YouTube/LinkedIn) are placeholder `#`. Bottom padding on
  `.ftr-inner` reserves the decorative band so content never overlaps the badge.
- **`PageTransition.jsx`** wraps every page's root as `<motion.main className="page">`;
  pair it with the `AnimatePresence` in `App.jsx`.
- **`ScrollToTop.jsx`** resets scroll on route change.
- **`.shell`** is the centered max-width (~1240px) content container with horizontal padding.
- **Timeline gotcha:** the alternating timeline relies on empty `.tl-empty` placeholder
  divs keeping their `1fr` grid column. Only hide them (`display:none`) inside the mobile
  breakpoint — hiding them globally collapses content into the narrow center column.

## Design system

The theme is **"Sunlit Library"** — bright ivory parchment, deep ink, burnished gold, and
one electric-cyan accent. **Do not introduce new brand colors** — use the CSS variables in
`src/styles/global.css`. Token names are kept from earlier iterations but remapped, so a
token's role is not always literal:

- Surfaces: `--paper #FDF9F0` (page bg), `--paper-2 #f6efde`, `--card #fffdf8`,
  `--deep`/`--olive`/`--olive-mid` are warm light surfaces. `--watermark #e8e4d8` (texture).
- Ink text: `--ivory #1A1A1A` (primary), `--ivory-dim #45433d`, `--text-dim #6c685d`,
  `--white #0d0d0c` (emphasis). **`--black #121212`** = dark marks ON cyan/gold, not a bg.
- Burnished gold (legacy / **thin borders, icons, subtle branding** — not body text):
  `--gold-bright #D4AF37`, `--gold #c39a2c`, `--gold-dim #a8862a`; `--sand #9a7a22` /
  `--sand-light #8a6f1f` are deep golds used for heading emphasis & card titles.
- **Electric cyan** (`--teal #00F2FF`, `--teal-deep`, `--teal-ink #003940` for text on cyan,
  `--teal-glow`) = "AI energy" / primary accent — **all interactive CTAs** (`.btn-primary`
  ink-bleed hover, `.btn-glow`, `.nav-cta`, `.arch-card-btn`), the orb nodes, and card glows.
- Earth: `--copper #b5642f` (the "Harms" accent).

**Performance:** keep it smooth — no `backdrop-filter`, no `mix-blend-mode` overlays, and no
SVG blur filters (`feGaussianBlur`) on animated/scrolling elements (they re-rasterize every
frame and were the source of the old stutter). Use CSS radial-gradient glows / box-shadows
instead, and prefer `transform`/`opacity` animations.

Fonts (Google Fonts in `index.html`):
- `--font-serif` / `--font-display` **Libre Caslon Text** — all headings (high-contrast serif)
- `--font-sans` **Inter** — body, navigation, labels, UI

### Stylesheets

- `src/styles/global.css` — tokens, resets, the static Arabic-texture watermark background
  stack, shared primitives (`.masthead`, `.kicker`, `.star-divider`, `.lede`, `.btn`,
  `.panel`, `.corner-ticks`, `.shell`, `.page`), reduced-motion.
- `src/styles/layout.css` — nav (floating pill + drawer), hero (asymmetric + watermark +
  side rail), marquee, quote, footer. All backgrounds transparent so the texture shows through.
- `src/styles/pages.css` — per-page layouts (`.index-list`, `.manuscript`, `.founder-*`,
  `.vision-layout`/`.objective`, `.harm-row`, `.podcast-intro`/`.episode`, `.timeline`).

Responsive breakpoints: `1024px` (nav collapses to a hamburger drawer, grids narrow) and
`680px`/`600px`/`768px` (single-column). The timeline collapses to a left-rail layout on
mobile.

## Notes & TODO

- Links to social, footer destinations are placeholder `#` / `href="#"`. Podcast episode
  data lives in `content.js` (`PODCAST`, `EPISODES`); each episode's `youtube` is `'#'` —
  swap in real YouTube URLs there.
- The founder photo is `src/images/maha.jpeg`, imported in `About.jsx` and shown inside the
  ornamented `.founder-frame` (object-fit: cover). Replace that file to change the portrait.
- Image assets in `src/images/`: `maha.jpeg` (founder), `heroimg.png` (hero frame — ~2.3 MB,
  worth compressing), `shape.svg` (the civilization map marker, tinted via CSS mask).
- No analytics, SEO meta beyond `index.html`, or i18n yet. Arabic strings are presentational.
