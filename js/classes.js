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

  constructor(title, page, status, preview, tag) {
    this.title = title; // e.g. "OVIO"
    this.page = page; // e.g. "ovio.html"
    this.#status = status; // "ready" or "coming soon"
    this.preview = preview; // small picture that peeks out of the folder
    this.tag = tag; // e.g. "Branding + web"
  }

  // A getter: used like a property, e.g. project.isReady
  get isReady() {
    return this.#status === 'ready';
  }
}


// ----------------------------------------------------------
// DesktopIcon
// An icon that works like on a Windows desktop:
//  - hover or keyboard focus = the icon is selected (blue label)
//  - click = open it. It is a normal link, so Cmd/Ctrl-click
//    and middle-click still open it in a new tab.
// ----------------------------------------------------------
export class DesktopIcon {
  // "static" = shared by all icons. Only one icon can be selected.
  static selected = null;

  constructor(element) {
    this.element = element; // the <a> tag of the icon

    this.element.addEventListener('pointerenter', () => this.select());
    this.element.addEventListener('pointerleave', () => this.deselect());
    this.element.addEventListener('focus', () => this.select());
    this.element.addEventListener('blur', () => this.deselect());
    this.element.addEventListener('click', (event) => this.handleClick(event));
  }

  // A normal icon has nothing extra to do: the link opens the page.
  // Child classes can override this (see ProjectFolder).
  handleClick(event) {}

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
    if (DesktopIcon.selected === this) {
      DesktopIcon.selected = null;
    }
  }
}


// ----------------------------------------------------------
// ProjectFolder
// A folder on the Work page.
//  - Inheritance: it "extends" DesktopIcon, so it gets hover/focus for free.
//  - Composition: it "has" a Project object.
// ----------------------------------------------------------
export class ProjectFolder extends DesktopIcon {
  constructor(project) {
    const link = ProjectFolder.createLink(project);
    super(link); // runs the constructor of DesktopIcon
    this.project = project;
  }

  // Builds the HTML for one folder, with a preview peeking out
  static createLink(project) {
    const link = document.createElement('a');
    link.className = 'desktop-icon';
    link.href = project.page;

    let soonText = '';
    if (!project.isReady) {
      soonText = '<span class="folder-list__soon">(coming soon)</span>';
    }

    link.innerHTML = `
      <span class="folder-icon">
        <img class="folder-icon__preview" src="${project.preview}" alt="" width="320" height="240">
        <img class="desktop-icon__image" src="assets/icons/desktop/folder.png" alt="" width="192" height="192">
      </span>
      <span class="desktop-icon__label">
        ${project.title} ${soonText}
        <span class="folder-list__tag">${project.tag} · Solo project</span>
      </span>
    `;
    return link;
  }

  // Overrides handleClick() from DesktopIcon (polymorphism):
  // a project that isn't ready shows a Windows-style message instead.
  handleClick(event) {
    if (!this.project.isReady) {
      event.preventDefault();
      showMessage('Coming soon', `The case study for ${this.project.title} is coming soon!`);
    }
  }
}


// ----------------------------------------------------------
// showMessage
// A small Windows 98 message box (a native <dialog>, so Esc
// closes it and keyboard focus stays inside it).
// ----------------------------------------------------------
export function showMessage(title, text) {
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog-98';
  dialog.innerHTML = `
    <div class="window__titlebar"><span class="window__title">${title}</span></div>
    <div class="window__body">
      <p>${text}</p>
      <form method="dialog"><button class="btn-98 btn-98--small">OK</button></form>
    </div>
  `;
  document.body.append(dialog);
  dialog.addEventListener('close', () => dialog.remove());
  dialog.showModal();
}


// ----------------------------------------------------------
// ReadMore
// "Do you want to read more about this case study?  Yes / No"
// The rest of the case is always visible (recruiters want to see
// the process). "Yes" scrolls down to it, "No" goes back to Work.
// ----------------------------------------------------------
export class ReadMore {
  constructor(button, section) {
    this.button = button;
    this.section = section;

    this.button.addEventListener('click', () => this.open());
  }

  open() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

    // Move focus to the section, so keyboard and
    // screen reader users continue reading there
    this.section.querySelector('h2').focus({ preventScroll: true });
  }
}
