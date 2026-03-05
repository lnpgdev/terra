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

import { createDiv } from '@lnpg/sol/elements/container/div';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Visual style of the card.
 *
 * @remarks
 * `'default'`: standard Bootstrap card styling.
 * `'outlined'`: transparent background with a visible border.
 * `'elevated'`: borderless with a box shadow.
 * `'muted'`: secondary background with no border.
 *
 * @category Attributes
 */
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'muted';

/**
 * Size modifier affecting internal padding.
 *
 * @remarks
 * `'sm'`: reduced padding.
 * `'md'`: default Bootstrap padding (no size class applied).
 * `'lg'`: increased padding.
 *
 * @category Attributes
 */
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * Border-radius of the card corners.
 *
 * @remarks
 * `'none'`: square corners (default, matching Terra's design language).
 * `'sm'`: 0.25rem radius.
 * `'md'`: 0.5rem radius.
 * `'lg'`: 1rem radius.
 *
 * @category Attributes
 */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg';

/**
 * Edge on which the accent bar is placed.
 *
 * @remarks
 * `'top'` / `'bottom'` / `'left'` / `'right'`: the four card edges.
 *
 * @category Attributes
 */
export type CardAccentPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Colour tone of the accent bar.
 *
 * @remarks
 * `'info'`: cyan.
 * `'success'`: green.
 * `'warning'`: amber.
 * `'danger'`: red.
 * `'neutral'`: secondary grey.
 *
 * @category Attributes
 */
export type CardAccentTone =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'neutral';

/**
 * Thickness of the accent bar.
 *
 * @remarks
 * `'xs'`: 2px.
 * `'sm'`: 4px (default).
 * `'md'`: 6px.
 *
 * @category Attributes
 */
export type CardAccentThickness = 'xs' | 'sm' | 'md';

/**
 * Options for the card accent bar.
 *
 * @category Interfaces
 */
export interface CardAccentOptions {
  /**
   * Edge on which to place the bar.
   */
  position: CardAccentPosition;

  /**
   * Colour tone.
   */
  tone: CardAccentTone;

  /**
   * Bar thickness. Defaults to `'sm'`.
   */
  thickness?: CardAccentThickness;

  /**
   * Accessible label. Provide when the accent bar is the only indicator of
   * state and there is no accompanying text conveying the same meaning.
   */
  ariaLabel?: string;
}

/**
 * Options for {@link createCard}.
 *
 * @category Interfaces
 */
export interface CardOptions {
  /**
   * Visual style. Defaults to `'default'`.
   */
  variant?: CardVariant;

  /**
   * Internal padding size. Defaults to `'md'`.
   */
  size?: CardSize;

  /**
   * Corner rounding. Defaults to `'none'`.
   */
  radius?: CardRadius;

  /**
   * Accent bar configuration. Omit to render without an accent.
   */
  accent?: CardAccentOptions;
}

// ---------------------------------------------------------------------------
// Factories
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

  const el = createDiv(undefined, {
    className: [
      card.accent.base,
      card.accent.positions[position],
      card.accent.tones[tone],
      card.accent.thickness[thickness],
    ].join(' '),
    aria: ariaLabel ? { label: ariaLabel } : { hidden: true },
  });

  return el;
}

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

  const el = createDiv(undefined, { className: classes.join(' ') });

  if (accent) {
    el.appendChild(createCardAccent(accent));
  }

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Card component.
 *
 * @category Constants
 */
export const card = {
  /**
   * Base card class.
   */
  base: 'card',

  /**
   * Applied to the card when it contains an accent bar.
   */
  hasAccent: 'card-has-accent',

  /**
   * Variant modifier classes.
   */
  variants: {
    /**
     * Transparent background with a visible border.
     */
    outlined: 'card-outlined',

    /**
     * Borderless with a box shadow.
     */
    elevated: 'card-elevated',

    /**
     * Secondary background with no border.
     */
    muted: 'card-muted',
  },

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * Reduced padding.
     */
    sm: 'card-sm',

    /**
     * Increased padding.
     */
    lg: 'card-lg',
  },

  /**
   * Border-radius modifier classes.
   */
  radius: {
    /**
     * 0.25rem radius.
     */
    sm: 'card-radius-sm',

    /**
     * 0.5rem radius.
     */
    md: 'card-radius-md',

    /**
     * 1rem radius.
     */
    lg: 'card-radius-lg',
  },

  /**
   * Accent bar sub-component classes.
   */
  accent: {
    /**
     * Base accent bar class.
     */
    base: 'card-accent',

    /**
     * Position modifier classes.
     */
    positions: {
      /**
       * Top edge.
       */
      top: 'card-accent-top',

      /**
       * Bottom edge.
       */
      bottom: 'card-accent-bottom',

      /**
       * Left edge.
       */
      left: 'card-accent-left',

      /**
       * Right edge.
       */
      right: 'card-accent-right',
    },

    /**
     * Tone modifier classes.
     */
    tones: {
      /**
       * Blue.
       */
      primary: 'card-accent-primary',

      /**
       * Indigo.
       */
      secondary: 'card-accent-secondary',

      /**
       * Green.
       */
      success: 'card-accent-success',

      /**
       * Cyan.
       */
      info: 'card-accent-info',

      /**
       * Amber.
       */
      warning: 'card-accent-warning',

      /**
       * Red.
       */
      danger: 'card-accent-danger',

      /**
       * Dark neutral.
       */
      dark: 'card-accent-dark',

      /**
       * Secondary grey.
       */
      neutral: 'card-accent-neutral',
    },

    /**
     * Thickness modifier classes.
     */
    thickness: {
      /**
       * 2px.
       */
      xs: 'card-accent-xs',

      /**
       * 4px (default).
       */
      sm: 'card-accent-sm',

      /**
       * 6px.
       */
      md: 'card-accent-md',
    },
  },

  /**
   * Standard Bootstrap card sub-element classes.
   */
  header: 'card-header',

  /**
   * Card body class.
   */
  body: 'card-body',

  /**
   * Card footer class.
   */
  footer: 'card-footer',

  /**
   * Card title class.
   */
  title: 'card-title',

  /**
   * Card subtitle class.
   */
  subtitle: 'card-subtitle',

  /**
   * Card text class.
   */
  text: 'card-text',

  /**
   * Card top image class.
   */
  img: 'card-img-top',
} as const;
