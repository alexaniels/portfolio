# Alexandra Nielsen – Portfolio

A retro "Windows desktop" portfolio, made from my Figma prototype *Portfolio desktop*.
Hand-coded with **HTML, SCSS and JavaScript** (classes + import/export). No frameworks.

## Files

```
index.html          Home (desktop with icons)
about.html          About me
work.html           My projects (folders)
toolbox.html        Tools and technologies
contact.html        Contact
ovio.html           Case study 01
garn-og-craft.html  Case study 02
404.html            "Page not found"

scss/_mixins.scss   variables (colours, fonts) + mixins
scss/style.scss     all the styles  →  compiled to css/style.css

js/classes.js       all classes (Project, DesktopIcon, ProjectFolder, ReadMore) – exported
js/main.js          imports the classes and uses them on the page

assets/             fonts, images, icons
docs/               plan, OOUX object map, AI log
```

## How to work on it

1. Open the folder in VS Code.
2. Click **Watch Sass** in the bottom bar (Live Sass Compiler). It turns `style.scss` into `css/style.css`.
3. Right-click `index.html` → **Open with Live Server**.
   (The JavaScript uses `import`, which only works through a server. Double-clicking the HTML file won't work.)

## The JavaScript in short

| Class | What it does | OOP |
|---|---|---|
| `Project` | One of my projects: title, page, status | private field `#status` + getter `isReady` (encapsulation) |
| `DesktopIcon` | Click = select, double-click = open | `static selected` shared by all icons |
| `ProjectFolder` | A folder on the Work page | `extends DesktopIcon` (inheritance), *has a* Project (composition), overrides `open()` |
| `ReadMore` | "Do you want to read more? Yes" shows the rest of the case | |

To add a project to the Work page: add a line to the `projects` list at the top of `js/main.js`.

## Publish on simply.com

1. Log in to simply.com → alenie.dk → FTP details (or use the File Manager).
2. Upload: all `.html` files, `.htaccess`, and the folders `css/`, `js/`, `assets/`.
   (You don't need `scss/`, `docs/`, `.vscode/`, `.claude/` or `README.md`.)
3. Turn on HTTPS (Let's Encrypt) in the simply.com control panel.

## October 2026 update
Added original GLS and phishing case study screenshots and accessible companion text, plus a seamless scrolling banner with pause control and reduced-motion support. Original assets retained unchanged.


## Project fonts
Phishing Awareness uses Lato, loaded from Google Fonts (requires internet). GLS AI Playbook is configured to use Newson, but the font file was not included in the supplied project. Until you add your licensed Newson font, it falls back to DM Sans. To enable it, add your licensed font files and a corresponding `@font-face` declaration in both CSS and SCSS.

## Newson font setup

Copy your own `Newson-Regular.ttf` and `Newson-Medium.ttf` files into `assets/fonts/`.
The GLS AI Playbook page now loads these with `@font-face` (Regular 400, Medium 500–900).
The Phishing Awareness page continues to use Lato. The font files are not redistributed in this ZIP.


## Review & improvement plan (October 2026)

> Written by Claude (Claude Code) on 2026-10-27, from the code and the site viewed locally at 1440, 800 and 375px wide (Figma not used). Priorities: the internship in France comes first, the exam second. All four case studies are solo projects. LinkedIn: add later, once the profile exists.

### Verdict in one paragraph
The concept is strong and memorable. A retro Win98/XP desktop with a hand-made "PORTFOLIO" monitor and Paint drawings has real personality, and the code is clean and explainable for the exam. The problem is that **the concept currently gets in the way of the content**. A recruiter in France who opens the site sees a monitor, a scrolling ticker and unlabeled folders. In the first 10 seconds they do not learn what you do, what your best project is, or how to hire you. On top of that, the site was finished by two different processes, and it shows: two case pages use a different template, minified code and a bolted-on stylesheet. Fix the first-impression path and unify the case pages, and the site goes from "fun student project" to "hire this person".

### 🔴 Must fix (bugs that cost you interviews)
1. ✅ **Fixed (27 Oct):** the contact email. The link went to `mailto:nielsalexa@gmail.com` while the text said `alexandrat.nielsen@gmail.com`. Both now use `alexandrat.nielsen@gmail.com`.
2. 🟡 **Half done (27 Oct):** "View my CV" and "Download CV (PDF)" buttons now sit on About and Contact. They link to `assets/cv/alexandra-nielsen-cv.pdf`. **Still to do:** put your CV there under that exact name (see `assets/cv/README.md`). Until then the buttons lead to "not found". *LinkedIn: add later, once the profile exists.*
3. **The case-page chain is broken.**
   - OVIO → Garn & Craft → "All work", so nothing leads on to GLS.
   - Phishing says "Previous: GLS AI Playbook →", with an arrow that points the wrong way.
   - Make it one loop: OVIO → Garn → GLS → Phishing → OVIO.
4. **Double-click to open breaks normal link behaviour.** `DesktopIcon.handleClick` in `js/classes.js` calls `preventDefault()` on *every* click, so Cmd/Ctrl-click and middle-click ("open in new tab") stop working. Recruiters open projects in tabs. I'm challenging this choice: let a **single click open**, keep the blue "selected" highlight as hover/focus styling, and drop the "Tip: double-click" line.
5. **The README's deploy steps mention an `.htaccess` file that doesn't exist.** Without it, `404.html` will never be shown. Also, `404.html` uses absolute paths (`/css/style.css`), which break if the site lives in `/portfolio/` as the fake URL bar suggests. Decide on the real URL first.
6. ✅ **Fixed (27 Oct):** `scss/style.scss` did not compile, because the Newson fonts and the Lato `@import` had been pasted above `@use "mixins" as *;`. `css/style.css` had been edited by hand since, and the October banner styles existed *only* in the CSS. What changed:
   - `@use` is first again, and the Newson/Lato lines now sit in section "1. Fonts".
   - The banner styles are merged into section 4 of the SCSS.
   - `css/style.css` is now generated from the SCSS again.
   - `.vscode/settings.json` now tells Live Sass Compiler to write to `/css` (before, it would have written `scss/style.css`).

   Checked by comparing every element's computed style on all 10 pages at 1440, 800 and 375px, before and after: identical. **One visible change:** the Lato `@import` was below other rules, so browsers ignored it, and the Phishing page has been showing Arial. It is now first, so Lato really loads on that page, as intended. That also makes the Google Fonts GDPR point in the France section a live issue.
7. **Font licence risk.** `Newson-*.ttf` files are committed to git, but the README itself says they "are not redistributed". If the GitHub repo is public, that can breach the font licence. Either add them to `.gitignore` or confirm that the licence allows it.

### 🟠 Design: challenging your choices
**A. The home page says nothing.**
- The `<h1>` is a picture of a monitor.
- The only text about you is a moving marquee, which is hard to read and gets cut off on mobile.
- On a phone, you scroll past a monitor and nine icons, and still don't know who you are looking at.
- *Suggestion:* add one static line next to or under the monitor, like a desktop sticky note or a Win98 "Welcome" dialog. For example: "Alexandra Nielsen — multimedia designer (branding · UX/UI · front-end). Looking for an internship in France, 4 Jan–24 Mar 2027", plus a "See my work" button. Keep the marquee as decoration.

**B. Three of the nine home icons go nowhere useful.** Illustrator, Figma and VS Code all lead to Toolbox, and two of them have no visible label. Either cut them, or make one of them meaningful (e.g. the VS Code icon opens the phishing project, "made in code").

**C. The Work page hides the work.**
- On tablet and mobile, the decorative Paint "WORK" drawing comes *before* the projects. At 375px, only the first folder is visible.
- All four folders are identical blue icons with just a name, so a stranger can't tell branding from UX from code.
- *Suggestion:*
  - Put the project window first in the HTML.
  - Give each folder a small thumbnail (a "file preview" peeking out of the folder fits the metaphor) and a one-line tag, e.g. "Branding + web · solo".
  - Order the folders by strength, not by date.

**D. The "Do you want to read more? Yes / No" gate.** It's charming, but it hides your **process**, which is exactly what design recruiters want to see. Today it's also used on only 2 of the 4 cases. Pick one:
- **(recommended)** Keep the joke, but show the process by default. Make "Yes" scroll down and "No" go back.
- Or keep the gate and add it to all four cases consistently.

**E. The four case studies look like two different portfolios.**
- OVIO and Garn use the cream `case-card` with "Case study 01/02", brand fonts, mockups in windows and the read-more gate.
- GLS and Phishing use a `rebuild-*` layout with no case number and tight spacing between headings and text. Phishing also has a dark card and loads Lato from Google.
- *Suggestion:* move GLS and Phishing onto the same template, labelled "Case study 03/04". Keep each project's own colours and fonts through the existing `--case-heading-font`/`--case-body-font` variables, which is already the right idea.

**F. Say "solo" proudly.** All four are solo projects, but the Role lines read like job titles ("Visual identity designer / Brand guideline designer / Web designer"). Add "Solo project" as the first meta item. It's a selling point.

**G. Window buttons that look clickable but do nothing.** The ✕ □ _ buttons on every window are decorative. People *will* click ✕. Either make ✕ a real link back to the desktop (cheap, fun, on-concept), or mute them visually.

**H. Toolbox: 17 logos, no depth.**
- Listing ChatGPT, Gemini *and* Claude, plus Canva, dilutes a design portfolio.
- Your own OOUX map says that a Tool is "used in many Projects", but the page doesn't show this.
- *Suggestion:* group the tools by what you *do* with them, link each one to the cases where you used it, and replace the three chatbot logos with one honest line about how you use AI.

**I. About leads with geography, not value.**
- Open with what you design and what you're looking for.
- Then add: where you are (Paris area), **languages** (Danish / English / French level, which is crucial for France), availability and the CV.
- Make the Contact `<h1>` visible. The page currently looks half-empty.

### 🟡 France-specific
- French recruiters will expect at least a **French summary**: About, Contact and the CV. A full translation isn't required. A small "FR" page or section is enough. Say "stage" in French text.
- Check with IBA how the French *convention de stage* (internship agreement) is handled, and say so on the site or CV if it's covered. French companies usually ask.
- Loading Lato from Google Fonts sends visitors' IP addresses to Google, which is a known GDPR issue in the EU. It's also render-blocking, because the `@import` is in the shared `style.scss` and so loads on *every* page, not just Phishing. Self-host it like your other fonts.

### 🟡 Quality & performance
- **Images:** 8.8 MB in total. About **2.8 MB is unused** (`gls-ai-playbook/playbook.png`, `phishing-awareness/overview.png`, `process.png`, `phishing-choices.png`, `ovio/ovio-moodboard-full.jpg`). The 863 KB `monitor-portfolio.png` is the first thing that loads, so convert it to WebP (~100 KB).
- **Missing image sizes:** GLS and Phishing images have no `width`/`height`, so the layout jumps while they load.
- **Too many fonts:** 10 families. Each case may keep its brand fonts, but only load them on that case page.
- **Sharing:** there are no Open Graph tags or preview image, and links shared on LinkedIn will look blank. Add `og:title`, `og:description` and `og:image` (the monitor works well).

### 🟡 Code you'll have to defend at the exam
- `gls-ai-playbook.html` and `phishing-awareness.html` are **minified onto one line**, and the end of `scss/style.scss` is minified CSS bolted on. You can't explain code you can't read. Re-format them, and fold the CSS into the existing structure.
- `docs/ai-log.md` doesn't mention the October update (new cases, marquee, fonts), and several "To do" assessments are still open. Examiners will check this.
- The README has two contradictory font sections ("not included" vs "now loads"). Merge them.
- `ProjectFolder.open()` still uses `alert()` for "coming soon". It's dead code now, but if you keep the feature, use a Win98-style dialog. That's on-concept and better UX.

### 🟢 Copy polish
- The two halves of the marquee use different date formats ("January 4th – March 24th" vs "4th of January – 24th of March"). Pick one.
- "frontpage" → "front page".
- Phishing concept: "(iba.@iba.clk) and not (iba@iba.dk)" → "from a look-alike address (iba.@iba.clk instead of iba@iba.dk)".
- The moodboard icons are labelled ".png" (but are .jpg) and GLS is labelled ".pdf" (but opens a web page). This is fine as a joke, but don't promise a PDF you don't deliver. Consider linking the real PDF.

### Suggested order of work
1. The must-fix items 1–3 (≈1 hour, biggest impact).
2. Home intro line + single-click icons (A, item 4).
3. Work page: projects first, folder previews (C).
4. Unify GLS/Phishing onto the case template + a decision on the read-more gate (D, E).
5. CV, languages, French summary (I, France section). LinkedIn later, once it exists.
6. Performance and OG tags, then update the AI log and the README.

### Verification (when fixes are made later)
- Serve the folder locally (Live Server) and check at 375, 800 and 1440px:
  - The home page explains who you are without scrolling.
  - Projects are visible on Work without scrolling.
  - Cmd-click opens a new tab.
  - The email link matches its text.
- Run Lighthouse and axe on home and on one case page.
- Paste the URL into LinkedIn's Post Inspector to check the preview.
