/**
 * Terra UI Kit: Collapse
 *
 * @remarks
 * Wraps Bootstrap's Collapse plugin. Provides factories for a toggle
 * element (button or anchor) and a collapsible panel, plus an initialiser
 * that auto-runs on DOMContentLoaded.
 *
 * Call {@link initCollapses} manually after dynamically inserting
 * collapse-enabled elements into the DOM.
 *
 * Usage:
 * ```html
 * <button
 *   type="button"
 *   class="btn btn-success"
 *   data-bs-toggle="collapse"
 *   data-bs-target="#myPanel"
 *   aria-expanded="false"
 *   aria-controls="myPanel"
 * >
 *   Toggle
 * </button>
 * <div id="myPanel" class="collapse">
 *   <p>Panel content.</p>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/collapse/
 *
 * @module
 * @category Components
 */

import BsCollapse from 'bootstrap/js/dist/collapse';
import { createA } from '@lnpg/sol/elements/inline/a';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createDiv } from '@lnpg/sol/elements/container/div';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** The element type used to trigger a collapse. */
export type CollapseToggleVariant = 'button' | 'anchor';

/** Options for {@link createCollapseToggle}. */
export interface CollapseToggleOptions {
  /** Element type for the toggle. Defaults to `'button'`. */
  variant?: CollapseToggleVariant;
  /** ID of the collapse panel to target (without the `#` prefix). */
  target: string;
  /** Whether the panel is expanded on initial render. Defaults to `false`. */
  expanded?: boolean;
  /** Visible text label on the toggle element. */
  label: string;
}

/** Options for {@link createCollapse}. */
export interface CollapseOptions {
  /** ID applied to the collapse panel element. */
  id: string;
  /** Whether the panel is visible on initial render. Defaults to `false`. */
  open?: boolean;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Initialises Bootstrap Collapse instances on all elements matching
 * `[data-bs-toggle="collapse"]` in the document. Call this after
 * dynamically inserting collapse-enabled elements into the DOM.
 *
 * Runs automatically on `DOMContentLoaded`.
 *
 * @category Initialiser
 */
export function initCollapses(): void {
  document.querySelectorAll<HTMLElement>(collapse.selector).forEach((trigger) => {
    const selector = trigger.getAttribute('data-bs-target') ?? trigger.getAttribute('href');
    if (!selector) return;
    document.querySelectorAll<HTMLElement>(selector).forEach((panel) => {
      BsCollapse.getOrCreateInstance(panel, { toggle: false });
    });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initCollapses());
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a collapse toggle element (button or anchor).
 *
 * @param options - Configuration for the toggle.
 * @returns An `HTMLButtonElement` or `HTMLAnchorElement`.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createCollapseToggle({ target: 'myPanel', label: 'Toggle', expanded: false })
 * );
 * ```
 */
export function createCollapseToggle(
  options: CollapseToggleOptions,
): HTMLButtonElement | HTMLAnchorElement {
  const { variant = 'button', target, expanded = false, label } = options;

  if (variant === 'anchor') {
    const el = createA(label, {
      href: `#${target}`,
      role: 'button',
      dataset: { bsToggle: collapse.toggle },
      attrs: { 'aria-expanded': String(expanded), 'aria-controls': target },
    });
    return el;
  }

  const el = createButton(label, {
    type: 'button',
    dataset: { bsToggle: collapse.toggle, bsTarget: `#${target}` },
    attrs: { 'aria-expanded': String(expanded), 'aria-controls': target },
  });
  return el;
}

/**
 * Creates a collapsible panel element.
 *
 * @param options - Configuration for the collapse panel.
 * @returns A configured `HTMLElement` (a `<div class="collapse">`).
 * @category Factory
 *
 * @example
 * ```ts
 * const panel = createCollapse({ id: 'myPanel', open: true });
 * panel.appendChild(document.createTextNode('Panel content.'));
 * document.body.appendChild(panel);
 * ```
 */
export function createCollapse(options: CollapseOptions): HTMLElement {
  const { id, open = false } = options;

  const el = createDiv(undefined, {
    id,
    className: [collapse.base, ...(open ? [collapse.show] : [])].join(' '),
  });

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class and selector references for the Collapse component. @category Constants */
export const collapse = {
  /** Base collapse class. */
  base: 'collapse',
  /** Class added when the panel is visible. */
  show: 'show',
  /** Class present during the open/close transition. */
  collapsing: 'collapsing',
  /** Value used for `data-bs-toggle`. */
  toggle: 'collapse',
  /** Selector used to find all collapse toggles in the document. */
  selector: '[data-bs-toggle="collapse"]',
} as const;
