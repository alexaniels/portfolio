// ==========================================================
// main.js
// Runs on every page. It imports the classes from classes.js
// and uses them on the page that is open.
// ==========================================================

import { Project, DesktopIcon, ProjectFolder, ReadMore, FitToScreen } from './classes.js';


// ----------------------------------------------------------
// 1. My projects (Project objects)
// To add a project: add one line here. The order here is the
// order of the folders on the Work page.
// ----------------------------------------------------------
const projects = [
  new Project('OVIO', 'ovio.html', 'ready', 'assets/img/work/folder-ovio.jpg', 'Branding + web'),
  new Project('Garn & Craft', 'garn-og-craft.html', 'ready', 'assets/img/work/folder-garn.jpg', 'UX/UI + web'),
  new Project('GLS AI Playbook', 'gls-ai-playbook.html', 'ready', 'assets/img/work/folder-gls.jpg', 'Editorial design'),
  new Project('Phishing Awareness', 'phishing-awareness.html', 'ready', 'assets/img/work/folder-phishing.jpg', 'Interactive + code'),
];


// ----------------------------------------------------------
// 2. Home page: make the desktop icons work
// ----------------------------------------------------------
const homeIcons = document.querySelectorAll('.home .desktop-icon');

homeIcons.forEach((icon) => {
  new DesktopIcon(icon);
});


// ----------------------------------------------------------
// 3. Work page: make a folder for every project
// ----------------------------------------------------------
const folderList = document.querySelector('.folder-list');

if (folderList) {
  projects.forEach((project) => {
    const folder = new ProjectFolder(project);

    const listItem = document.createElement('li');
    listItem.append(folder.element);
    folderList.append(listItem);
  });
}


// ----------------------------------------------------------
// 4. Case pages: "Do you want to read more about this case study?"
// ----------------------------------------------------------
const yesButton = document.querySelector('.readmore__yes');
const continuedSection = document.querySelector('#continued');

if (yesButton && continuedSection) {
  new ReadMore(yesButton, continuedSection);
}


// ----------------------------------------------------------
// 5. Desktop pages (Home, About, Work, Toolbox, Contact):
// zoom out so the whole page fits on the screen
// ----------------------------------------------------------
const desktopPages = document.querySelectorAll('.desktop, .toolbox');

desktopPages.forEach((page) => {
  new FitToScreen(page);
});


// ----------------------------------------------------------
// 6. Home page: pause button for the scrolling welcome line
// ----------------------------------------------------------
const marqueeToggle = document.querySelector('.marquee__toggle');

if (marqueeToggle) {
  marqueeToggle.addEventListener('click', () => {
    const marquee = marqueeToggle.closest('.marquee');
    const paused = marquee.classList.toggle('is-paused');
    marqueeToggle.setAttribute('aria-pressed', String(paused));
    marqueeToggle.setAttribute('aria-label', paused ? 'Resume scrolling announcement' : 'Pause scrolling announcement');
    marqueeToggle.textContent = paused ? 'Play' : 'Pause';
  });
}
