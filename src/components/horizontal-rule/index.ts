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

// ─── Types ───────────────────────────────────────────────────────────────────

/** Semantic colour tone for the horizontal rule. */
export type HrTone = 'success' | 'danger' | 'warning' | 'dark';

/** Thickness size for the horizontal rule. */
export type HrSize = 'sm' | 'md' | 'lg';

/** Options for {@link createHr}. */
export interface HrOptions {
  /** Semantic colour tone. Omit for the default muted rule. */
  tone?: HrTone;
  /** Border thickness. Omit for Bootstrap's default. */
  size?: HrSize;
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates a Horizontal Rule element.
 *
 * @param options - Configuration for the horizontal rule.
 * @returns An `<hr>` element ready to be appended to the DOM.
 */
export function createHr(options: HrOptions = {}): HTMLHRElement {
  const { tone, size } = options;

  const el = document.createElement('hr');

  const classes: string[] = [];
  if (tone) classes.push(hr.tones[tone]);
  if (size) classes.push(hr.sizes[size]);
  if (classes.length) el.className = classes.join(' ');

  return el;
}

// ─── Constants ────────────────────────────────────────────────────────────────

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
