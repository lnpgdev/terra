/**
 * Terra UI Kit: Tooltip
 *
 * @remarks
 * Wraps Bootstrap's Tooltip plugin with Terra's square-corner override.
 * Tooltips are applied to existing elements via data attributes and
 * Bootstrap's JS initialisation.
 *
 * HTML-authored tooltips (elements with `data-bs-toggle="tooltip"`) are
 * initialised automatically on DOMContentLoaded. Call {@link initTooltips}
 * manually after dynamically inserting tooltip-enabled elements.
 *
 * Use {@link addTooltip} in factory-driven workflows to apply tooltip
 * behaviour to an element programmatically.
 *
 * Usage:
 * ```html
 * <button
 *   type="button"
 *   class="btn btn-success"
 *   data-bs-toggle="tooltip"
 *   data-bs-title="Helpful tip"
 *   data-bs-placement="top"
 * >
 *   Hover me
 * </button>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/tooltips/
 *
 * @module
 * @category Components
 */

import BsTooltip from 'bootstrap/js/dist/tooltip';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Placement of the tooltip relative to its target element.
 *
 * @remarks
 * `'top'`: above the element (default).
 * `'right'`: to the right.
 * `'bottom'`: below.
 * `'left'`: to the left.
 *
 * @category Attributes
 */
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Options for {@link addTooltip}.
 *
 * @category Interfaces
 */
export interface TooltipOptions {
  /**
   * Tooltip text content.
   */
  title: string;

  /**
   * Where the tooltip appears relative to the element. Defaults to `'top'`.
   */
  placement?: TooltipPlacement;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Initialises Bootstrap Tooltips on all elements matching
 * `[data-bs-toggle="tooltip"]` in the document. Call this after
 * dynamically inserting tooltip-enabled elements into the DOM.
 *
 * @category Initialiser
 */
export function initTooltips(): void {
  document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]').forEach((el) => {
    BsTooltip.getOrCreateInstance(el);
  });
}

// Auto-initialise HTML-authored tooltips on page load.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTooltips);
} else {
  initTooltips();
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Applies tooltip behaviour to an existing element by setting the required
 * Bootstrap data attributes and initialising the Bootstrap Tooltip instance.
 *
 * @param el - The element to attach the tooltip to.
 * @param options - Tooltip configuration.
 * @category Factory
 *
 * @example
 * ```ts
 * const btn = createButton({ variant: 'solid', tone: 'success', label: 'Save' });
 * addTooltip(btn, { title: 'Save your changes', placement: 'top' });
 * document.body.appendChild(btn);
 * ```
 */
export function addTooltip(el: HTMLElement, options: TooltipOptions): void {
  el.setAttribute('data-bs-toggle', 'tooltip');
  el.setAttribute('data-bs-title', options.title);
  if (options.placement) {
    el.setAttribute('data-bs-placement', options.placement);
  }
  BsTooltip.getOrCreateInstance(el);
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Data attribute references for the Tooltip component.
 *
 * @category Constants
 */
export const tooltip = {
  /**
   * Value of the `data-bs-toggle` attribute that marks a tooltip target.
   */
  toggle: 'tooltip',

  /**
   * Selector that matches all tooltip-enabled elements in the DOM.
   */
  selector: '[data-bs-toggle="tooltip"]',
} as const;
