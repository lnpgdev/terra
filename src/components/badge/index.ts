/**
 * Terra UI Kit: Badge
 *
 * @remarks
 * Badges come in a standard pill version and compact shapes (dot, square,
 * triangle) for use as notification indicators. Supports solid, outline, and
 * link variants across success, warning, and danger tones.
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Visual style of the badge. */
export type BadgeVariant = 'solid' | 'outline' | 'link';

/** Colour tone of the badge. */
export type BadgeTone = 'success' | 'warning' | 'danger';

/** Size modifier for the badge. */
export type BadgeSize = 'sm' | 'md' | 'lg';

/** Shape of the badge. */
export type BadgeShape = 'dot' | 'square' | 'triangle' | 'pill';

/** Direction for overlay positioning relative to a parent element. */
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
 */
export type IconType = string;

/** Options for {@link createBadge}. */
export interface BadgeOptions {
  /** Visual style. Defaults to `'solid'`. */
  variant?: BadgeVariant;
  /** Colour tone. */
  tone?: BadgeTone;
  /** Size modifier. Defaults to `'md'` (no size class). */
  size?: BadgeSize;
  /** Shape of the badge. Defaults to `'pill'`. */
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
  /** Tooltip placement. Defaults to Bootstrap's default (`'top'`). */
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
    shape = 'pill',
    label,
    ariaLabel,
    href,
    direction,
    max,
    icon,
    tooltip,
    tooltipPosition,
  } = options;

  const el = document.createElement(href ? 'a' : 'span');
  if (href) (el as HTMLAnchorElement).href = href;
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
    else if (shape === 'square') classes.push(badge.shapes.square);
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

  el.className = classes.join(' ');

  // Label (pill and numeric badges only)
  if (shape === 'pill' && label != null) {
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
    const iconEl = document.createElement('i');
    iconEl.className = icon;
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

/** CSS class references for the Badge component. @category Constants */
export const badge = {
  /** Base badge class. Applied to pill and square shapes only. */
  base: 'badge',
  /** Shape classes. */
  shapes: {
    pill: 'rounded-pill',
    square: 'badge-square',
    /** Standalone -- do not combine with `badge.base`. */
    dot: 'badge-dot',
    /** Standalone -- do not combine with `badge.base`. */
    triangle: 'badge-triangle',
  },
  /** Solid variant tone classes for pill/square (Bootstrap text-bg helpers). */
  solid: {
    success: 'text-bg-success',
    warning: 'text-bg-warning',
    danger: 'text-bg-danger',
  },
  /** Outline variant tone classes for pill/square. */
  outline: {
    success: 'badge-outline-success',
    warning: 'badge-outline-warning',
    danger: 'badge-outline-danger',
  },
  /** Link variant tone classes for pill/square. */
  link: {
    success: 'badge-link-success',
    warning: 'badge-link-warning',
    danger: 'badge-link-danger',
  },
  /** Solid tone classes for dot shape. */
  dotSolid: {
    success: 'badge-dot-success',
    warning: 'badge-dot-warning',
    danger: 'badge-dot-danger',
  },
  /** Outline tone classes for dot shape. */
  dotOutline: {
    success: 'badge-dot-outline-success',
    warning: 'badge-dot-outline-warning',
    danger: 'badge-dot-outline-danger',
  },
  /** Tone classes for triangle shape (solid fill via CSS border trick). */
  triangleSolid: {
    success: 'badge-triangle-success',
    warning: 'badge-triangle-warning',
    danger: 'badge-triangle-danger',
  },
  /** Size modifier classes (pill/square only). */
  sizes: {
    sm: 'badge-sm',
    lg: 'badge-lg',
  },
  /** Absolute-positioning direction classes. */
  directions: {
    top: 'badge-top',
    right: 'badge-right',
    bottom: 'badge-bottom',
    left: 'badge-left',
    'top-right': 'badge-top-right',
    'top-left': 'badge-top-left',
    'bottom-right': 'badge-bottom-right',
    'bottom-left': 'badge-bottom-left',
  },
} as const;
