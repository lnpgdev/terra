/**
 * Terra UI Kit: Spinner
 *
 * @remarks
 * A CSS-only loading state indicator built on Bootstrap's spinner utilities.
 * Colour is controlled entirely via Bootstrap text utility classes — no
 * JavaScript behaviour is required or provided.
 *
 * Usage:
 * ```html
 * <div class="spinner-border" role="status">
 *   <span class="visually-hidden">Loading...</span>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/spinners/
 * - MDN: ARIA live regions: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 *
 * @module
 * @category Components
 */

/** CSS class references for the Spinner component. @category Constants */
export const spinner = {
  /** Bordered spinning indicator. */
  border: 'spinner-border',
  /** Small bordered spinning indicator. */
  borderSm: 'spinner-border-sm',
  /** Growing pulsing indicator. */
  grow: 'spinner-grow',
  /** Small growing pulsing indicator. */
  growSm: 'spinner-grow-sm',
} as const;
