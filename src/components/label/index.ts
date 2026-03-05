/**
 * Terra UI Kit: Label
 *
 * @remarks
 * Custom inline label component. Supports solid, outline, and ghost variants
 * across info, success, warning, and danger tones, with square, rounded, and
 * pill shapes and sm/md/lg size modifiers. Accepts an optional leading icon
 * and Bootstrap tooltip attributes.
 *
 * Usage:
 * ```html
 * <!-- Solid success pill -->
 * <span class="label label-pill label-solid-success">Active</span>
 *
 * <!-- Outline danger rounded -->
 * <span class="label label-rounded label-outline-danger">Overdue</span>
 *
 * <!-- Ghost info with icon -->
 * <span class="label label-pill label-ghost-info">
 *   <i class="bi bi-info-circle"></i> Info
 * </span>
 * ```
 *
 * References:
 * - Bootstrap tokens: https://getbootstrap.com/docs/5.3/customize/css-variables/
 *
 * @module
 * @category Components
 */

import { createSpan } from '@lnpg/sol/elements/container/span';
import { createI } from '@lnpg/sol/elements/inline/i';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Colour tone of the label.
 *
 * @remarks
 * `'info'`: cyan.
 * `'success'`: green.
 * `'warning'`: amber.
 * `'danger'`: red.
 *
 * @category Attributes
 */
export type LabelTone =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'dark';

/**
 * Visual style of the label.
 *
 * @remarks
 * `'solid'`: filled background.
 * `'outline'`: transparent background with a coloured border.
 * `'ghost'`: subtle tinted background.
 *
 * @category Attributes
 */
export type LabelVariant = 'solid' | 'outline' | 'ghost';

/**
 * Shape of the label.
 *
 * @remarks
 * `'square'`: sharp corners (default).
 * `'rounded'`: slight border radius.
 * `'pill'`: fully rounded ends.
 *
 * @category Attributes
 */
export type LabelShape = 'square' | 'rounded' | 'pill';

/**
 * Size modifier for the label.
 *
 * @remarks
 * `'sm'`: small.
 * `'md'`: default (no modifier class applied).
 * `'lg'`: large.
 *
 * @category Attributes
 */
export type LabelSize = 'sm' | 'md' | 'lg';

/**
 * Placeholder for the Terra Icon type.
 * Pass a CSS class string (e.g. `'bi bi-check-circle'`) until the Icon
 * component is available.
 */
type IconType = string;

/**
 * Options for {@link createLabel}.
 *
 * @category Interfaces
 */
export interface LabelOptions {
  /**
   * Text content of the label.
   */
  label: string;

  /**
   * Colour tone.
   */
  tone?: LabelTone;

  /**
   * Visual style. Defaults to `'solid'`.
   */
  variant?: LabelVariant;

  /**
   * Shape. Defaults to `'square'`.
   */
  shape?: LabelShape;

  /**
   * Size modifier. Defaults to `'md'` (no size class).
   */
  size?: LabelSize;

  /**
   * Leading icon. Accepts a CSS class string (e.g. `'bi bi-star'`).
   * Will be typed as `IconType` from the Icon component once available.
   */
  icon?: IconType;

  /**
   * Tooltip text. Requires Bootstrap Tooltip initialisation -- call
   * `initTooltips()` from the Tooltip component after inserting into the DOM.
   */
  tooltip?: string;

  /**
   * Tooltip placement. Defaults to Bootstrap's default (`'top'`).
   */
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a Terra label element.
 *
 * @param options - Configuration options for the label.
 * @returns A configured `HTMLSpanElement`.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createLabel({ label: 'Active', tone: 'success', variant: 'solid' })
 * );
 * ```
 */
export function createLabel(options: LabelOptions): HTMLSpanElement {
  const {
    label: text,
    tone,
    variant = 'solid',
    shape = 'square',
    size,
    icon,
    tooltip,
    tooltipPosition,
  } = options;

  const classes: string[] = [labelComponent.base];

  // Shape
  classes.push(labelComponent.shapes[shape]);

  // Size
  if (size === 'sm') classes.push(labelComponent.sizes.sm);
  else if (size === 'lg') classes.push(labelComponent.sizes.lg);

  // Variant + tone
  if (tone) {
    if (variant === 'outline') classes.push(labelComponent.outline[tone]);
    else if (variant === 'ghost') classes.push(labelComponent.ghost[tone]);
    else classes.push(labelComponent.solid[tone]);
  }

  const el = createSpan(undefined, { className: classes.join(' ') });

  // Icon
  if (icon) {
    const iconEl = createI(undefined, { className: icon });
    el.appendChild(iconEl);
  }

  el.appendChild(document.createTextNode(text));

  // Tooltip (requires Tooltip component initialisation after DOM insertion)
  if (tooltip) {
    el.setAttribute('data-bs-toggle', 'tooltip');
    el.setAttribute('data-bs-title', tooltip);
    if (tooltipPosition) {
      el.setAttribute('data-bs-placement', tooltipPosition);
    }
  }

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Label component.
 *
 * @category Constants
 */
export const labelComponent = {
  /**
   * Base label class. Always applied.
   */
  base: 'label',

  /**
   * Shape modifier classes.
   */
  shapes: {
    /**
     * Sharp corners (default).
     */
    square: 'label-square',

    /**
     * Slight border radius.
     */
    rounded: 'label-rounded',

    /**
     * Fully rounded ends.
     */
    pill: 'label-pill',
  },

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * Small.
     */
    sm: 'label-sm',

    /**
     * Large.
     */
    lg: 'label-lg',
  },

  /**
   * Solid variant tone classes (tinted bg + emphasis text).
   */
  solid: {
    /**
     * Blue.
     */
    primary: 'label-solid-primary',

    /**
     * Indigo.
     */
    secondary: 'label-solid-secondary',

    /**
     * Green.
     */
    success: 'label-solid-success',

    /**
     * Cyan.
     */
    info: 'label-solid-info',

    /**
     * Amber.
     */
    warning: 'label-solid-warning',

    /**
     * Red.
     */
    danger: 'label-solid-danger',

    /**
     * Dark neutral.
     */
    dark: 'label-solid-dark',
  },

  /**
   * Outline variant tone classes (border + text, transparent bg).
   */
  outline: {
    /**
     * Blue.
     */
    primary: 'label-outline-primary',

    /**
     * Indigo.
     */
    secondary: 'label-outline-secondary',

    /**
     * Green.
     */
    success: 'label-outline-success',

    /**
     * Cyan.
     */
    info: 'label-outline-info',

    /**
     * Amber.
     */
    warning: 'label-outline-warning',

    /**
     * Red.
     */
    danger: 'label-outline-danger',

    /**
     * Dark neutral.
     */
    dark: 'label-outline-dark',
  },

  /**
   * Ghost variant tone classes (text only, no bg or border).
   */
  ghost: {
    /**
     * Blue.
     */
    primary: 'label-ghost-primary',

    /**
     * Indigo.
     */
    secondary: 'label-ghost-secondary',

    /**
     * Green.
     */
    success: 'label-ghost-success',

    /**
     * Cyan.
     */
    info: 'label-ghost-info',

    /**
     * Amber.
     */
    warning: 'label-ghost-warning',

    /**
     * Red.
     */
    danger: 'label-ghost-danger',

    /**
     * Dark neutral.
     */
    dark: 'label-ghost-dark',
  },
} as const;
