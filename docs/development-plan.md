> **Update 2026-09-29:** after the first build, the project was **simplified to my level**:
> 2 JS files (`main.js` + `classes.js`), `style.scss` + `_mixins.scss`, case pages as plain HTML,
> and only double-click icons/folders + the "Read more? Yes" button as interaction.
> Sections 3–4 below describe the first, more advanced plan and are kept for the report
> (to show how the plan changed).

# Portfolio: from Figma prototype to website (development plan)

## Context
Alexandra has a finished desktop prototype in Figma (file `6OFYv1xpwtMNXDi5AFXvdP`, page "Final portfolio 2026", the **right-hand section**). It needs to become a real website that works for both the school exam and an internship application (4 Jan to 24 Mar 2027). The exam requires:
- Responsive, accessible and interactive
- Hand-coded HTML, SCSS and vanilla JS
- OOP (classes, encapsulation, inheritance, composition)
- ES6 modules
- OOUX-driven structure
- Documented, critically assessed AI use
- A public URL

The project folder `/Users/alexandra/Desktop/claude portfolio folder` is empty, so this is a greenfield build.

**Decisions already made:** English UI. Hosting on **simply.com** (the design shows `alenie.dk`). SCSS compiled with the **VS Code Live Sass Compiler**. Contact is a **retro dialog window**. GLS AI Playbook and Cyber security use the **same case template**, with content added later. **Rich desktop** interactivity. **Multi-page** site with shared JS modules.

---

## 1. Analysis of the prototype

### Concept
A nostalgic Windows XP/98 desktop. The background is a grainy pink/olive/green gradient with desktop icons, a CRT monitor with the "PORTFOLIO" wordmark, and content shown inside browser and Paint windows. It has a strong personality and a clear concept, and the metaphor (folders = sections, files = projects) is already object-oriented. That makes it a very good fit for OOUX + OOP.

### Screens (desktop, about 1440px wide)
| Screen | Content | Interaction potential |
|---|---|---|
| **Home** | Header (name + Work/About/Toolbox/Contact), green **marquee** ("Welcome… internship from 4th of January 2027 – 24th of March"), CRT monitor hero, desktop icons: folders (Work, About, Toolbox), files (OVIO moodboard.png, Garnogcraft-moodboard.png, GLS AI Playbook.pdf), apps (Ai, Figma, VS Code), © footer | Icons open windows / navigate. Draggable icons and windows. Marquee |
| **About** | BrowserWindow (`alenie.dk/portfolio/about`) with bio text; a second BrowserWindow behind it with the portrait | Window stacking/focus, drag, close/minimise |
| **Toolbox** | Paint window with a hand-drawn toolbox; green panel "Tools and technologies" with 17 tool icons in groups (Design: Figma, Ai, Id, Ps, Ae, Pr, Canva, Procreate · Code: HTML, CSS, SCSS, JS, GitHub, WordPress · AI: Gemini, ChatGPT, Claude) | Filter by category, tooltip or "used in projects" link |
| **Work** | BrowserWindow (`/portfolio/work`) with 4 project folders (Ovio, Garn & Craft, GLS AI Playbook, Cyber security scenario); Paint window with a "WORK" drawing | Folder → case page |
| **Case 01 OVIO** / **Case 02 Garn & Craft** | Cream card: title, intro, Role/Subject/Year, Tools used, Challenge, Concept, Colors, Typography, mockups. Then **"DO YOU WANT TO READ MORE ABOUT THIS CASE STUDY?" Yes / No, take me back** → "continued" card (moodboard, process, personas, testing, outcome, galleries) | Progressive disclosure, lightbox for images |
| **Component sheet** | Win98 dialogs (Welcome, Install, Saving, Error, Setup, Notes, Web browser, User, Player, Audio) + icons | Source for the Contact dialog, a loading bar, and the "file not found" dialog |

### Design observations to handle in code
1. **Window chrome is raster images in Figma.** Rebuild it in CSS/SCSS: sharp at any size, themeable, and the buttons become real `<button>`s.
2. **No mobile/tablet frames.** The plan below defines breakpoints and how the desktop turns into a stacked "phone" layout.
3. **Body text on case pages is small and letter-spaced** (Lexend Giga, about 11–12px in OVIO). For readability (WCAG 1.4.12, 1.4.4): use the UI font (appears to be *DM Sans*, verify in Figma) at ≥16px for running text. Keep the case brand fonts for headings and specimens only.
4. **Heading hierarchy is missing.** Every page needs one `<h1>` (e.g. "Hello, I'm Alexandra", "Tools and technologies", "Case study 01 – OVIO").
5. **Pixel-style "DO YOU WANT TO READ MORE…" heading.** Must be live text, not an image.
6. **Small copy fixes:** "broad mix *of* design…", "*its* unique character". Live Danish text in the OVIO/Garn mockups gets `lang="da"`.
7. **Contrast to check:** black nav text on the light gradient (OK). White on dark green (OK). Captions under icons on the saturated gradient areas are risky, so give them a text-shadow/backdrop.

---

## 2. OOUX: object map (drives both the UI and the code)

| Object | Core content (attributes) | Metadata | Nested objects / relationships | CTAs |
|---|---|---|---|---|
| **Profile** (me / CV) | name, bio, portrait, location, study | internshipPeriod, cvUrl | has many **Tool**, has many **ContactChannel**, authored many **Project** | Open CV, Contact |
| **Project** | title, slug, tagline, thumbnail, folder icon | year, role[], subject[], status (published / draft) | uses many **Tool**, has one **CaseStudy**, has many **Asset** | Open case, Open moodboard |
| **CaseStudy** | intro, sections (blocks) split into `summary` and `continued` | — | belongs to **Project**, contains **Block**s (text, image, gallery, palette, typography, list, persona) | Read more, Back to work, View image |
| **Tool** (skill) | name, icon | category (design / code / AI) | used in many **Project** | Show projects using this tool |
| **Asset** (desktop file) | filename, type (png/pdf/app), preview src | alt text | belongs to **Project** (optional) | Open in window |
| **ContactChannel** | label, value, href | type (email / linkedin / github) | belongs to **Profile** | Copy, Open |

Deliverable: `docs/ooux-object-map.md` (plus an optional FigJam/drawing for the report). The JSON schema in `/data` mirrors this table exactly, so there is a 1:1 link between the OOUX map, the data and the classes.

---

## 3. Architecture

### File structure
```
/ (site root = what gets uploaded to simply.com)
├── index.html  about.html  toolbox.html  work.html  case.html   # case.html?project=ovio
├── 404.html
├── data/        profile.json  projects.json  tools.json
├── assets/      img/ (webp + fallbacks)  icons/ (svg)  fonts/  cv/
├── scss/
│   ├── abstracts/  _tokens.scss _mixins.scss _functions.scss
│   ├── base/       _reset.scss _typography.scss _a11y.scss
│   ├── layout/     _header.scss _footer.scss _desktop.scss _page.scss
│   ├── components/ _window.scss _browser-window.scss _paint-window.scss _dialog.scss
│   │               _icon.scss _button.scss _marquee.scss _tool-grid.scss _case.scss _blocks.scss _taskbar.scss
│   ├── pages/      _home.scss _about.scss _toolbox.scss _work.scss _case.scss
│   └── main.scss   (@use everything)
├── css/         main.css (+ .map)   ← generated by Live Sass Compiler
├── js/
│   ├── core/       Component.js  EventBus.js  DataService.js
│   ├── models/     PortfolioObject.js Profile.js Project.js CaseStudy.js Tool.js Asset.js
│   ├── ui/         Window.js BrowserWindow.js PaintWindow.js DialogWindow.js ContactDialog.js
│   │               WindowManager.js Draggable.js Taskbar.js
│   │               DesktopIcon.js FolderIcon.js FileIcon.js AppIcon.js
│   │               Header.js Marquee.js Disclosure.js Lightbox.js ToolGrid.js ProjectFolderList.js
│   ├── blocks/     Block.js TextBlock.js ImageBlock.js GalleryBlock.js PaletteBlock.js
│   │               TypographyBlock.js ListBlock.js PersonaBlock.js blockFactory.js
│   ├── pages/      home.js about.js toolbox.js work.js case.js
│   └── app.js      shared bootstrap (Header, ContactDialog, WindowManager) imported by every page
├── docs/        ooux-object-map.md  ai-log.md  decisions.md
└── .vscode/settings.json   Live Sass Compiler config (scss → /css, compressed + sourcemap)
```

### OOP design (how each exam criterion is shown)
- **Classes and encapsulation**
  - Private fields and methods (`#state`, `#cache`, `#onPointerMove`) in `DataService`, `Window` and `Draggable`, with getters instead of public mutable state.
  - Models validate data in their constructors.
- **Inheritance**
  - `Component` → `Window` → `BrowserWindow` / `PaintWindow` / `DialogWindow` → `ContactDialog`
  - `DesktopIcon` → `FolderIcon` (navigates) / `FileIcon` (opens a preview window) / `AppIcon` (shows a tool tooltip)
  - `PortfolioObject` (id, slug, title) → `Project` / `Tool` / `Asset`
  - `Block` → `TextBlock` / `ImageBlock` / `PaletteBlock` / …, with polymorphic `render()`
- **Composition**
  - `Window` *has a* `Draggable` behaviour. Icons reuse the same class.
  - `WindowManager` *has many* `Window`s and owns z-index, focus order and minimise/restore via `Taskbar`.
  - `CaseStudy` *has many* `Block`s. `Project` *has a* `CaseStudy` and *has many* `Tool`s (resolved by `DataService`).
- **ES modules**: one class per file with `export default`. Each page entry (`pages/*.js`) imports only what that page needs and is loaded with `<script type="module">`.
- **Progressive enhancement**: HTML holds the real content and links, e.g. folder icons are `<a href="work.html">`. JS adds dragging, windows and dialogs on top. Without JS, everything can still be read and navigated.
- `EventBus` (a small custom-events wrapper) decouples things. Example: `FileIcon` emits `window:open` and `WindowManager` listens.

### Data-driven pages
- **`case.html?project=ovio`**: `DataService.getProject(slug)` → `CaseStudy` → `blockFactory` builds the Block instances → render the summary card. The `Disclosure` component then handles Yes/No and renders the `continued` blocks on "Yes". An unknown slug shows a Win98 "File not found" dialog plus a link back.
- **work.html**: `ProjectFolderList` renders folders from `projects.json`. Adding GLS or Cyber security later only needs JSON and images, not new HTML.
- **toolbox.html**: `ToolGrid` renders grouped tools from `tools.json` with category filter buttons, and each tool can list "used in: OVIO, Garn & Craft".
- **about.html** and the **ContactDialog**: read from `profile.json`.

---

## 4. Interaction spec (rich desktop)
- **Windows**
  - Drag by the title bar (pointer events, constrained to the viewport).
  - Click or focus brings a window to the front.
  - Title-bar buttons: minimise (goes to the taskbar, restore from there), maximise (toggle full width), close (hide; reopen via the icon or taskbar). Never leave the user without a way to get content back.
- **Desktop icons**
  - Single click or Enter selects. Double-click or Enter opens.
  - On touch devices, one tap opens.
  - Icon positions can be dragged. Optionally save them to `localStorage` and add a "Reset desktop" action.
- **FileIcon previews**: OVIO/Garn moodboard PNGs open in an image-viewer window. The GLS PDF opens in a window with a link to the PDF.
- **Marquee**: CSS animation. Pauses on hover and focus and has a pause button (WCAG 2.2.2). Static under `prefers-reduced-motion`.
- **Case "Read more?"**: *Yes* is a `<button aria-expanded aria-controls>` that reveals the continued section and moves focus to its heading. *No* is an `<a href="work.html">`.
- **Lightbox** for case images: `<dialog>`, Esc closes, arrow keys switch images.
- **ContactDialog**
  - Native `<dialog>` with `showModal()`, so the focus trap and Esc come for free.
  - Contents: email with a "Copy" button (Clipboard API + live-region confirmation), LinkedIn, GitHub, and a CV download.
  - Opened from the nav "Contact" on every page. Contact is an `<a href="#contact">` fallback to the footer contact info when JS is off.
- **Micro-details (optional polish)**: a Win98 "Saving (55%)" loader as the loading state while JSON is fetched. The "OK" / "Continue" style for buttons.

## 5. Responsive strategy
| Breakpoint | Layout |
|---|---|
| **≥1024px (desktop)** | As in Figma: absolutely positioned icons around the monitor, overlapping draggable windows, 3-column case grid |
| **600–1023px (tablet)** | Icons in a grid above and below the monitor. Windows static and stacked with a slight overlap. Drag stays on for pointer devices. 2-column case grid |
| **<600px (mobile)** | Nav becomes a "Start" menu button (a nice nod to the theme, with `aria-expanded`). Monitor scales down. Icons in a 3-column grid. Windows are full-width static cards (dragging off via `matchMedia` inside `Draggable`). 1-column case layout. Marquee stays |

- Mobile-first SCSS with `@include mq(md)` mixins.
- Fluid type with `clamp()`.
- Images via `<picture>`/`srcset` in WebP with `loading="lazy"` below the fold.

## 6. Accessibility checklist (WCAG 2.2 AA)
- Semantic landmarks, a skip link, one `<h1>` per page, `aria-current="page"` in the nav, `lang="en"` (+ `lang="da"` on Danish snippets).
- All interactive elements are real `<a>`/`<button>` with visible `:focus-visible` styles in the Win98 dotted-outline style. Window buttons get `aria-label` ("Close About window").
- Windows are `<section aria-labelledby="title-id">`. Dialogs use `<dialog>`. A live region announces "Window minimised" and "Email copied".
- Dragging is never the only way to do something (WCAG 2.5.7). Every action also has a button or keyboard path.
- Meaningful `alt` text on the portrait, mockups and moodboards. Decorative gradients and noise are CSS backgrounds.
- `prefers-reduced-motion`: no marquee scrolling, no window animations.
- Text ≥16px, contrast ≥4.5:1, and the layout still works at 200% zoom and 320px width.

## 7. Design tokens (from Figma; exact values confirmed with `get_variable_defs` / `get_design_context` on the frames)
- Colours: marquee/panel green (about `#2E5E1E`), cream card (about `#F8F2E6`), Win blue title bar gradient, Win grey `#C0C0C0`, pink accent (WORK lettering), plus the case palettes (OVIO: Vanilla cream, Butter cream, Olive green, Dark brown, Paprika. Garn: light, brown, blue-grey, green, rose).
- Typography: UI font (DM Sans-like, to be confirmed), Win dialog font (Tahoma/system stack), pixel font for the "read more" banner. Case brand fonts (Lexend Giga, Rubik Spray Paint, Merriweather Sans, Roboto) only where they appear as specimens. Self-hosted `woff2` with `font-display: swap`.
- Background: layered CSS radial gradients plus a small tiled grain PNG/SVG-noise overlay (much lighter than a full-page raster).

---

## 8. Phases & milestones
0. **Setup and assets**
   - `git init` + a private GitHub repo (commit history is evidence for the report), `.vscode/settings.json` for Live Sass, Live Server for local testing (ES modules and `fetch` don't work over `file://`).
   - I'll need **"Copy link to selection" links for the 6 final frames + the component sheet**. The page-level Figma call is too large, so frame IDs give exact tokens, fonts and asset downloads.
   - Export assets to WebP: monitor, wordmark, Paint drawings, portrait, mockups, moodboards, tool icons.
1. **OOUX document**: object map, relationships and CTA matrix → `docs/ooux-object-map.md`. Write the JSON for OVIO + Garn & Craft (copy from Figma). GLS and Cyber security get `status: "draft"` placeholders.
2. **SCSS foundation**: tokens, reset, typography, mixins (`mq`, `win-bevel`, `focus-ring`), the background.
3. **Core JS**: `Component`, `EventBus`, `DataService` (fetch + cache + error handling), models.
4. **Shared shell**: `Header` (+ mobile Start menu), `Marquee`, footer, `ContactDialog` via `app.js`.
5. **Window system**: `Window`, `Draggable`, `WindowManager`, `Taskbar`, then the `BrowserWindow`, `PaintWindow` and `DialogWindow` subclasses.
6. **Pages**: Home (icons + monitor + file previews) → About → Toolbox (`ToolGrid` + filter) → Work (`ProjectFolderList`).
7. **Case template**: the `Block` hierarchy + `blockFactory`, `Disclosure`, `Lightbox`, and the 404 / "file not found" state.
8. **Responsive pass**: 320 / 375 / 768 / 1024 / 1440 / 1920.
9. **Accessibility and quality pass**: keyboard-only walkthrough, VoiceOver (Safari), axe DevTools, Lighthouse (aim ≥95 on a11y, best practices and SEO), W3C HTML validator, meta/OG tags + favicon.
10. **Deploy to simply.com**: upload the site root via SFTP (FileZilla) or the simply.com file manager to `alenie.dk` (or a subfolder `/portfolio/`, matching the URLs in the design). Force HTTPS and check that the JSON MIME types and relative paths work in production.
11. **Report material**: finish `docs/ai-log.md`, add diagrams (OOUX map, class diagram), and screenshots before and after.

## 9. Documenting AI use (for the report)
- `docs/ai-log.md` gets one entry per use: date, tool (Claude/ChatGPT/…), purpose, a short prompt summary, what was produced, **what I changed or rejected and why** (correctness, accessibility, maintainability), and how I verified it.
- Mark AI-assisted files or functions in commit messages (e.g. `feat(window): Draggable — AI draft, refactored to pointer events + keyboard fallback`).
- **Ownership:** each class gets a short JSDoc header explaining its responsibility, so Alexandra can explain every file at the exam. I'll write the code in small, reviewable steps (one class or component at a time) rather than one big dump.

## 10. Verification (end-to-end)
- Run locally with VS Code **Live Server**. Live Sass compiles to `css/main.css` with no errors, and the console is clean on every page.
- **Functional:**
  - Open, drag, focus, minimise, restore and close windows (mouse, keyboard and touch).
  - Icons navigate or open previews.
  - The marquee pauses.
  - `case.html?project=ovio` and `?project=garn-og-craft` render from JSON, Yes/No works, and an invalid slug shows the error dialog.
  - The Contact dialog traps focus, Esc closes it, and copying the email is announced.
  - With JS disabled, all content is still reachable.
- **Responsive**: test at the listed widths in the browser devtools/pane, plus a real phone.
- **A11y**: axe = 0 serious issues, Lighthouse a11y ≥95, keyboard-only and VoiceOver runs, 200% zoom, reduced motion.
- **Visual**: compare each page side by side with the Figma frame screenshots.
- **Production**: after the simply.com upload, re-run Lighthouse on the live URL and test on iOS Safari and Android Chrome.
