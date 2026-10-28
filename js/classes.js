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
    return this.#status === "ready";
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

    this.element.addEventListener("pointerenter", () => this.select());
    this.element.addEventListener("pointerleave", () => this.deselect());
    this.element.addEventListener("focus", () => this.select());
    this.element.addEventListener("blur", () => this.deselect());
    this.element.addEventListener("click", (event) => this.handleClick(event));
  }

  // A normal icon has nothing extra to do: the link opens the page.
  // Child classes can override this (see ProjectFolder).
  handleClick(event) {}

  select() {
    // Deselect the icon that was selected before
    if (DesktopIcon.selected) {
      DesktopIcon.selected.deselect();
    }
    this.element.classList.add("is-selected");
    DesktopIcon.selected = this;
  }

  deselect() {
    this.element.classList.remove("is-selected");
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

  // Builds the HTML for one folder with a preview inside it:
  // folder (back) + preview + the folder's front flap on top
  static createLink(project) {
    const link = document.createElement("a");
    link.className = "desktop-icon";
    link.href = project.page;

    let soonText = "";
    if (!project.isReady) {
      soonText = '<span class="folder-list__soon">(coming soon)</span>';
    }

    link.innerHTML = `
      <span class="folder-icon">
        <img class="desktop-icon__image" src="assets/icons/desktop/folder.png" alt="" width="192" height="192">
        <img class="folder-icon__preview" src="${project.preview}" alt="" width="320" height="240">
        <img class="folder-icon__front" src="assets/icons/desktop/folder.png" alt="" width="192" height="192">
      </span>
      <span class="desktop-icon__label">
        ${project.title} ${soonText}
        <span class="folder-list__tag">${project.tag}</span>
      </span>
    `;
    return link;
  }

  // Overrides handleClick() from DesktopIcon (polymorphism):
  // a project that isn't ready shows a Windows-style message instead.
  handleClick(event) {
    if (!this.project.isReady) {
      event.preventDefault();
      showMessage(
        "Coming soon",
        `The case study for ${this.project.title} is coming soon!`,
      );
    }
  }
}

// ----------------------------------------------------------
// FitToScreen
// Zooms a desktop page out so it fits on the screen without
// scrolling (only on computer screens, 1024px and wider).
// It never zooms in, and never below minScale, so text stays readable.
// ----------------------------------------------------------
export class FitToScreen {
  #element; // private: only this class changes the element's size

  constructor(element, minScale = 0.65) {
    this.#element = element;
    this.minScale = minScale;

    // Wait for the fonts (text can change the height), then fit the
    // page and show it. The CSS keeps it invisible until "is-fitted".
    document.fonts.ready.then(() => {
      this.fit();
      this.#element.classList.add("is-fitted");
    });
    window.addEventListener("resize", () => this.fit());
  }

  fit() {
    const element = this.#element;

    // Start from the normal size
    element.style.transform = "";
    element.style.marginBottom = "";

    if (!window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    // Room between the header and the footer
    const header = document.querySelector(".site-header").offsetHeight;
    const footer = document.querySelector(".site-footer").offsetHeight;
    const room = window.innerHeight - header - footer;

    const height = element.offsetHeight;
    const scale = Math.max(this.minScale, Math.min(1, room / height));

    if (scale < 1) {
      element.style.transformOrigin = "top center";
      element.style.transform = `scale(${scale})`;
      // A transform doesn't change the space the element takes up,
      // so pull the footer up by the height that was removed
      element.style.marginBottom = `${height * (scale - 1)}px`;
    }
  }
}

// ----------------------------------------------------------
// showMessage
// A small Windows 98 message box (a native <dialog>, so Esc
// closes it and keyboard focus stays inside it).
// ----------------------------------------------------------
export function showMessage(title, text) {
  const dialog = document.createElement("dialog");
  dialog.className = "dialog-98";
  dialog.innerHTML = `
    <div class="window__titlebar"><span class="window__title">${title}</span></div>
    <div class="window__body">
      <p>${text}</p>
      <form method="dialog"><button class="btn-98 btn-98--small">OK</button></form>
    </div>
  `;
  document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove());
  dialog.showModal();
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
    this.button.setAttribute("aria-expanded", "false");

    this.button.addEventListener("click", () => this.open());
  }

  open() {
    this.section.hidden = false;
    this.button.setAttribute("aria-expanded", "true");

    // Move focus to the new section, so keyboard and
    // screen reader users continue reading there
    this.section.querySelector("h2").focus();
  }
}
