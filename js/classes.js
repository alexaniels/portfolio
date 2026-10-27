// ==========================================================
// classes.js
// All the classes for my portfolio.
// Every class is exported, so main.js can import it.
// ==========================================================


// ----------------------------------------------------------
// Project
// One of my projects (an object from my OOUX object map).
// ----------------------------------------------------------
export class Project {
  // Private field (encapsulation): the status can only be read or
  // changed inside this class. Outside code uses "isReady" instead.
  #status;

  constructor(title, page, status) {
    this.title = title; // e.g. "OVIO"
    this.page = page; // e.g. "ovio.html"
    this.#status = status; // "ready" or "coming soon"
  }

  // A getter: used like a property, e.g. project.isReady
  get isReady() {
    return this.#status === 'ready';
  }
}


// ----------------------------------------------------------
// DesktopIcon
// An icon that works like on a Windows desktop:
//  - click once = select the icon
//  - double-click = open it
//  - keyboard (Enter) or touch screen = open straight away
// ----------------------------------------------------------
export class DesktopIcon {
  // "static" = shared by all icons. Only one icon can be selected.
  static selected = null;

  constructor(element) {
    this.element = element; // the <a> tag of the icon

    this.element.addEventListener('click', (event) => this.handleClick(event));
    this.element.addEventListener('dblclick', () => this.open());
  }

  handleClick(event) {
    // Stop the link from opening on a single click
    event.preventDefault();

    const usedKeyboard = event.detail === 0; // pressing Enter gives detail 0
    const isTouchScreen = window.matchMedia('(hover: none)').matches;

    if (usedKeyboard || isTouchScreen) {
      this.open();
    } else {
      this.select();
    }
  }

  select() {
    // Deselect the icon that was selected before
    if (DesktopIcon.selected) {
      DesktopIcon.selected.deselect();
    }
    this.element.classList.add('is-selected');
    DesktopIcon.selected = this;
  }

  deselect() {
    this.element.classList.remove('is-selected');
    DesktopIcon.selected = null;
  }

  open() {
    // Go to the page the link points to
    window.location.href = this.element.href;
  }
}


// ----------------------------------------------------------
// ProjectFolder
// A folder on the Work page.
//  - Inheritance: it "extends" DesktopIcon, so it gets click/double-click for free.
//  - Composition: it "has" a Project object.
// ----------------------------------------------------------
export class ProjectFolder extends DesktopIcon {
  constructor(project) {
    const link = ProjectFolder.createLink(project);
    super(link); // runs the constructor of DesktopIcon
    this.project = project;
  }

  // Builds the HTML for one folder
  static createLink(project) {
    const link = document.createElement('a');
    link.className = 'desktop-icon';
    link.href = project.isReady ? project.page : 'work.html';

    let soonText = '';
    if (!project.isReady) {
      soonText = '<span class="folder-list__soon">(coming soon)</span>';
    }

    link.innerHTML = `
      <img class="desktop-icon__image" src="assets/icons/desktop/folder.png" alt="" width="192" height="192">
      <span class="desktop-icon__label">${project.title} ${soonText}</span>
    `;
    return link;
  }

  // Overrides open() from DesktopIcon (polymorphism)
  open() {
    if (this.project.isReady) {
      super.open(); // use the normal open() from DesktopIcon
    } else {
      alert(`The case study for ${this.project.title} is coming soon!`);
    }
  }
}


// ----------------------------------------------------------
// ReadMore
// "Do you want to read more about this case study?  Yes / No"
// Hides the rest of the case study until you click "Yes".
// ----------------------------------------------------------
export class ReadMore {
  constructor(button, section) {
    this.button = button;
    this.section = section;

    // Hide the section (with JS, so it is still visible if JS doesn't load)
    this.section.hidden = true;
    this.button.setAttribute('aria-expanded', 'false');

    this.button.addEventListener('click', () => this.open());
  }

  open() {
    this.section.hidden = false;
    this.button.setAttribute('aria-expanded', 'true');

    // Move focus to the new section, so keyboard and
    // screen reader users continue reading there
    this.section.querySelector('h2').focus();
  }
}
