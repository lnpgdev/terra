/**
 * Terra UI Kit: Placeholder
 *
 * @remarks
 * CSS-only loading skeleton utilities built on Bootstrap's placeholder base.
 * Terra extends Bootstrap with additional shape variants.
 *
 * Usage:
 * ```html
 * <!-- Base placeholder -->
 * <span class="placeholder col-6"></span>
 *
 * <!-- With animation -->
 * <p class="placeholder-glow">
 *   <span class="placeholder col-12"></span>
 * </p>
 *
 * <!-- Circle shape -->
 * <span class="placeholder placeholder-circle" style="width: 3rem;"></span>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/placeholders/
 *
 * @module
 * @category Components
 */

/** CSS class references for the Placeholder component. @category Constants */
export const placeholder = {
  /** Base placeholder utility. */
  base: 'placeholder',
  /** Glow animation applied to the parent wrapper. */
  glow: 'placeholder-glow',
  /** Wave animation applied to the parent wrapper. */
  wave: 'placeholder-wave',
  /** Circular shape variant. */
  circle: 'placeholder-circle',
  /** Square shape variant. */
  square: 'placeholder-square',
  /** Triangle shape variant. */
  triangle: 'placeholder-triangle',
} as const;
