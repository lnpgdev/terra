/**
 * Terra UI Kit: Placeholder
 *
 * @remarks
 * CSS-only loading skeleton utilities built on Bootstrap's placeholder base.
 * Terra extends Bootstrap with additional shape variants.
 *
 * Usage:
 * ```ts
 * import { createPlaceholder } from '@lnpg/terra/components/placeholder';
 *
 * const el = createPlaceholder({ cols: 8, animation: 'glow' });
 * document.body.appendChild(el);
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/placeholders/
 *
 * @module
 * @category Components
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** Animation style applied to the placeholder wrapper. */
export type PlaceholderAnimation = 'glow' | 'wave';

/** Shape variant for the placeholder. */
export type PlaceholderShape = 'circle' | 'square' | 'triangle';

/** Options for {@link createPlaceholder}. */
export interface PlaceholderOptions {
  /** Bootstrap grid column width (1–12). */
  cols?: number;
  /** Wraps the placeholder in an animated container. */
  animation?: PlaceholderAnimation;
  /** Shape variant. When provided, set `width` to control dimensions. */
  shape?: PlaceholderShape;
  /** CSS width for shaped variants (e.g. `'3rem'`). */
  width?: string;
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates a Placeholder element.
 *
 * @param options - Configuration for the placeholder.
 * @returns A `<span>` element, or a wrapped `<span>` when `animation` is set.
 */
export function createPlaceholder(options: PlaceholderOptions = {}): HTMLElement {
  const { cols, animation, shape, width } = options;

  const span = document.createElement('span');

  const classes: string[] = [placeholder.base];
  if (cols) classes.push(`col-${cols}`);
  if (shape === 'circle') classes.push(placeholder.circle);
  else if (shape === 'square') classes.push(placeholder.square);
  else if (shape === 'triangle') classes.push(placeholder.triangle);
  span.className = classes.join(' ');

  if (width) span.style.width = width;

  if (animation) {
    const wrapper = document.createElement('span');
    wrapper.className = animation === 'glow' ? placeholder.glow : placeholder.wave;
    wrapper.appendChild(span);
    return wrapper;
  }

  return span;
}

// ─── Constants ────────────────────────────────────────────────────────────────

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
