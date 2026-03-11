/**
 * Terra UI Kit: Button
 *
 * @remarks
 * Square corners, supporting solid, outline, and link variants across
 * success, warning, and danger tones.
 *
 * Usage:
 * ```html
 * <button type="button" class="btn btn-success">Save</button>
 * <button type="button" class="btn btn-outline-danger">Delete</button>
 * <button type="button" class="btn btn-link">Cancel</button>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/buttons/
 *
 * @module
 * @category Components
 */

import { createButton as solButton } from '@lnpg/sol/elements/form/button';
import type { Tone, ComponentSize } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Tone options for solid and outline button variants.
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
export type ButtonTone = Tone;

/**
 * Visual style of the button.
 *
 * @remarks
 * `'solid'`: filled background.
 * `'outline'`: transparent background with a coloured border.
 * `'link'`: text link style with no border or background.
 *
 * @category Attributes
 */
export type ButtonVariant = 'solid' | 'outline' | 'link';

/**
 * Size modifier for the button.
 *
 * @remarks
 * `'sm'`: small.
 * `'md'`: medium (default, no size class applied).
 * `'lg'`: large.
 *
 * @category Attributes
 */
export type ButtonSize = ComponentSize;

/**
 * Options for {@link createButton}.
 *
 * @category Interfaces
 */
export interface ButtonOptions {
  /**
   * Visual style. Defaults to `'solid'`.
   */
  variant?: ButtonVariant;

  /**
   * Colour tone. Required for `solid` and `outline` variants;
   * ignored for `link`.
   */
  tone?: ButtonTone;

  /**
   * Size modifier. Defaults to `'md'` (no size class).
   */
  size?: ButtonSize;

  /**
   * Whether the button is disabled. Defaults to `false`.
   */
  disabled?: boolean;

  /**
   * Button label text. Defaults to `'Button'`.
   */
  label?: string;

  /**
   * HTML button type attribute. Defaults to `'button'`.
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Click handler attached to the button element.
   */
  onClick?: (event: MouseEvent) => void;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a Terra button element.
 *
 * @param options - Configuration options for the button.
 * @returns A configured `HTMLButtonElement`.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createButton({ variant: 'solid', tone: 'success', label: 'Save' })
 * );
 * ```
 */
export function createButton(options: ButtonOptions = {}): HTMLButtonElement {
  const {
    variant = 'solid',
    tone,
    size,
    disabled = false,
    label = 'Button',
    type = 'button',
    onClick,
  } = options;

  const classes: string[] = [button.base];

  if (variant === 'link') {
    classes.push(button.link);
  } else if (tone) {
    classes.push(variant === 'outline' ? button.outline[tone] : button.solid[tone]);
  }

  if (size === 'sm') classes.push(button.sizes.sm);
  else if (size === 'lg') classes.push(button.sizes.lg);

  const el = solButton(label, {
    type,
    className: classes.join(' '),
    disabled: disabled || undefined,
  });

  if (onClick) el.addEventListener('click', onClick);

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Button component.
 *
 * @category Constants
 */
export const button = {
  /**
   * Base button class. Always applied.
   */
  base: 'btn',

  /**
   * Solid (filled) variant classes, keyed by tone.
   */
  solid: {
    /**
     * Blue.
     */
    primary: 'btn-primary',

    /**
     * Indigo.
     */
    secondary: 'btn-secondary',

    /**
     * Green.
     */
    success: 'btn-success',

    /**
     * Cyan.
     */
    info: 'btn-info',

    /**
     * Amber.
     */
    warning: 'btn-warning',

    /**
     * Red.
     */
    danger: 'btn-danger',

    /**
     * Dark neutral.
     */
    dark: 'btn-dark',
  },

  /**
   * Outline variant classes, keyed by tone.
   */
  outline: {
    /**
     * Blue.
     */
    primary: 'btn-outline-primary',

    /**
     * Indigo.
     */
    secondary: 'btn-outline-secondary',

    /**
     * Green.
     */
    success: 'btn-outline-success',

    /**
     * Cyan.
     */
    info: 'btn-outline-info',

    /**
     * Amber.
     */
    warning: 'btn-outline-warning',

    /**
     * Red.
     */
    danger: 'btn-outline-danger',

    /**
     * Dark neutral.
     */
    dark: 'btn-outline-dark',
  },

  /**
   * Link variant class.
   */
  link: 'btn-link',

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * Small.
     */
    sm: 'btn-sm',

    /**
     * Large.
     */
    lg: 'btn-lg',
  },
} as const;
