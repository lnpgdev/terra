/**
 * Terra UI Kit: Modal
 *
 * @remarks
 * Wraps Bootstrap's Modal plugin. Vertically centred and body-scrollable by
 * default. Supports a Terra-specific **switchable pages** extension for
 * multi-step content — consumers embed `.modal-page` elements inside
 * `.modal-pages` and use `data-lnpg-modal-page` buttons to navigate between
 * them without closing the modal.
 *
 * Triggers use `data-lnpg-target` (the modal ID). Close buttons and footer
 * actions use `data-lnpg-dismiss="modal"`. {@link initModals} translates
 * both to Bootstrap attributes on `DOMContentLoaded`.
 *
 * Usage (HTML-authored, switchable):
 * ```html
 * <button type="button" class="btn btn-primary" data-lnpg-target="userModal">
 *   Open
 * </button>
 *
 * <div class="modal" id="userModal" tabindex="-1" aria-labelledby="userModalTitle">
 *   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
 *     <div class="modal-content">
 *       <div class="modal-header">
 *         <h1 class="modal-title fs-5" id="userModalTitle">User</h1>
 *         <button type="button" class="btn-close" data-lnpg-dismiss="modal" aria-label="Close"></button>
 *       </div>
 *       <div class="modal-body">
 *         <div class="modal-pages">
 *           <div class="modal-page active" id="page1">
 *             <p>Details</p>
 *             <button type="button" data-lnpg-modal-page="page2">Next</button>
 *           </div>
 *           <div class="modal-page" id="page2">
 *             <p>Permissions</p>
 *             <button type="button" data-lnpg-modal-page="page1">Back</button>
 *           </div>
 *         </div>
 *       </div>
 *       <div class="modal-footer">
 *         <button type="button" class="btn btn-secondary" data-lnpg-dismiss="modal">Close</button>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/modal/
 *
 * @module
 * @category Components
 */

import BsModal from 'bootstrap/js/dist/modal';

// Re-export Bootstrap Modal for consumers who need programmatic control.
export { BsModal };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Element type for a modal trigger. */
export type ModalTriggerVariant = 'button' | 'anchor';

/** Size modifier for the modal dialog. */
export type ModalSize = 'sm' | 'lg' | 'xl' | 'fullscreen';

/** Options for {@link createModalTrigger}. */
export interface ModalTriggerOptions {
  /** ID of the modal to open (without `#`). */
  target: string;
  /** Visible label on the trigger. */
  label: string;
  /** Element type. Defaults to `'button'`. */
  variant?: ModalTriggerVariant;
}

/** Options for {@link createModal}. */
export interface ModalOptions {
  /** ID applied to the modal root element. Required for trigger wiring. */
  id: string;
  /** ID of the element that labels the modal (for `aria-labelledby`). */
  labelledBy?: string;
  /**
   * Applies Bootstrap's fade transition. Defaults to `false` (instant open).
   * Set to `true` to match `data-lnpg-fade="true"` on HTML-authored modals.
   */
  fade?: boolean;
}

/** Options for {@link createModalDialog}. */
export interface ModalDialogOptions {
  /** Vertically centres the dialog in the viewport. Defaults to `true`. */
  centered?: boolean;
  /** Scrolls content inside the modal body. Defaults to `true`. */
  scrollable?: boolean;
  /** Optional size modifier. */
  size?: ModalSize;
}

/** Options for {@link createModalHeader}. */
export interface ModalHeaderOptions {
  /** Title text. */
  title: string;
  /** ID applied to the title element (use with `labelledBy` on the modal). */
  titleId?: string;
  /** Accessible label for the close button. Defaults to `'Close'`. */
  closeLabel?: string;
}

/** Options for {@link createModalPage}. */
export interface ModalPageOptions {
  /** ID applied to this page element (used by `data-lnpg-modal-page`). */
  id: string;
  /** Whether this page is the initially visible one. Defaults to `false`. */
  active?: boolean;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Switches to a specific modal page by ID, hiding all sibling pages.
 *
 * Called automatically by the `data-lnpg-modal-page` click handler. Can also
 * be called programmatically.
 *
 * @param targetPageId - The ID of the page to show.
 * @category Initialiser
 */
export function switchModalPage(targetPageId: string): void {
  const targetPage = document.getElementById(targetPageId);
  if (!targetPage) return;

  const sourceContainer = targetPage.closest<HTMLElement>(`.${modal.pages}`);
  if (!sourceContainer) return;

  // Determine the target page's index within its container.
  const sourcePages = Array.from(
    sourceContainer.querySelectorAll<HTMLElement>(`:scope > .${modal.page}`),
  );
  const targetIndex = sourcePages.indexOf(targetPage);
  if (targetIndex === -1) return;

  // Sync ALL .modal-pages containers within the same modal to the same index.
  // This keeps body pages and footer pages in lockstep without extra attributes.
  const parentModal = sourceContainer.closest<HTMLElement>(`.${modal.base}`);
  if (!parentModal) return;

  parentModal.querySelectorAll<HTMLElement>(`.${modal.pages}`).forEach((container) => {
    const pages = Array.from(container.querySelectorAll<HTMLElement>(`:scope > .${modal.page}`));
    pages.forEach((page, i) => page.classList.toggle('active', i === targetIndex));
  });
}

/**
 * Wires up all modals and their triggers in the document.
 *
 * - Translates `data-lnpg-target` on triggers to Bootstrap's
 *   `data-bs-toggle="modal"` / `data-bs-target`.
 * - Translates `data-lnpg-dismiss="modal"` to `data-bs-dismiss="modal"`.
 * - Applies the `.fade` class to modals with `data-lnpg-fade="true"`.
 * - Registers a delegated click handler for `data-lnpg-modal-page` toggles.
 *
 * Runs automatically on `DOMContentLoaded`. Call manually after dynamically
 * inserting modal elements into the DOM.
 *
 * @category Initialiser
 */
export function initModals(): void {
  // Wire triggers — only target elements that are modals (.modal class).
  document.querySelectorAll<HTMLElement>('[data-lnpg-target]').forEach((trigger) => {
    const target = trigger.getAttribute('data-lnpg-target');
    if (!target) return;

    const panel = document.getElementById(target);
    if (!panel || !panel.classList.contains(modal.base)) return;

    trigger.setAttribute('data-bs-toggle', 'modal');
    trigger.setAttribute('data-bs-target', `#${target}`);

    // Apply fade if requested.
    const fade = panel.getAttribute('data-lnpg-fade');
    if (fade === 'true') panel.classList.add('fade');

    BsModal.getOrCreateInstance(panel);
  });

  // Translate dismiss attributes.
  document
    .querySelectorAll<HTMLElement>('[data-lnpg-dismiss="modal"]')
    .forEach((el) => el.setAttribute('data-bs-dismiss', 'modal'));
}

// Delegated click handler for modal page toggles — works for dynamically
// inserted modals too, since it listens on the document.
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initModals();

    document.addEventListener('click', (e) => {
      const toggle = (e.target as HTMLElement).closest<HTMLElement>('[data-lnpg-modal-page]');
      if (!toggle) return;
      const pageId = toggle.getAttribute('data-lnpg-modal-page');
      if (pageId) switchModalPage(pageId);
    });
  });
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a modal trigger element (button or anchor).
 *
 * @param options - Configuration for the trigger.
 * @returns An `HTMLButtonElement` or `HTMLAnchorElement`.
 * @category Factory
 */
export function createModalTrigger(
  options: ModalTriggerOptions,
): HTMLButtonElement | HTMLAnchorElement {
  const { target, label, variant = 'button' } = options;

  if (variant === 'anchor') {
    const el = document.createElement('a');
    el.href = `#${target}`;
    el.setAttribute('data-bs-toggle', 'modal');
    el.setAttribute('data-bs-target', `#${target}`);
    el.textContent = label;
    return el;
  }

  const el = document.createElement('button');
  el.type = 'button';
  el.setAttribute('data-bs-toggle', 'modal');
  el.setAttribute('data-bs-target', `#${target}`);
  el.textContent = label;
  return el;
}

/**
 * Creates the modal root element.
 *
 * Append a {@link createModalDialog} as a child, then append to `document.body`.
 *
 * @param options - Configuration for the modal root.
 * @returns A configured `HTMLElement` (`<div class="modal">`).
 * @category Factory
 */
export function createModal(options: ModalOptions): HTMLElement {
  const { id, labelledBy, fade = false } = options;

  const el = document.createElement('div');
  el.id = id;
  el.className = fade ? `${modal.base} fade` : modal.base;
  el.tabIndex = -1;
  if (labelledBy) el.setAttribute('aria-labelledby', labelledBy);

  return el;
}

/**
 * Creates the modal dialog layout container.
 *
 * @param options - Configuration for the dialog.
 * @returns A configured `HTMLElement` (`<div class="modal-dialog …">`).
 * @category Factory
 */
export function createModalDialog(options: ModalDialogOptions = {}): HTMLElement {
  const { centered = true, scrollable = true, size } = options;

  const classes: string[] = [modal.dialog];
  if (centered) classes.push(modal.centered);
  if (scrollable) classes.push(modal.scrollable);
  if (size) classes.push(modal.sizes[size]);

  const el = document.createElement('div');
  el.className = classes.join(' ');
  return el;
}

/**
 * Creates the modal content visual wrapper.
 *
 * @returns A `HTMLElement` (`<div class="modal-content">`).
 * @category Factory
 */
export function createModalContent(): HTMLElement {
  const el = document.createElement('div');
  el.className = modal.content;
  return el;
}

/**
 * Creates a modal header with a title and a close button.
 *
 * @param options - Configuration for the header.
 * @returns A `HTMLElement` (`<div class="modal-header">`).
 * @category Factory
 */
export function createModalHeader(options: ModalHeaderOptions): HTMLElement {
  const { title, titleId, closeLabel = 'Close' } = options;

  const header = document.createElement('div');
  header.className = modal.header;

  const titleEl = document.createElement('h1');
  titleEl.className = modal.title;
  if (titleId) titleEl.id = titleId;
  titleEl.textContent = title;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('data-bs-dismiss', 'modal');
  closeBtn.setAttribute('aria-label', closeLabel);

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  return header;
}

/**
 * Creates the modal body — the main scrollable content region.
 *
 * @returns A `HTMLElement` (`<div class="modal-body">`).
 * @category Factory
 */
export function createModalBody(): HTMLElement {
  const el = document.createElement('div');
  el.className = modal.body;
  return el;
}

/**
 * Creates the modal footer — an optional action region at the bottom.
 *
 * @returns A `HTMLElement` (`<div class="modal-footer">`).
 * @category Factory
 */
export function createModalFooter(): HTMLElement {
  const el = document.createElement('div');
  el.className = modal.footer;
  return el;
}

/**
 * Creates a modal pages container for switchable multi-step content.
 *
 * Append {@link createModalPage} elements as children.
 *
 * @returns A `HTMLElement` (`<div class="modal-pages">`).
 * @category Factory
 */
export function createModalPages(): HTMLElement {
  const el = document.createElement('div');
  el.className = modal.pages;
  return el;
}

/**
 * Creates a single modal page — one step in a multi-step modal.
 *
 * Only the page with `active: true` is visible at a time. Use
 * `data-lnpg-modal-page` buttons (or {@link switchModalPage}) to navigate.
 *
 * @param options - Configuration for the page.
 * @returns A `HTMLElement` (`<div class="modal-page">`).
 * @category Factory
 */
export function createModalPage(options: ModalPageOptions): HTMLElement {
  const { id, active = false } = options;

  const el = document.createElement('div');
  el.id = id;
  el.className = active ? `${modal.page} active` : modal.page;
  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class and selector references for the Modal component. @category Constants */
export const modal = {
  /** Root modal element class. */
  base: 'modal',
  /** Dialog layout container class. */
  dialog: 'modal-dialog',
  /** Vertical centering modifier. */
  centered: 'modal-dialog-centered',
  /** Body-scrollable modifier. */
  scrollable: 'modal-dialog-scrollable',
  /** Visual content wrapper class. */
  content: 'modal-content',
  /** Header sub-component class. */
  header: 'modal-header',
  /** Title element class. */
  title: 'modal-title',
  /** Body sub-component class. */
  body: 'modal-body',
  /** Footer sub-component class. */
  footer: 'modal-footer',
  /** Pages container class (Terra extension). */
  pages: 'modal-pages',
  /** Single page class (Terra extension). */
  page: 'modal-page',
  /** Size modifier classes. */
  sizes: {
    sm: 'modal-sm',
    lg: 'modal-lg',
    xl: 'modal-xl',
    fullscreen: 'modal-fullscreen',
  },
} as const;
