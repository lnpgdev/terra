/**
 * Terra UI Kit: Close Button
 *
 * @remarks
 * A dismiss button that renders an × icon. Typically used to close modals,
 * alerts, toasts, and other dismissible components.
 *
 * Usage:
 * ```html
 * <button type="button" class="btn-close" aria-label="Close"></button>
 * <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
 * <button type="button" class="btn-close" disabled aria-label="Close"></button>
 * ```
 *
 * References:
 * - Bootstrap: Close button: https://getbootstrap.com/docs/5.3/components/close-button/
 * - MDN: `<button>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 *
 * @module
 * @category Components
 */

/** CSS class references for the Close Button component. @category Constants */
export const closeButton = {
  /** Base close button with × icon. */
  base: 'btn-close',
  /** White variant for use on dark backgrounds. */
  white: 'btn-close-white',
} as const;
