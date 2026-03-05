/**
 * Terra UI Kit: Alert
 *
 * @remarks
 * Contextual feedback messages for user actions. Supports semantic colour
 * variants, an optional dismissible mode using the Close Button component,
 * and an auto-dismiss timeout.
 *
 * Alerts should always include a short description followed by a "Read more."
 * link (`.alert-link`) that opens a Modal with the full detail.
 *
 * Usage:
 * ```ts
 * import { createAlert } from '@lnpg/terra/components/alert';
 *
 * const el = createAlert({
 *   variant: 'success',
 *   message: 'Operation successful.',
 *   href: '#details-modal',
 *   timeout: 5000,
 * });
 *
 * document.body.appendChild(el);
 * ```
 *
 * References:
 * - Bootstrap: Alerts: https://getbootstrap.com/docs/5.3/components/alerts/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createA } from '@lnpg/sol/elements/inline/a';
import BsAlert from 'bootstrap/js/dist/alert';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Semantic colour variants available for the Alert component.
 *
 * @remarks
 * `'primary'`: blue.
 * `'secondary'`: grey.
 * `'success'`: green.
 * `'danger'`: red.
 * `'warning'`: amber.
 * `'info'`: cyan.
 * `'light'`: light background.
 * `'dark'`: dark background.
 *
 * @category Attributes
 */
export type AlertVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

/**
 * Options for {@link createAlert}.
 *
 * @category Interfaces
 */
export interface AlertOptions {
  /**
   * Semantic colour variant.
   */
  variant: AlertVariant;

  /**
   * Short description displayed in the alert body.
   */
  message: string;

  /**
   * URL opened by the "Read more." link - typically a modal anchor.
   */
  href: string;

  /**
   * Auto-dismiss delay in milliseconds. Omit to disable auto-dismiss.
   */
  timeout?: number;

  /**
   * Show a manual close button. Defaults to `false`.
   */
  dismissible?: boolean;

  /**
   * Show a per-variant border. Defaults to `false`.
   */
  bordered?: boolean;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

function initAlert(el: HTMLElement): void {
  const ms = parseInt(el.dataset.lnpgTimeout ?? '0', 10);
  if (ms <= 0) return;

  const timer = setTimeout(() => {
    BsAlert.getOrCreateInstance(el).close();
  }, ms);

  // Cancel the timer if the alert is manually dismissed before the timeout fires.
  el.addEventListener('close.bs.alert', () => clearTimeout(timer), { once: true });
}

/**
 * Initialises auto-dismiss on all `.alert[data-lnpg-timeout]` elements in the
 * document. Reads the `data-lnpg-timeout` attribute (ms) and schedules a
 * Bootstrap Alert close after that delay.
 *
 * Runs automatically on `DOMContentLoaded`. Call manually after dynamically
 * inserting alert elements into the DOM.
 *
 * @category Initialiser
 */
export function initAlerts(): void {
  document.querySelectorAll<HTMLElement>('.alert[data-lnpg-timeout]').forEach(initAlert);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initAlerts());
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured Alert element.
 *
 * @param options - Configuration for the alert.
 * @returns A `<div>` element ready to be appended to the DOM.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createAlert({
 *     variant: 'success',
 *     message: 'Record saved.',
 *     href: '#details-modal',
 *     timeout: 5000,
 *   })
 * );
 * ```
 */
export function createAlert(options: AlertOptions): HTMLElement {
  const { variant, message, href, timeout, dismissible = false, bordered = false } = options;

  const classes: string[] = [alert.base, alert.variants[variant]];
  if (dismissible) classes.push(alert.dismissible);
  if (bordered) classes.push(alert.bordered);

  const el = createDiv(undefined, {
    className: classes.join(' '),
    role: 'alert',
  });

  el.appendChild(document.createTextNode(message));

  const link = createA('Read more.', { href, className: alert.link });
  el.appendChild(link);

  if (dismissible) {
    const btn = createButton(undefined, {
      type: 'button',
      className: 'btn-close',
      aria: { label: 'Close' },
      dataset: { bsDismiss: 'alert' },
    });
    el.appendChild(btn);
  }

  if (timeout && timeout > 0) {
    const timer = setTimeout(() => {
      BsAlert.getOrCreateInstance(el).close();
    }, timeout);
    el.addEventListener('close.bs.alert', () => clearTimeout(timer), { once: true });
  }

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Alert component.
 *
 * @category Constants
 */
export const alert = {
  /**
   * Base alert class.
   */
  base: 'alert',

  /**
   * Apply to heading elements inside an alert.
   */
  heading: 'alert-heading',

  /**
   * Apply to `<a>` elements inside an alert for matching colour.
   */
  link: 'alert-link',

  /**
   * Adds right padding to accommodate a `.btn-close` element.
   */
  dismissible: 'alert-dismissible',

  /**
   * Re-enables the per-variant border (off by default).
   */
  bordered: 'alert-bordered',

  /**
   * Variant modifier classes.
   */
  variants: {
    /**
     * Blue.
     */
    primary: 'alert-primary',

    /**
     * Grey.
     */
    secondary: 'alert-secondary',

    /**
     * Green.
     */
    success: 'alert-success',

    /**
     * Red.
     */
    danger: 'alert-danger',

    /**
     * Amber.
     */
    warning: 'alert-warning',

    /**
     * Cyan.
     */
    info: 'alert-info',

    /**
     * Light.
     */
    light: 'alert-light',

    /**
     * Dark.
     */
    dark: 'alert-dark',
  },
} as const;
