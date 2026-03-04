/**
 * Terra UI Kit: Toast
 *
 * @remarks
 * Lightweight, non-blocking notifications built on Bootstrap's Toast plugin.
 * Supports four semantic variants (info, success, warning, danger), a
 * positioning container, autohide with pause-on-hover, and event-delegated
 * triggers.
 *
 * **HTML-authored toasts** are initialised automatically on DOMContentLoaded.
 * Call {@link initToasts} manually after dynamically inserting toast elements.
 *
 * **Trigger buttons** use `data-lnpg-toggle="toast"` + `data-lnpg-target="id"`.
 * **Dismiss buttons** use `data-lnpg-dismiss="toast"` (usually inside the toast).
 *
 * Usage:
 * ```html
 * <!-- Trigger -->
 * <button type="button" data-lnpg-toggle="toast" data-lnpg-target="myToast">
 *   Show toast
 * </button>
 *
 * <!-- Container -->
 * <div class="toast-container p-3" data-lnpg-placement="top-end">
 *   <div class="toast toast-success" id="myToast"
 *        role="status" aria-live="polite" aria-atomic="true"
 *        data-lnpg-autohide="true" data-lnpg-delay="5000">
 *     <div class="toast-header">
 *       <strong class="toast-title me-auto">Saved</strong>
 *       <small class="toast-meta">Just now</small>
 *       <button type="button" class="btn-close" aria-label="Close"
 *               data-lnpg-dismiss="toast"></button>
 *     </div>
 *     <div class="toast-body">Your changes have been saved.</div>
 *   </div>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/toasts/
 *
 * @module
 * @category Components
 */

import BsToast from 'bootstrap/js/dist/toast';

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createStrong } from '@lnpg/sol/elements/inline/strong';
import { createSmall } from '@lnpg/sol/elements/inline/small';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Semantic colour variants available for the Toast component. */
export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

/** Fixed-position placement of a toast container. */
export type ToastPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'top-center'
  | 'bottom-center';

/** Gap between stacked toasts in a container. */
export type ToastGap = 'sm' | 'md' | 'lg';

/** Options for {@link createToast}. */
export interface ToastOptions {
  /** Semantic colour variant. */
  variant?: ToastVariant;
  /** Text content of the toast body. Required. */
  body: string;
  /** Title text shown in the toast header. Omit for a body-only toast. */
  title?: string;
  /** Meta text (e.g. timestamp) shown beside the title. */
  meta?: string;
  /** Auto-dismiss after `delay` ms. Defaults to `true`. */
  autohide?: boolean;
  /** Auto-dismiss delay in milliseconds. Defaults to `5000`. */
  delay?: number;
  /** Enable the fade animation. Defaults to `true`. */
  animation?: boolean;
  /** Include a close button in the header. Defaults to `true`. */
  dismissible?: boolean;
}

/** Options for {@link createToastContainer}. */
export interface ToastContainerOptions {
  /** Fixed-position placement. Defaults to `'top-end'`. */
  placement?: ToastPlacement;
  /** Gap between stacked toasts. Defaults to `'md'`. */
  gap?: ToastGap;
}

// ---------------------------------------------------------------------------
// Internal constants
// ---------------------------------------------------------------------------

const PLACEMENT_CLASSES: Record<ToastPlacement, string[]> = {
  'top-start': ['position-fixed', 'top-0', 'start-0'],
  'top-end': ['position-fixed', 'top-0', 'end-0'],
  'bottom-start': ['position-fixed', 'bottom-0', 'start-0'],
  'bottom-end': ['position-fixed', 'bottom-0', 'end-0'],
  'top-center': ['position-fixed', 'top-0', 'start-50', 'translate-middle-x'],
  'bottom-center': ['position-fixed', 'bottom-0', 'start-50', 'translate-middle-x'],
};

const GAP_CLASSES: Record<ToastGap, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

// ---------------------------------------------------------------------------
// Timer (pause-on-hover autohide)
// ---------------------------------------------------------------------------

interface TimerState {
  remaining: number;
  startedAt: number;
  timerId: ReturnType<typeof setTimeout> | null;
  instance: BsToast;
}

const timerMap = new WeakMap<HTMLElement, TimerState>();
const listenedEls = new WeakSet<HTMLElement>();

function clearTimer(el: HTMLElement): void {
  const state = timerMap.get(el);
  if (!state) return;
  if (state.timerId !== null) clearTimeout(state.timerId);
  timerMap.delete(el);
}

function scheduleHide(el: HTMLElement, ms: number, instance: BsToast): void {
  clearTimer(el);

  const state: TimerState = { remaining: ms, startedAt: Date.now(), timerId: null, instance };
  state.timerId = setTimeout(() => {
    instance.hide();
    timerMap.delete(el);
  }, ms);
  timerMap.set(el, state);

  // Attach pause listeners once per element.
  if (listenedEls.has(el)) return;
  listenedEls.add(el);

  el.addEventListener('mouseenter', () => {
    const s = timerMap.get(el);
    if (!s || s.timerId === null) return;
    s.remaining = Math.max(0, s.remaining - (Date.now() - s.startedAt));
    clearTimeout(s.timerId);
    s.timerId = null;
  });

  el.addEventListener('mouseleave', () => {
    const s = timerMap.get(el);
    if (!s || s.timerId !== null || s.remaining <= 0) return;
    s.startedAt = Date.now();
    s.timerId = setTimeout(() => {
      s.instance.hide();
      timerMap.delete(el);
    }, s.remaining);
  });

  el.addEventListener('focusin', () => {
    const s = timerMap.get(el);
    if (!s || s.timerId === null) return;
    s.remaining = Math.max(0, s.remaining - (Date.now() - s.startedAt));
    clearTimeout(s.timerId);
    s.timerId = null;
  });

  el.addEventListener('focusout', () => {
    const s = timerMap.get(el);
    if (!s || s.timerId !== null || s.remaining <= 0) return;
    s.startedAt = Date.now();
    s.timerId = setTimeout(() => {
      s.instance.hide();
      timerMap.delete(el);
    }, s.remaining);
  });
}

// ---------------------------------------------------------------------------
// Show / hide
// ---------------------------------------------------------------------------

/**
 * Shows a toast using Terra's autohide and pause-on-hover logic.
 * Reads `data-lnpg-autohide`, `data-lnpg-delay`, and `data-lnpg-animation`
 * from the element.
 *
 * @param el - The `.toast` element to show.
 * @category Utility
 */
export function showToast(el: HTMLElement): void {
  const autohide = el.dataset.lnpgAutohide !== 'false';
  const delay = parseInt(el.dataset.lnpgDelay ?? '5000', 10);
  const animation = el.dataset.lnpgAnimation !== 'false';
  const instance = BsToast.getOrCreateInstance(el, { autohide: false, animation });

  instance.show();

  if (autohide) {
    scheduleHide(el, delay, instance);
  }
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

function initContainer(el: HTMLElement): void {
  const raw = el.dataset.lnpgPlacement;
  const placement: ToastPlacement =
    raw && Object.prototype.hasOwnProperty.call(PLACEMENT_CLASSES, raw)
      ? (raw as ToastPlacement)
      : 'top-end';

  const rawGap = el.dataset.lnpgGap;
  const gap: ToastGap = rawGap === 'sm' || rawGap === 'md' || rawGap === 'lg' ? rawGap : 'md';

  el.classList.add(...PLACEMENT_CLASSES[placement]);
  el.classList.add('d-flex', 'flex-column');
  el.classList.add(GAP_CLASSES[gap]);
}

/**
 * Initialises all toast containers and Bootstrap Toast instances on the page.
 * Automatically called on DOMContentLoaded. Call manually after inserting
 * toast elements dynamically.
 *
 * @category Initialiser
 */
export function initToasts(): void {
  document.querySelectorAll<HTMLElement>('[data-lnpg-placement]').forEach(initContainer);

  document.querySelectorAll<HTMLElement>('.toast').forEach((el) => {
    const animation = el.dataset.lnpgAnimation !== 'false';
    BsToast.getOrCreateInstance(el, { autohide: false, animation });
  });
}

// ---------------------------------------------------------------------------
// Event delegation
// ---------------------------------------------------------------------------

function handleToggle(e: Event): void {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  const trigger = target.closest<HTMLElement>('[data-lnpg-toggle="toast"]');
  if (!trigger) return;

  const targetId = trigger.dataset.lnpgTarget;
  if (!targetId) return;

  const toastEl = document.getElementById(targetId);
  if (!toastEl) return;

  showToast(toastEl);
}

function handleDismiss(e: Event): void {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  const trigger = target.closest<HTMLElement>('[data-lnpg-dismiss="toast"]');
  if (!trigger) return;

  const toastEl = trigger.closest<HTMLElement>('.toast');
  if (!toastEl) return;

  clearTimer(toastEl);
  BsToast.getOrCreateInstance(toastEl).hide();
}

// Auto-initialise on page load; set up document-level click delegation.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initToasts();
    document.addEventListener('click', handleToggle);
    document.addEventListener('click', handleDismiss);
  });
} else {
  initToasts();
  document.addEventListener('click', handleToggle);
  document.addEventListener('click', handleDismiss);
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a positioned `.toast-container` element.
 *
 * @param options - Container configuration.
 * @returns A `<div class="toast-container">` ready to append to the DOM.
 * @category Factory
 *
 * @example
 * ```ts
 * const container = createToastContainer({ placement: 'bottom-end' });
 * document.body.appendChild(container);
 * ```
 */
export function createToastContainer(options: ToastContainerOptions = {}): HTMLElement {
  const { placement = 'top-end', gap = 'md' } = options;

  const el = createDiv(undefined, {
    className: 'toast-container p-3',
    dataset: { lnpgPlacement: placement },
  });

  el.classList.add(...PLACEMENT_CLASSES[placement]);
  el.classList.add('d-flex', 'flex-column');
  el.classList.add(GAP_CLASSES[gap]);

  return el;
}

/**
 * Creates a fully structured `.toast` element.
 * Pass the result to {@link showToast} to display it.
 *
 * @param options - Toast configuration.
 * @returns A `<div class="toast">` ready to append to a container.
 * @category Factory
 *
 * @example
 * ```ts
 * const container = createToastContainer({ placement: 'top-end' });
 * document.body.appendChild(container);
 *
 * const t = createToast({ variant: 'success', title: 'Saved', body: 'Changes saved.' });
 * container.appendChild(t);
 * showToast(t);
 * ```
 */
export function createToast(options: ToastOptions): HTMLElement {
  const {
    variant,
    body,
    title,
    meta,
    autohide = true,
    delay = 5000,
    animation = true,
    dismissible = true,
  } = options;

  const classes = ['toast'];
  if (variant) classes.push(`toast-${variant}`);
  const el = createDiv(undefined, {
    className: classes.join(' '),
    attrs: { role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' },
  });

  if (!autohide) el.dataset.lnpgAutohide = 'false';
  if (delay !== 5000) el.dataset.lnpgDelay = String(delay);
  if (!animation) el.dataset.lnpgAnimation = 'false';

  if (title !== undefined || dismissible) {
    const header = createDiv(undefined, { className: 'toast-header' });

    if (title !== undefined) {
      const titleEl = createStrong(title, { className: 'toast-title me-auto' });
      header.appendChild(titleEl);
    }

    if (meta !== undefined) {
      const metaEl = createSmall(meta, { className: 'toast-meta' });
      header.appendChild(metaEl);
    }

    if (dismissible) {
      const btn = createButton(undefined, {
        type: 'button',
        className: 'btn-close',
        aria: { label: 'Close' },
        dataset: { lnpgDismiss: 'toast' },
      });
      header.appendChild(btn);
    }

    el.appendChild(header);
  }

  const bodyEl = createDiv(body, { className: 'toast-body' });
  el.appendChild(bodyEl);

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Toast component. @category Constants */
export const toast = {
  /** Base toast class. */
  base: 'toast',
  /** Header row containing title, meta, and close button. */
  header: 'toast-header',
  /** Content area of the toast. */
  body: 'toast-body',
  /** Title element inside the header. */
  title: 'toast-title',
  /** Meta/timestamp element inside the header. */
  meta: 'toast-meta',
  /** Wrapper that positions and stacks multiple toasts. */
  container: 'toast-container',
  variants: {
    /** Cyan. */
    info: 'toast-info',
    /** Green. */
    success: 'toast-success',
    /** Amber. */
    warning: 'toast-warning',
    /** Red. */
    danger: 'toast-danger',
  },
} as const;
