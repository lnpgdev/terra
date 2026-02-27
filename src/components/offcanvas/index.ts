/**
 * Terra UI Kit: Offcanvas
 *
 * @remarks
 * Wraps Bootstrap's Offcanvas plugin. A panel that slides in from any edge of
 * the screen, used for navigation drawers, filter panels, or secondary content.
 *
 * Triggers are wired via `data-lnpg-target` (the offcanvas panel ID). The
 * panel itself is identified by `data-lnpg-placement` for the init path, or
 * built entirely with the factory functions for the programmatic path.
 *
 * Usage (HTML-authored):
 * ```html
 * <button type="button" class="btn btn-primary" data-lnpg-target="myPanel">
 *   Open Panel
 * </button>
 *
 * <div id="myPanel" data-lnpg-placement="end">
 *   <div class="offcanvas-header">
 *     <h5 class="offcanvas-title" id="myPanelTitle">Panel Title</h5>
 *     <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
 *   </div>
 *   <div class="offcanvas-body">Content here.</div>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/offcanvas/
 *
 * @module
 * @category Components
 */

import BsOffcanvas from 'bootstrap/js/dist/offcanvas';

// Re-export Bootstrap Offcanvas for consumers who need programmatic control.
export { BsOffcanvas };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Which edge the offcanvas panel slides in from. */
export type OffcanvasPlacement = 'start' | 'end' | 'top' | 'bottom';

/** Element type used to trigger an offcanvas panel. */
export type OffcanvasTriggerVariant = 'button' | 'anchor';

/** Options for {@link createOffcanvasTrigger}. */
export interface OffcanvasTriggerOptions {
  /** ID of the offcanvas panel to open (without the `#` prefix). */
  target: string;
  /** Visible label on the trigger element. */
  label: string;
  /** Element type. Defaults to `'button'`. */
  variant?: OffcanvasTriggerVariant;
}

/** Options for {@link createOffcanvas}. */
export interface OffcanvasOptions {
  /** ID applied to the offcanvas panel element. Required for trigger wiring. */
  id: string;
  /** Which edge the panel slides in from. Defaults to `'start'`. */
  placement?: OffcanvasPlacement;
  /**
   * Whether a backdrop is rendered behind the panel.
   * Pass `'static'` to prevent closing on backdrop click. Defaults to `true`.
   */
  backdrop?: boolean | 'static';
  /** Whether page scrolling is allowed while the panel is open. Defaults to `false`. */
  scroll?: boolean;
  /** ID of the element that labels the panel (for `aria-labelledby`). */
  labelledBy?: string;
}

/** Options for {@link createOffcanvasHeader}. */
export interface OffcanvasHeaderOptions {
  /** Title text displayed in the panel header. */
  title: string;
  /** ID applied to the title element (use with `labelledBy` on the panel). */
  titleId?: string;
  /** Accessible label for the close button. Defaults to `'Close'`. */
  closeLabel?: string;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Initialises Bootstrap Offcanvas on all panels targeted by a
 * `[data-lnpg-target]` trigger in the document.
 *
 * For each trigger found, this function:
 * - Sets the Bootstrap `data-bs-toggle` and `data-bs-target` attributes.
 * - Reads `data-lnpg-placement` from the panel and applies the correct
 *   Bootstrap placement class (`offcanvas-start`, `offcanvas-end`, etc.).
 * - Creates a `BsOffcanvas` instance respecting `data-lnpg-backdrop` and
 *   `data-lnpg-scroll` on the panel element.
 *
 * Runs automatically on `DOMContentLoaded`. Call manually after dynamically
 * inserting offcanvas-enabled elements into the DOM.
 *
 * @category Initialiser
 */
export function initOffcanvases(): void {
  document.querySelectorAll<HTMLElement>(offcanvas.selector).forEach((trigger) => {
    const target = trigger.getAttribute('data-lnpg-target');
    if (!target) return;

    // Wire the trigger to Bootstrap.
    trigger.setAttribute('data-bs-toggle', 'offcanvas');
    trigger.setAttribute('data-bs-target', `#${target}`);
    trigger.setAttribute('aria-controls', target);

    // Find and configure the panel.
    // Guard: only process panels explicitly marked with data-lnpg-placement so
    // this init does not interfere with other components (e.g. Modal) that also
    // use data-lnpg-target.
    const panel = document.getElementById(target);
    if (!panel || !panel.hasAttribute('data-lnpg-placement')) return;

    const placement = (panel.getAttribute('data-lnpg-placement') ?? 'start') as OffcanvasPlacement;
    panel.classList.add(offcanvas.base, offcanvas.placements[placement]);
    panel.tabIndex = -1;

    const backdropAttr = panel.getAttribute('data-lnpg-backdrop');
    const scrollAttr = panel.getAttribute('data-lnpg-scroll');

    const backdrop: boolean | 'static' =
      backdropAttr === 'static' ? 'static' : backdropAttr !== 'false';

    BsOffcanvas.getOrCreateInstance(panel, {
      backdrop,
      scroll: scrollAttr === 'true',
    });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initOffcanvases());
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates an offcanvas trigger element (button or anchor).
 *
 * @param options - Configuration for the trigger.
 * @returns An `HTMLButtonElement` or `HTMLAnchorElement`.
 * @category Factory
 *
 * @example
 * ```ts
 * const trigger = createOffcanvasTrigger({ target: 'myPanel', label: 'Open' });
 * document.body.appendChild(trigger);
 * ```
 */
export function createOffcanvasTrigger(
  options: OffcanvasTriggerOptions,
): HTMLButtonElement | HTMLAnchorElement {
  const { target, label, variant = 'button' } = options;

  if (variant === 'anchor') {
    const el = document.createElement('a');
    el.href = `#${target}`;
    el.setAttribute('data-bs-toggle', offcanvas.toggle);
    el.setAttribute('data-bs-target', `#${target}`);
    el.setAttribute('aria-controls', target);
    el.textContent = label;
    return el;
  }

  const el = document.createElement('button');
  el.type = 'button';
  el.setAttribute('data-bs-toggle', offcanvas.toggle);
  el.setAttribute('data-bs-target', `#${target}`);
  el.setAttribute('aria-controls', target);
  el.textContent = label;
  return el;
}

/**
 * Creates an offcanvas panel container.
 *
 * Append {@link createOffcanvasHeader}, {@link createOffcanvasBody}, and
 * optionally {@link createOffcanvasFooter} as children.
 *
 * @param options - Configuration for the panel.
 * @returns A configured offcanvas container `HTMLElement`.
 * @category Factory
 *
 * @example
 * ```ts
 * const panel = createOffcanvas({ id: 'myPanel', placement: 'end' });
 * panel.appendChild(createOffcanvasHeader({ title: 'My Panel', titleId: 'myPanelTitle' }));
 * panel.appendChild(createOffcanvasBody());
 * document.body.appendChild(panel);
 * ```
 */
export function createOffcanvas(options: OffcanvasOptions): HTMLElement {
  const { id, placement = 'start', backdrop = true, scroll = false, labelledBy } = options;

  const el = document.createElement('div');
  el.id = id;
  el.className = `${offcanvas.base} ${offcanvas.placements[placement]}`;
  el.tabIndex = -1;
  el.setAttribute('data-bs-backdrop', String(backdrop));
  el.setAttribute('data-bs-scroll', String(scroll));
  if (labelledBy) el.setAttribute('aria-labelledby', labelledBy);

  return el;
}

/**
 * Creates an offcanvas header containing a title and a close button.
 *
 * @param options - Configuration for the header.
 * @returns A configured `HTMLElement` (`<div class="offcanvas-header">`).
 * @category Factory
 *
 * @example
 * ```ts
 * panel.appendChild(
 *   createOffcanvasHeader({ title: 'Settings', titleId: 'settingsTitle' })
 * );
 * ```
 */
export function createOffcanvasHeader(options: OffcanvasHeaderOptions): HTMLElement {
  const { title, titleId, closeLabel = 'Close' } = options;

  const header = document.createElement('div');
  header.className = offcanvas.header;

  const titleEl = document.createElement('h5');
  titleEl.className = offcanvas.title;
  if (titleId) titleEl.id = titleId;
  titleEl.textContent = title;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('data-bs-dismiss', 'offcanvas');
  closeBtn.setAttribute('aria-label', closeLabel);

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  return header;
}

/**
 * Creates an offcanvas body — the main scrollable content region.
 *
 * Append your content as children of the returned element.
 *
 * @returns A `HTMLElement` (`<div class="offcanvas-body">`).
 * @category Factory
 */
export function createOffcanvasBody(): HTMLElement {
  const el = document.createElement('div');
  el.className = offcanvas.body;
  return el;
}

/**
 * Creates an offcanvas footer — an optional action area pinned to the bottom.
 *
 * This is a Terra extension; Bootstrap does not ship a footer sub-component.
 *
 * @returns A `HTMLElement` (`<div class="offcanvas-footer">`).
 * @category Factory
 */
export function createOffcanvasFooter(): HTMLElement {
  const el = document.createElement('div');
  el.className = offcanvas.footer;
  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class and selector references for the Offcanvas component. @category Constants */
export const offcanvas = {
  /** Base offcanvas class. */
  base: 'offcanvas',
  /** Header sub-component class. */
  header: 'offcanvas-header',
  /** Title element class. */
  title: 'offcanvas-title',
  /** Body sub-component class. */
  body: 'offcanvas-body',
  /** Footer sub-component class (Terra extension). */
  footer: 'offcanvas-footer',
  /** Value used for `data-bs-toggle`. */
  toggle: 'offcanvas',
  /** Placement modifier classes keyed by placement value. */
  placements: {
    start: 'offcanvas-start',
    end: 'offcanvas-end',
    top: 'offcanvas-top',
    bottom: 'offcanvas-bottom',
  },
  /** Selector used to find all Terra offcanvas triggers in the document. */
  selector: '[data-lnpg-target]',
} as const;
