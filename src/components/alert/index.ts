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

import BsAlert from 'bootstrap/js/dist/alert';

// ─── Types ───────────────────────────────────────────────────────────────────

/** Semantic colour variants available for the Alert component. */
export type AlertVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

/** Options for {@link createAlert}. */
export interface AlertOptions {
  /** Semantic colour variant. */
  variant: AlertVariant;
  /** Short description displayed in the alert body. */
  message: string;
  /** URL opened by the "Read more." link — typically a modal anchor. */
  href: string;
  /** Auto-dismiss delay in milliseconds. Omit to disable auto-dismiss. */
  timeout?: number;
  /** Show a manual close button. Defaults to `false`. */
  dismissible?: boolean;
  /** Show a per-variant border. Defaults to `false`. */
  bordered?: boolean;
}

// ─── Initialiser (for HTML-authored alerts) ───────────────────────────────────

function initAlert(el: HTMLElement): void {
  const ms = parseInt(el.dataset.lnpgTimeout ?? '0', 10);
  if (ms <= 0) return;

  const timer = setTimeout(() => {
    BsAlert.getOrCreateInstance(el).close();
  }, ms);

  // Cancel the timer if the alert is manually dismissed before the timeout fires.
  el.addEventListener('close.bs.alert', () => clearTimeout(timer), { once: true });
}

function initAlerts(): void {
  document.querySelectorAll<HTMLElement>('.alert[data-lnpg-timeout]').forEach(initAlert);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAlerts);
} else {
  initAlerts();
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates a fully structured Alert element.
 *
 * @param options - Configuration for the alert.
 * @returns A `<div>` element ready to be appended to the DOM.
 */
export function createAlert(options: AlertOptions): HTMLElement {
  const { variant, message, href, timeout, dismissible = false, bordered = false } = options;

  const el = document.createElement('div');

  const classes = ['alert', `alert-${variant}`];
  if (dismissible) classes.push('alert-dismissible');
  if (bordered) classes.push('alert-bordered');
  el.className = classes.join(' ');
  el.setAttribute('role', 'alert');

  el.appendChild(document.createTextNode(message));

  const link = document.createElement('a');
  link.href = href;
  link.className = 'alert-link';
  link.textContent = 'Read more.';
  el.appendChild(link);

  if (dismissible) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-close';
    btn.setAttribute('data-bs-dismiss', 'alert');
    btn.setAttribute('aria-label', 'Close');
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

// ─── Constants ────────────────────────────────────────────────────────────────

/** CSS class references for the Alert component. @category Constants */
export const alert = {
  /** Base alert class. */
  base: 'alert',
  /** Apply to heading elements inside an alert. */
  heading: 'alert-heading',
  /** Apply to `<a>` elements inside an alert for matching colour. */
  link: 'alert-link',
  /** Adds right padding to accommodate a `.btn-close` element. */
  dismissible: 'alert-dismissible',
  /** Re-enables the per-variant border (off by default). */
  bordered: 'alert-bordered',
  variants: {
    /** Blue. */
    primary: 'alert-primary',
    /** Grey. */
    secondary: 'alert-secondary',
    /** Green. */
    success: 'alert-success',
    /** Red. */
    danger: 'alert-danger',
    /** Amber. */
    warning: 'alert-warning',
    /** Cyan. */
    info: 'alert-info',
    /** Light. */
    light: 'alert-light',
    /** Dark. */
    dark: 'alert-dark',
  },
} as const;
