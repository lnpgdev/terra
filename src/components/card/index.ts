/**
 * Terra UI Kit: Card
 *
 * @remarks
 * Flexible content container built on Bootstrap's .card. Supports four
 * visual variants, configurable border-radius, three sizes, and an accent
 * bar -- a coloured status strip on any edge used to convey contextual meaning
 * (e.g. call state, alert severity).
 *
 * The card factory creates only the container. Fill it with Bootstrap's
 * standard card sub-elements (.card-header, .card-body, .card-footer, etc.)
 * or with any arbitrary content.
 *
 * Usage:
 * ```html
 * <div class="card card-elevated card-radius-md">
 *   <div class="card-body">
 *     <h5 class="card-title">Title</h5>
 *     <p class="card-text">Some content.</p>
 *   </div>
 * </div>
 *
 * <!-- With accent bar -->
 * <div class="card card-has-accent">
 *   <div class="card-accent card-accent-left card-accent-success card-accent-md"
 *        aria-hidden="true"></div>
 *   <div class="card-body">Active call</div>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/card/
 *
 * @module
 * @category Components
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Visual style of the card. */
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'muted';

/** Size modifier affecting internal padding. */
export type CardSize = 'sm' | 'md' | 'lg';

/** Border-radius of the card corners. */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg';

/** Edge on which the accent bar is placed. */
export type CardAccentPosition = 'top' | 'bottom' | 'left' | 'right';

/** Colour tone of the accent bar. */
export type CardAccentTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/** Thickness of the accent bar. */
export type CardAccentThickness = 'xs' | 'sm' | 'md';

/** Options for the card accent bar. */
export interface CardAccentOptions {
  /** Edge on which to place the bar. */
  position: CardAccentPosition;
  /** Colour tone. */
  tone: CardAccentTone;
  /** Bar thickness. Defaults to `'sm'`. */
  thickness?: CardAccentThickness;
  /**
   * Accessible label. Provide when the accent bar is the only indicator of
   * state and there is no accompanying text conveying the same meaning.
   */
  ariaLabel?: string;
}

/** Options for {@link createCard}. */
export interface CardOptions {
  /** Visual style. Defaults to `'default'`. */
  variant?: CardVariant;
  /** Internal padding size. Defaults to `'md'`. */
  size?: CardSize;
  /** Corner rounding. Defaults to `'none'`. */
  radius?: CardRadius;
  /** Accent bar configuration. Omit to render without an accent. */
  accent?: CardAccentOptions;
}

// ---------------------------------------------------------------------------
// Factory: accent bar
// ---------------------------------------------------------------------------

/**
 * Creates a standalone card accent bar element.
 * Append it as the first child of a `.card.card-has-accent` container.
 *
 * @param options - Accent configuration.
 * @returns A `<div>` with the appropriate accent classes.
 * @category Factory
 */
export function createCardAccent(options: CardAccentOptions): HTMLElement {
  const { position, tone, thickness = 'sm', ariaLabel } = options;

  const el = document.createElement('div');
  el.className = [
    card.accent.base,
    card.accent.positions[position],
    card.accent.tones[tone],
    card.accent.thickness[thickness],
  ].join(' ');

  if (ariaLabel) {
    el.setAttribute('aria-label', ariaLabel);
  } else {
    el.setAttribute('aria-hidden', 'true');
  }

  return el;
}

// ---------------------------------------------------------------------------
// Factory: card container
// ---------------------------------------------------------------------------

/**
 * Creates a card container element.
 *
 * The card is intentionally slot-based -- append Bootstrap's standard card
 * sub-elements (.card-body, .card-header, .card-footer, etc.) or any other
 * content to the returned element.
 *
 * @param options - Card configuration.
 * @returns A `<div class="card ...">` ready to receive content.
 * @category Factory
 *
 * @example
 * ```ts
 * const c = createCard({ variant: 'elevated', radius: 'md', accent: {
 *   position: 'left', tone: 'success', thickness: 'md',
 * }});
 *
 * const body = document.createElement('div');
 * body.className = 'card-body';
 * body.textContent = 'Active call';
 * c.appendChild(body);
 *
 * document.body.appendChild(c);
 * ```
 */
export function createCard(options: CardOptions = {}): HTMLElement {
  const { variant = 'default', size, radius = 'none', accent } = options;

  const classes: string[] = [card.base];

  if (variant !== 'default') classes.push(card.variants[variant]);
  if (size === 'sm') classes.push(card.sizes.sm);
  if (size === 'lg') classes.push(card.sizes.lg);
  if (radius !== 'none') classes.push(card.radius[radius]);
  if (accent) classes.push(card.hasAccent);

  const el = document.createElement('div');
  el.className = classes.join(' ');

  if (accent) {
    el.appendChild(createCardAccent(accent));
  }

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Card component. @category Constants */
export const card = {
  /** Base card class. */
  base: 'card',
  /** Applied to the card when it contains an accent bar. */
  hasAccent: 'card-has-accent',
  variants: {
    outlined: 'card-outlined',
    elevated: 'card-elevated',
    muted: 'card-muted',
  },
  sizes: {
    sm: 'card-sm',
    lg: 'card-lg',
  },
  radius: {
    sm: 'card-radius-sm',
    md: 'card-radius-md',
    lg: 'card-radius-lg',
  },
  accent: {
    base: 'card-accent',
    positions: {
      top: 'card-accent-top',
      bottom: 'card-accent-bottom',
      left: 'card-accent-left',
      right: 'card-accent-right',
    },
    tones: {
      info: 'card-accent-info',
      success: 'card-accent-success',
      warning: 'card-accent-warning',
      danger: 'card-accent-danger',
      neutral: 'card-accent-neutral',
    },
    thickness: {
      xs: 'card-accent-xs',
      sm: 'card-accent-sm',
      md: 'card-accent-md',
    },
  },
  /** Standard Bootstrap card sub-element classes. */
  header: 'card-header',
  body: 'card-body',
  footer: 'card-footer',
  title: 'card-title',
  subtitle: 'card-subtitle',
  text: 'card-text',
  img: 'card-img-top',
} as const;
