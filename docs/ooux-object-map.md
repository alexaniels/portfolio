# OOUX object map

The portfolio is built around these objects. Each object has its own look in the design,
and some are also classes in the code.

| Object | Content | Relationships | What you can do (CTA) | In the design | In the code |
|---|---|---|---|---|---|
| **Project** | title, case page, status (ready / coming soon) | has one Case study, uses many Tools | Open the case study | Folder on the Work page | `class Project` + `class ProjectFolder` (js/classes.js) |
| **Case study** | intro, challenge, process, outcome, images | belongs to a Project | Read more / back to work | ovio.html, garn-og-craft.html | `class ReadMore` |
| **Tool** | name, icon, category (design / code / AI) | used in many Projects | See it in the toolbox | Icon on the Toolbox page and the "Tools used" row on each case | HTML list |
| **File** (asset) | file name, preview | belongs to a Project | Open it | Moodboard / PDF icons on the home desktop | `class DesktopIcon` |
| **Me** (profile / CV) | name, bio, photo, internship period, contact info | made all Projects | Contact me | About, Contact, the green welcome line | HTML |

## Relationships

```
Me ──made──> Project ──has──> Case study
               │
               └──uses──> Tool
               └──has───> File
```
