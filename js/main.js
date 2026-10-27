// ==========================================================
// main.js
// Runs on every page. It imports the classes from classes.js
// and uses them on the page that is open.
// ==========================================================

import { Project, DesktopIcon, ProjectFolder, ReadMore } from './classes.js';


// ----------------------------------------------------------
// 1. My projects (Project objects)
// To add a project: add one line here.
// ----------------------------------------------------------
const projects = [
  new Project('OVIO', 'ovio.html', 'ready'),
  new Project('Garn & Craft', 'garn-og-craft.html', 'ready'),
  new Project('GLS AI Playbook', 'gls-ai-playbook.html', 'ready'),
  new Project('Cyber security scenario', 'phishing-awareness.html', 'ready'),
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
// 5. Click on an empty part of the page: deselect the icon
// ----------------------------------------------------------
document.addEventListener('click', (event) => {
  const clickedAnIcon = event.target.closest('.desktop-icon');

  if (!clickedAnIcon && DesktopIcon.selected) {
    DesktopIcon.selected.deselect();
  }
});

// Allow users to pause the continuously running announcement.
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
