/**
 * Terra UI Kit: Modal
 *
 * @remarks
 * Wraps Bootstrap's Modal plugin. Vertically centred and body-scrollable by
 * default. Supports a Terra-specific **switchable pages** extension for
 * multi-step content - consumers embed `.modal-page` elements inside
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

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createH1 } from '@lnpg/sol/elements/heading/h1';
import { createA } from '@lnpg/sol/elements/inline/a';
import BsModal from 'bootstrap/js/dist/modal';

// Re-export Bootstrap Modal for consumers who need programmatic control.
export { BsModal };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Element type for a modal trigger.
 *
 * @remarks
 * `'button'`: renders as a `<button>` element (default).
 * `'anchor'`: renders as an `<a>` element.
 *
 * @category Attributes
 */
export type ModalTriggerVariant = 'button' | 'anchor';

/**
 * Size modifier for the modal dialog.
 *
 * @remarks
 * `'sm'`: small dialog (300px max-width).
 * `'lg'`: large dialog (800px max-width).
 * `'xl'`: extra-large dialog (1140px max-width).
 * `'fullscreen'`: covers the full viewport.
 *
 * @category Attributes
 */
export type ModalSize = 'sm' | 'lg' | 'xl' | 'fullscreen';

/**
 * Options for {@link createModalTrigger}.
 *
 * @category Interfaces
 */
export interface ModalTriggerOptions {
  /**
   * ID of the modal to open (without `#`).
   */
  target: string;

  /**
   * Visible label on the trigger.
   */
  label: string;

  /**
   * Element type. Defaults to `'button'`.
   */
  variant?: ModalTriggerVariant;
}

/**
 * Options for {@link createModal}.
 *
 * @category Interfaces
 */
export interface ModalOptions {
  /**
   * ID applied to the modal root element. Required for trigger wiring.
   */
  id: string;

  /**
   * ID of the element that labels the modal (for `aria-labelledby`).
   */
  labelledBy?: string;

  /**
   * Applies Bootstrap's fade transition. Defaults to `false` (instant open).
   * Set to `true` to match `data-lnpg-fade="true"` on HTML-authored modals.
   */
  fade?: boolean;
}

/**
 * Options for {@link createModalDialog}.
 *
 * @category Interfaces
 */
export interface ModalDialogOptions {
  /**
   * Vertically centres the dialog in the viewport. Defaults to `true`.
   */
  centered?: boolean;

  /**
   * Scrolls content inside the modal body. Defaults to `true`.
   */
  scrollable?: boolean;

  /**
   * Optional size modifier.
   */
  size?: ModalSize;
}

/**
 * Options for {@link createModalHeader}.
 *
 * @category Interfaces
 */
export interface ModalHeaderOptions {
  /**
   * Title text.
   */
  title: string;

  /**
   * ID applied to the title element (use with `labelledBy` on the modal).
   */
  titleId?: string;

  /**
   * Accessible label for the close button. Defaults to `'Close'`.
   */
  closeLabel?: string;
}

/**
 * Options for {@link createModalPage}.
 *
 * @category Interfaces
 */
export interface ModalPageOptions {
  /**
   * ID applied to this page element (used by `data-lnpg-modal-page`).
   */
  id: string;

  /**
   * Whether this page is the initially visible one. Defaults to `false`.
   */
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

  const parentModal = sourceContainer.closest<HTMLElement>(`.${modal.base}`);
  if (!parentModal) return;

  // Switch all .modal-pages containers in the modal to the same index.
  parentModal.querySelectorAll<HTMLElement>(`.${modal.pages}`).forEach((container) => {
    const pages = Array.from(container.querySelectorAll<HTMLElement>(`:scope > .${modal.page}`));
    pages.forEach((page, i) => page.classList.toggle('active', i === targetIndex));
  });

  // Update prev/next button visibility.
  _updatePageNav(parentModal, targetIndex, sourcePages.length);
}

/**
 * Updates the visibility of `[data-lnpg-modal-prev]` and
 * `[data-lnpg-modal-next]` buttons within a modal based on the current page.
 * @internal
 */
function _updatePageNav(parentModal: HTMLElement, currentIndex: number, total: number): void {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  parentModal.querySelectorAll<HTMLElement>('[data-lnpg-modal-prev]').forEach((btn) => {
    btn.classList.toggle('d-none', isFirst);
  });
  parentModal.querySelectorAll<HTMLElement>('[data-lnpg-modal-next]').forEach((btn) => {
    btn.classList.toggle('d-none', isLast);
  });
  // data-lnpg-modal-last: visible only on the final page (e.g. a Save button).
  parentModal.querySelectorAll<HTMLElement>('[data-lnpg-modal-last]').forEach((btn) => {
    btn.classList.toggle('d-none', !isLast);
    // Ensure that if it is visible, it dismisses the modal
    if (!btn.hasAttribute('data-bs-dismiss')) {
      btn.setAttribute('data-bs-dismiss', 'modal');
    }
  });
}

/**
 * Wires up all modals and their triggers in the document.
 *
 * - Translates `data-lnpg-target` on triggers to Bootstrap's
 *   `data-bs-toggle="modal"` / `data-bs-target`.
 * - Translates `data-lnpg-dismiss="modal"` to `data-bs-dismiss="modal"`.
 * - Applies the `.fade` class to modals with `data-lnpg-fade="true"`.
 * - Registers delegated click handlers for `data-lnpg-modal-page`,
 *   `data-lnpg-modal-prev`, and `data-lnpg-modal-next` toggles.
 * - Initialises `[data-lnpg-modal-prev]` / `[data-lnpg-modal-next]` button
 *   visibility based on the initially active page.
 *
 * Runs automatically on `DOMContentLoaded`. Call manually after dynamically
 * inserting modal elements into the DOM.
 *
 * @category Initialiser
 */
export function initModals(): void {
  // Wire triggers - only target elements that are modals (.modal class).
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

  // Initialise prev/next button visibility for any paged modals in the DOM.
  document.querySelectorAll<HTMLElement>(`.${modal.base}`).forEach((modalEl) => {
    const firstContainer = modalEl.querySelector<HTMLElement>(`.${modal.pages}`);
    if (!firstContainer) return;
    const pages = firstContainer.querySelectorAll<HTMLElement>(`:scope > .${modal.page}`);
    const activeIndex = Array.from(pages).findIndex((p) => p.classList.contains('active'));
    _updatePageNav(modalEl, activeIndex === -1 ? 0 : activeIndex, pages.length);
  });
}

// Delegated click handlers - listen on document so they work for dynamically
// inserted modals too.
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initModals();

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // data-lnpg-modal-page: jump to a named page.
      const pageToggle = target.closest<HTMLElement>('[data-lnpg-modal-page]');
      if (pageToggle) {
        const pageId = pageToggle.getAttribute('data-lnpg-modal-page');
        if (pageId) switchModalPage(pageId);
        return;
      }

      // data-lnpg-modal-prev: go to the previous page.
      const prevBtn = target.closest<HTMLElement>('[data-lnpg-modal-prev]');
      if (prevBtn) {
        const parentModal = prevBtn.closest<HTMLElement>(`.${modal.base}`);
        if (!parentModal) return;
        const container = parentModal.querySelector<HTMLElement>(`.${modal.pages}`);
        if (!container) return;
        const pages = Array.from(
          container.querySelectorAll<HTMLElement>(`:scope > .${modal.page}`),
        );
        const activeIndex = pages.findIndex((p) => p.classList.contains('active'));
        if (activeIndex > 0) {
          const prevPage = pages[activeIndex - 1];
          if (prevPage.id) switchModalPage(prevPage.id);
        }
        return;
      }

      // data-lnpg-modal-next: go to the next page.
      const nextBtn = target.closest<HTMLElement>('[data-lnpg-modal-next]');
      if (nextBtn) {
        const parentModal = nextBtn.closest<HTMLElement>(`.${modal.base}`);
        if (!parentModal) return;
        const container = parentModal.querySelector<HTMLElement>(`.${modal.pages}`);
        if (!container) return;
        const pages = Array.from(
          container.querySelectorAll<HTMLElement>(`:scope > .${modal.page}`),
        );
        const activeIndex = pages.findIndex((p) => p.classList.contains('active'));
        if (activeIndex < pages.length - 1) {
          const nextPage = pages[activeIndex + 1];
          if (nextPage.id) switchModalPage(nextPage.id);
        }
      }
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
    const el = createA(label, {
      href: `#${target}`,
      dataset: { bsToggle: 'modal', bsTarget: `#${target}` },
    });
    return el;
  }

  const el = createButton(label, {
    type: 'button',
    dataset: { bsToggle: 'modal', bsTarget: `#${target}` },
  });
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

  const el = createDiv(undefined, {
    id,
    className: fade ? `${modal.base} fade` : modal.base,
    tabIndex: -1,
    aria: labelledBy ? { labelledby: labelledBy } : undefined,
  });

  return el;
}

/**
 * Creates the modal dialog layout container.
 *
 * @param options - Configuration for the dialog.
 * @returns A configured `HTMLElement` (`<div class="modal-dialog ...">`).
 * @category Factory
 */
export function createModalDialog(options: ModalDialogOptions = {}): HTMLElement {
  const { centered = true, scrollable = true, size } = options;

  const classes: string[] = [modal.dialog];
  if (centered) classes.push(modal.centered);
  if (scrollable) classes.push(modal.scrollable);
  if (size) classes.push(modal.sizes[size]);

  const el = createDiv(undefined, { className: classes.join(' ') });
  return el;
}

/**
 * Creates the modal content visual wrapper.
 *
 * @returns A `HTMLElement` (`<div class="modal-content">`).
 * @category Factory
 */
export function createModalContent(): HTMLElement {
  const el = createDiv(undefined, { className: modal.content });
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

  const header = createDiv(undefined, { className: modal.header });

  const titleEl = createH1(title, { className: modal.title, id: titleId });

  const closeBtn = createButton(undefined, {
    type: 'button',
    className: 'btn-close',
    aria: { label: closeLabel },
    dataset: { bsDismiss: 'modal' },
  });

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  return header;
}

/**
 * Creates the modal body - the main scrollable content region.
 *
 * @returns A `HTMLElement` (`<div class="modal-body">`).
 * @category Factory
 */
export function createModalBody(): HTMLElement {
  const el = createDiv(undefined, { className: modal.body });
  return el;
}

/**
 * Creates the modal footer - an optional action region at the bottom.
 *
 * @returns A `HTMLElement` (`<div class="modal-footer">`).
 * @category Factory
 */
export function createModalFooter(): HTMLElement {
  const el = createDiv(undefined, { className: modal.footer });
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
  const el = createDiv(undefined, { className: modal.pages });
  return el;
}

/**
 * Creates a single modal page - one step in a multi-step modal.
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

  const el = createDiv(undefined, {
    id,
    className: active ? `${modal.page} active` : modal.page,
  });
  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Data attribute names used by the modal page navigation system.
 *
 * @category Constants
 */
export const modalPageAttrs = {
  /**
   * Attribute on a button that jumps to a named page by ID.
   */
  page: 'data-lnpg-modal-page',

  /**
   * Attribute on a button that navigates to the previous page. Hidden on page 1.
   */
  prev: 'data-lnpg-modal-prev',

  /**
   * Attribute on a button that navigates to the next page. Hidden on the last page.
   */
  next: 'data-lnpg-modal-next',

  /**
   * Attribute on a button that is only visible on the last page (e.g. Save).
   */
  last: 'data-lnpg-modal-last',
} as const;

/**
 * CSS class and selector references for the Modal component.
 *
 * @category Constants
 */
export const modal = {
  /**
   * Root modal element class.
   */
  base: 'modal',

  /**
   * Dialog layout container class.
   */
  dialog: 'modal-dialog',

  /**
   * Vertical centering modifier.
   */
  centered: 'modal-dialog-centered',

  /**
   * Body-scrollable modifier.
   */
  scrollable: 'modal-dialog-scrollable',

  /**
   * Visual content wrapper class.
   */
  content: 'modal-content',

  /**
   * Header sub-component class.
   */
  header: 'modal-header',

  /**
   * Title element class.
   */
  title: 'modal-title',

  /**
   * Body sub-component class.
   */
  body: 'modal-body',

  /**
   * Footer sub-component class.
   */
  footer: 'modal-footer',

  /**
   * Pages container class (Terra extension).
   */
  pages: 'modal-pages',

  /**
   * Single page class (Terra extension).
   */
  page: 'modal-page',

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * Small dialog (300px max-width).
     */
    sm: 'modal-sm',

    /**
     * Large dialog (800px max-width).
     */
    lg: 'modal-lg',

    /**
     * Extra-large dialog (1140px max-width).
     */
    xl: 'modal-xl',

    /**
     * Full viewport.
     */
    fullscreen: 'modal-fullscreen',
  },
} as const;
