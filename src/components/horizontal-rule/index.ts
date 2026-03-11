/**
 * Terra UI Kit: Horizontal Rule
 *
 * @remarks
 * A semantic divider element with tone and size variants applied via modifier
 * classes on the native `<hr>` element.
 *
 * Usage:
 * ```ts
 * import { createHr } from '@lnpg/terra/components/horizontal-rule';
 *
 * const el = createHr({ tone: 'success', size: 'md' });
 * document.body.appendChild(el);
 * ```
 *
 * References:
 * - MDN: `<hr>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
 * - Bootstrap: HR variables: https://getbootstrap.com/docs/5.3/content/typography/#horizontal-rules
 *
 * @module
 * @category Components
 */

import { createHr as solHr } from '@lnpg/sol/elements/text/hr';
import type { Tone, ComponentSize } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Semantic colour tone for the horizontal rule.
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
export type HrTone = Tone;

/**
 * Thickness size for the horizontal rule.
 *
 * @remarks
 * `'sm'`: 1px border.
 * `'md'`: 2px border.
 * `'lg'`: 4px border.
 *
 * @category Attributes
 */
export type HrSize = ComponentSize;

/**
 * Options for {@link createHr}.
 *
 * @category Interfaces
 */
export interface HrOptions {
  /**
   * Semantic colour tone. Omit for the default muted rule.
   */
  tone?: HrTone;

  /**
   * Border thickness. Omit for Bootstrap's default.
   */
  size?: HrSize;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a Horizontal Rule element.
 *
 * @param options - Configuration for the horizontal rule.
 * @returns An `<hr>` element ready to be appended to the DOM.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createHr({ tone: 'success', size: 'md' })
 * );
 * ```
 */
export function createHr(options: HrOptions = {}): HTMLHRElement {
  const { tone, size } = options;

  const classes: string[] = [];
  if (tone) classes.push(hr.tones[tone]);
  if (size) classes.push(hr.sizes[size]);

  const el = solHr({ className: classes.length ? classes.join(' ') : undefined });

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Horizontal Rule component.
 *
 * @category Constants
 */
export const hr = {
  /**
   * Tone modifier classes.
   */
  tones: {
    /**
     * Brand primary tone.
     */
    primary: 'hr-primary',

    /**
     * Brand secondary tone.
     */
    secondary: 'hr-secondary',

    /**
     * Green semantic tone.
     */
    success: 'hr-success',

    /**
     * Cyan informational tone.
     */
    info: 'hr-info',

    /**
     * Amber semantic tone.
     */
    warning: 'hr-warning',

    /**
     * Red semantic tone.
     */
    danger: 'hr-danger',

    /**
     * Dark tone.
     */
    dark: 'hr-dark',
  },

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * 1px border.
     */
    sm: 'hr-sm',

    /**
     * 2px border.
     */
    md: 'hr-md',

    /**
     * 4px border.
     */
    lg: 'hr-lg',
  },
} as const;
