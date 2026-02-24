/**
 * Terra UI Kit: Horizontal Rule
 *
 * @remarks
 * A semantic divider element with tone and size variants applied via modifier
 * classes on the native `<hr>` element.
 *
 * Usage:
 * ```html
 * <hr />
 * <hr class="hr-success hr-md" />
 * <hr class="hr-danger hr-lg" />
 * ```
 *
 * References:
 * - MDN: `<hr>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
 * - Bootstrap: HR variables: https://getbootstrap.com/docs/5.3/content/typography/#horizontal-rules
 *
 * @module
 * @category Components
 */

/** CSS class references for the Horizontal Rule component. @category Constants */
export const hr = {
  tones: {
    /** Green semantic tone. */
    success: 'hr-success',
    /** Red semantic tone. */
    danger: 'hr-danger',
    /** Amber semantic tone. */
    warning: 'hr-warning',
    /** Dark tone. */
    dark: 'hr-dark',
  },
  sizes: {
    /** 1px border. */
    sm: 'hr-sm',
    /** 2px border. */
    md: 'hr-md',
    /** 4px border. */
    lg: 'hr-lg',
  },
} as const;
