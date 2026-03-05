/**
 * Terra UI Kit: Spinner
 *
 * @remarks
 * A CSS-only loading state indicator built on Bootstrap's spinner utilities.
 * Colour is controlled via Bootstrap text utility classes.
 *
 * Usage:
 * ```ts
 * import { createSpinner } from '@lnpg/terra/components/spinner';
 *
 * const el = createSpinner({ color: 'text-primary' });
 * document.body.appendChild(el);
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/spinners/
 * - MDN: ARIA live regions: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createSpan } from '@lnpg/sol/elements/container/span';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Visual style of the spinner.
 *
 * @remarks
 * `'border'`: a spinning ring (default).
 * `'grow'`: a pulsing growing dot.
 *
 * @category Attributes
 */
export type SpinnerVariant = 'border' | 'grow';

/**
 * Options for {@link createSpinner}.
 *
 * @category Interfaces
 */
export interface SpinnerOptions {
  /**
   * Visual style of the spinner. Defaults to `'border'`.
   */
  variant?: SpinnerVariant;

  /**
   * Renders a smaller spinner.
   */
  size?: 'sm';

  /**
   * Bootstrap text utility class for colour (e.g. `'text-primary'`).
   */
  color?: string;

  /**
   * Accessible label for screen readers. Defaults to `'Loading...'`.
   */
  label?: string;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured Spinner element.
 *
 * @param options - Configuration for the spinner.
 * @returns A `<div>` element ready to be appended to the DOM.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createSpinner({ variant: 'border', color: 'text-primary' })
 * );
 * ```
 */
export function createSpinner(options: SpinnerOptions = {}): HTMLElement {
  const { variant = 'border', size, color, label = 'Loading...' } = options;

  const classes: string[] = [variant === 'border' ? spinner.border : spinner.grow];
  if (size === 'sm') classes.push(variant === 'border' ? spinner.borderSm : spinner.growSm);
  if (color) classes.push(color);

  const el = createDiv(undefined, { className: classes.join(' '), role: 'status' });

  const hidden = createSpan(label, { className: 'visually-hidden' });
  el.appendChild(hidden);

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Spinner component.
 *
 * @category Constants
 */
export const spinner = {
  /**
   * Bordered spinning indicator.
   */
  border: 'spinner-border',

  /**
   * Small bordered spinning indicator.
   */
  borderSm: 'spinner-border-sm',

  /**
   * Growing pulsing indicator.
   */
  grow: 'spinner-grow',

  /**
   * Small growing pulsing indicator.
   */
  growSm: 'spinner-grow-sm',
} as const;
