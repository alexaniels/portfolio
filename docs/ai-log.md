# AI log

Every use of generative AI in the project, for the project report.
For each entry: what I asked, what came back, **what I changed or rejected and why**, and how I checked it.

> I write the "My assessment" column myself. Where it says _To do_, I still need to review the code and describe my own changes.

| # | Date | Tool | What I used it for | What AI produced | My assessment and changes | How I checked it |
|---|---|---|---|---|---|---|
| 1 | 2026-09-29 | Claude (Claude Code + Figma connector) | Analysing my Figma prototype against the exam requirements | Screen overview, OOUX object map, development plan | I chose: English, simply.com hosting, Live Sass Compiler | Compared with my Figma file and the exam brief |
| 2 | 2026-09-29 | Claude | Getting colours, fonts, positions and images out of Figma | Colour codes, font names, exported images, self-hosted fonts | _To do: check against Figma_ | Figma and the browser side by side |
| 3 | 2026-09-29 | Claude | First version of the code | A big version with ~40 JS files, many SCSS files and JSON data | **Rejected**: far too advanced for my level. I could not explain it at the exam, and it didn't match how we work in class (1 JS file, 1 SCSS file + 1 partial) | Read it and asked myself: can I explain this? |
| 4 | 2026-09-29 | Claude | Simpler version at my level | `main.js` + `classes.js` (4 classes), `style.scss` + `_mixins.scss`, case pages in plain HTML | Kept 2 JS files, not 1, because the brief requires import/export. Removed dragging, popups and JSON. _To do: go through every line and write down what I changed_ | Tested in the browser: double-click, "coming soon" message, "Yes" button, phone size |
| 5 | 2026-09-29 | Claude | Copy edits | "broad mix **of** design", "**its** unique character", phone number as +33 7 … | _To do: approve or change back_ | — |
| 6 | 2026-10 | _To do: which tool?_ | October update: GLS and Phishing case pages, scrolling banner with pause button, fonts | Two case pages and CSS written as minified one-liners, added to `css/style.css` by hand (not to the SCSS) | _To do_. Note: the SCSS stopped compiling because of this; fixed in #8 | — |
| 7 | 2026-10-27 | Claude (Claude Code) | Review of my portfolio (design + code), from the code and the site in a browser. Figma not used | Review and improvement plan in `README.md` | _To do_ | Read it and decided which points to follow |
| 8 | 2026-10-27 | Claude (Claude Code) | Implementing the review on the `dev` branch | Email fix, CV buttons, SCSS compile fix, single-click icons, Win98 message box, Welcome box, folder previews, GLS/Phishing on the case template, Toolbox/About/Contact rewrites, self-hosted Lato, Open Graph tags, `.htaccess` | _To do: go through the diff and write what I changed or rejected_ | Claude tested all 10 pages at 1440 and 375px (links, fonts, no sideways scroll, buttons, dialog). _To do: my own test in Chrome_ |
