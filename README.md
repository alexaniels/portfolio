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
