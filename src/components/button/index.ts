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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Tone options for solid and outline button variants. */
export type ButtonTone = 'success' | 'warning' | 'danger';

/** Visual style of the button. */
export type ButtonVariant = 'solid' | 'outline' | 'link';

/** Size modifier for the button. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Options for {@link createButton}. */
export interface ButtonOptions {
  /** Visual style. Defaults to `'solid'`. */
  variant?: ButtonVariant;
  /**
   * Colour tone. Required for `solid` and `outline` variants;
   * ignored for `link`.
   */
  tone?: ButtonTone;
  /** Size modifier. Defaults to `'md'` (no size class). */
  size?: ButtonSize;
  /** Whether the button is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** Button label text. Defaults to `'Button'`. */
  label?: string;
  /** HTML button type attribute. Defaults to `'button'`. */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler attached to the button element. */
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

/** CSS class references for the Button component. @category Constants */
export const button = {
  /** Base button class. Always applied. */
  base: 'btn',
  /** Solid (filled) variant classes, keyed by tone. */
  solid: {
    success: 'btn-success',
    warning: 'btn-warning',
    danger: 'btn-danger',
  },
  /** Outline variant classes, keyed by tone. */
  outline: {
    success: 'btn-outline-success',
    warning: 'btn-outline-warning',
    danger: 'btn-outline-danger',
  },
  /** Link variant class. */
  link: 'btn-link',
  /** Size modifier classes. */
  sizes: {
    sm: 'btn-sm',
    lg: 'btn-lg',
  },
} as const;
