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
