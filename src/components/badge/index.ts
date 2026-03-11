/**
 * Terra UI Kit: Badge
 *
 * @remarks
 * Badges come in a standard pill version and compact shapes (dot, square,
 * triangle) for use as notification indicators. Supports solid, outline, and
 * link variants across the full component tone palette (primary, secondary,
 * success, info, warning, danger, dark). Default shape is square.
 *
 * When used as an overlay (via `direction`), the badge is positioned
 * absolutely -- the parent element must have `position: relative`.
 *
 * Usage:
 * ```html
 * <!-- Pill badge -->
 * <span class="badge rounded-pill text-bg-success">New</span>
 *
 * <!-- Notification dot on a button -->
 * <div class="position-relative d-inline-block">
 *   <button type="button" class="btn btn-success">Inbox</button>
 *   <span class="badge badge-dot text-bg-danger badge-top" aria-label="New messages" role="img"></span>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/badge/
 *
 * @module
 * @category Components
 */

import { createSpan } from '@lnpg/sol/elements/container/span';
import { createA } from '@lnpg/sol/elements/inline/a';
import { createI } from '@lnpg/sol/elements/inline/i';
import type { Tone, ComponentSize } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Visual style of the badge.
 *
 * @remarks
 * `'solid'`: filled background via Bootstrap text-bg helpers.
 * `'outline'`: transparent background with a coloured border.
 * `'link'`: subtle tinted background with emphasis text colour, rendered as an `<a>`.
 *
 * @category Attributes
 */
export type BadgeVariant = 'solid' | 'outline' | 'link';

/**
 * Colour tone of the badge.
 *
 * @remarks
 * Mirrors Bootstrap's theme-color keys, which are driven by Sol tokens:
 * `'primary'`: brand blue.
 * `'secondary'`: brand indigo.
 * `'success'`: green.
 * `'info'`: cyan.
 * `'warning'`: amber.
 * `'danger'`: red.
 * `'dark'`: dark neutral.
 *
 * @category Attributes
 */
export type BadgeTone = Tone;

/**
 * Size modifier for the badge.
 *
 * @remarks
 * `'sm'`: small.
 * `'md'`: medium (default, no size class applied).
 * `'lg'`: large.
 *
 * @category Attributes
 */
export type BadgeSize = ComponentSize;

/**
 * Shape of the badge.
 *
 * @remarks
 * `'pill'`: rounded pill built on Bootstrap's `.badge`.
 * `'square'`: square corners built on Bootstrap's `.badge`.
 * `'dot'`: standalone circular indicator - does not use `.badge` as a base.
 * `'triangle'`: standalone triangular indicator - does not use `.badge` as a base.
 *
 * @category Attributes
 */
export type BadgeShape = 'dot' | 'square' | 'triangle' | 'pill';

/**
 * Direction for overlay positioning relative to a parent element.
 *
 * @remarks
 * `'top'` / `'right'` / `'bottom'` / `'left'`: centred on each edge.
 * `'top-right'` / `'top-left'` / `'bottom-right'` / `'bottom-left'`: corners.
 *
 * @category Attributes
 */
export type BadgeDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

/**
 * Placeholder for the Terra Icon type.
 * Will be replaced with the `IconType` from the Icon component once available.
 * Pass a CSS class string (e.g. `'bi bi-star'`) in the meantime.
 *
 * @category Attributes
 */
export type IconType = string;

/**
 * Options for {@link createBadge}.
 *
 * @category Interfaces
 */
export interface BadgeOptions {
  /**
   * Visual style. Defaults to `'solid'`.
   */
  variant?: BadgeVariant;

  /**
   * Colour tone.
   */
  tone?: BadgeTone;

  /**
   * Size modifier. Defaults to `'md'` (no size class).
   */
  size?: BadgeSize;

  /**
   * Shape of the badge. Defaults to `'square'`.
   */
  shape?: BadgeShape;

  /**
   * Text label. Required for `pill`; should be `null` for all other shapes.
   * When the value is numeric and exceeds `max`, displays `{max}+` instead.
   */
  label?: string | null;

  /**
   * Accessible label. Required for `dot`, `square`, and `triangle` shapes
   * to convey meaning to screen readers.
   */
  ariaLabel?: string;

  /**
   * URL for the badge to link to. When provided, the badge renders as an
   * `<a>` element. Required for the `link` variant to be interactive.
   */
  href?: string;

  /**
   * Positions the badge absolutely at the given edge of its parent.
   * The parent element must have `position: relative`.
   */
  direction?: BadgeDirection;

  /**
   * Caps a numeric label at this value, displaying `{max}+` when exceeded.
   * Only applies when `label` is a numeric string.
   */
  max?: number;

  /**
   * Icon to display inside the badge. Accepts a CSS class string.
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
 * Creates a Terra badge element.
 *
 * @param options - Configuration options for the badge.
 * @returns A configured `HTMLElement` (span).
 * @category Factory
 *
 * @example
 * ```ts
 * // Pill badge
 * document.body.appendChild(
 *   createBadge({ shape: 'pill', tone: 'success', label: 'New' })
 * );
 *
 * // Notification dot
 * const wrapper = document.createElement('div');
 * wrapper.className = 'position-relative d-inline-block';
 * wrapper.appendChild(createButton({ variant: 'solid', tone: 'success', label: 'Inbox' }));
 * wrapper.appendChild(
 *   createBadge({ shape: 'dot', tone: 'danger', direction: 'top', ariaLabel: 'New messages' })
 * );
 * document.body.appendChild(wrapper);
 * ```
 */
export function createBadge(options: BadgeOptions = {}): HTMLElement {
  const {
    variant = 'solid',
    tone,
    size,
    shape = 'square',
    label,
    ariaLabel,
    href,
    direction,
    max,
    icon,
    tooltip,
    tooltipPosition,
  } = options;

  const classes: string[] = [];

  if (shape === 'dot') {
    // Dot is standalone -- does not use .badge as base
    classes.push(badge.shapes.dot);
    if (tone) {
      if (variant === 'outline') classes.push(badge.dotOutline[tone]);
      else classes.push(badge.dotSolid[tone]); // solid and link both fill
    }
  } else if (shape === 'triangle') {
    // Triangle is standalone -- does not use .badge as base
    classes.push(badge.shapes.triangle);
    if (tone) classes.push(badge.triangleSolid[tone]);
  } else {
    // Pill and square build on Bootstrap's .badge
    classes.push(badge.base);
    if (shape === 'pill') classes.push(badge.shapes.pill);
    // square: .badge already has border-radius: 0 by default, no extra class
    if (tone) {
      if (variant === 'solid') classes.push(badge.solid[tone]);
      else if (variant === 'outline') classes.push(badge.outline[tone]);
      else if (variant === 'link') classes.push(badge.link[tone]);
    }
    // Size only applies to pill/square
    if (size === 'sm') classes.push(badge.sizes.sm);
    else if (size === 'lg') classes.push(badge.sizes.lg);
  }

  // Direction
  if (direction) classes.push(badge.directions[direction]);

  let el: HTMLAnchorElement | HTMLSpanElement;
  if (href) {
    el = createA(undefined, { className: classes.join(' '), href });
  } else {
    el = createSpan(undefined, { className: classes.join(' ') });
  }

  // Label (pill, square, and numeric badges only)
  if ((shape === 'pill' || shape === 'square') && label != null) {
    const numeric = Number(label);
    el.textContent = max !== undefined && !isNaN(numeric) && numeric > max ? `${max}+` : label;
  }

  // Accessibility for non-pill shapes
  if (shape !== 'pill') {
    if (ariaLabel) {
      el.setAttribute('aria-label', ariaLabel);
      el.setAttribute('role', 'img');
    } else {
      el.setAttribute('aria-hidden', 'true');
    }
  }

  // Icon
  if (icon) {
    const iconEl = createI(undefined, { className: icon });
    el.prepend(iconEl);
  }

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
 * CSS class references for the Badge component.
 *
 * @category Constants
 */
export const badge = {
  /**
   * Base badge class. Applied to pill and square shapes only.
   */
  base: 'badge',

  /**
   * Shape modifier classes.
   */
  shapes: {
    /**
     * Rounded pill shape.
     */
    pill: 'rounded-pill',

    /**
     * Square corners.
     */
    square: 'badge-square',

    /**
     * Standalone circular indicator -- do not combine with `badge.base`.
     */
    dot: 'badge-dot',

    /**
     * Standalone triangular indicator -- do not combine with `badge.base`.
     */
    triangle: 'badge-triangle',
  },

  /**
   * Solid variant tone classes for pill/square (Bootstrap text-bg helpers).
   */
  solid: {
    /**
     * Blue.
     */
    primary: 'text-bg-primary',

    /**
     * Indigo.
     */
    secondary: 'text-bg-secondary',

    /**
     * Green.
     */
    success: 'text-bg-success',

    /**
     * Cyan.
     */
    info: 'text-bg-info',

    /**
     * Amber.
     */
    warning: 'text-bg-warning',

    /**
     * Red.
     */
    danger: 'text-bg-danger',

    /**
     * Dark neutral.
     */
    dark: 'text-bg-dark',
  },

  /**
   * Outline variant tone classes for pill/square.
   */
  outline: {
    /**
     * Blue.
     */
    primary: 'badge-outline-primary',

    /**
     * Indigo.
     */
    secondary: 'badge-outline-secondary',

    /**
     * Green.
     */
    success: 'badge-outline-success',

    /**
     * Cyan.
     */
    info: 'badge-outline-info',

    /**
     * Amber.
     */
    warning: 'badge-outline-warning',

    /**
     * Red.
     */
    danger: 'badge-outline-danger',

    /**
     * Dark neutral.
     */
    dark: 'badge-outline-dark',
  },

  /**
   * Link variant tone classes for pill/square.
   */
  link: {
    /**
     * Blue.
     */
    primary: 'badge-link-primary',

    /**
     * Indigo.
     */
    secondary: 'badge-link-secondary',

    /**
     * Green.
     */
    success: 'badge-link-success',

    /**
     * Cyan.
     */
    info: 'badge-link-info',

    /**
     * Amber.
     */
    warning: 'badge-link-warning',

    /**
     * Red.
     */
    danger: 'badge-link-danger',

    /**
     * Dark neutral.
     */
    dark: 'badge-link-dark',
  },

  /**
   * Solid tone classes for dot shape.
   */
  dotSolid: {
    /**
     * Blue.
     */
    primary: 'badge-dot-primary',

    /**
     * Indigo.
     */
    secondary: 'badge-dot-secondary',

    /**
     * Green.
     */
    success: 'badge-dot-success',

    /**
     * Cyan.
     */
    info: 'badge-dot-info',

    /**
     * Amber.
     */
    warning: 'badge-dot-warning',

    /**
     * Red.
     */
    danger: 'badge-dot-danger',

    /**
     * Dark neutral.
     */
    dark: 'badge-dot-dark',
  },

  /**
   * Outline tone classes for dot shape.
   */
  dotOutline: {
    /**
     * Blue.
     */
    primary: 'badge-dot-outline-primary',

    /**
     * Indigo.
     */
    secondary: 'badge-dot-outline-secondary',

    /**
     * Green.
     */
    success: 'badge-dot-outline-success',

    /**
     * Cyan.
     */
    info: 'badge-dot-outline-info',

    /**
     * Amber.
     */
    warning: 'badge-dot-outline-warning',

    /**
     * Red.
     */
    danger: 'badge-dot-outline-danger',

    /**
     * Dark neutral.
     */
    dark: 'badge-dot-outline-dark',
  },

  /**
   * Tone classes for triangle shape (solid fill via CSS border trick).
   */
  triangleSolid: {
    /**
     * Blue.
     */
    primary: 'badge-triangle-primary',

    /**
     * Indigo.
     */
    secondary: 'badge-triangle-secondary',

    /**
     * Green.
     */
    success: 'badge-triangle-success',

    /**
     * Cyan.
     */
    info: 'badge-triangle-info',

    /**
     * Amber.
     */
    warning: 'badge-triangle-warning',

    /**
     * Red.
     */
    danger: 'badge-triangle-danger',

    /**
     * Dark neutral.
     */
    dark: 'badge-triangle-dark',
  },

  /**
   * Size modifier classes (pill/square only).
   */
  sizes: {
    /**
     * Small.
     */
    sm: 'badge-sm',

    /**
     * Large.
     */
    lg: 'badge-lg',
  },

  /**
   * Absolute-positioning direction classes.
   */
  directions: {
    /**
     * Centre of top edge.
     */
    top: 'badge-top',

    /**
     * Centre of right edge.
     */
    right: 'badge-right',

    /**
     * Centre of bottom edge.
     */
    bottom: 'badge-bottom',

    /**
     * Centre of left edge.
     */
    left: 'badge-left',

    /**
     * Top-right corner.
     */
    'top-right': 'badge-top-right',

    /**
     * Top-left corner.
     */
    'top-left': 'badge-top-left',

    /**
     * Bottom-right corner.
     */
    'bottom-right': 'badge-bottom-right',

    /**
     * Bottom-left corner.
     */
    'bottom-left': 'badge-bottom-left',
  },
} as const;
