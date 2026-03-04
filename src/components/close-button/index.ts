/**
 * Terra UI Kit: Close Button
 *
 * @remarks
 * A dismiss button that renders an × icon. Typically used to close modals,
 * alerts, toasts, and other dismissible components.
 *
 * Usage:
 * ```ts
 * import { createCloseButton } from '@lnpg/terra/components/close-button';
 *
 * const btn = createCloseButton({ onClick: () => modal.hide() });
 * document.body.appendChild(btn);
 * ```
 *
 * References:
 * - Bootstrap: Close button: https://getbootstrap.com/docs/5.3/components/close-button/
 * - MDN: `<button>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 *
 * @module
 * @category Components
 */

import { createButton } from '@lnpg/sol/elements/form/button';

// ─── Types ───────────────────────────────────────────────────────────────────

/** Options for {@link createCloseButton}. */
export interface CloseButtonOptions {
  /** White variant for use on dark backgrounds. Defaults to `false`. */
  white?: boolean;
  /** Renders the button in a disabled state. Defaults to `false`. */
  disabled?: boolean;
  /** Accessible label. Defaults to `'Close'`. */
  label?: string;
  /** Click handler attached to the button. */
  onClick?: (event: MouseEvent) => void;
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates a Close Button element.
 *
 * @param options - Configuration for the close button.
 * @returns A `<button>` element ready to be appended to the DOM.
 */
export function createCloseButton(options: CloseButtonOptions = {}): HTMLButtonElement {
  const { white = false, disabled = false, label = 'Close', onClick } = options;

  const btn = createButton(undefined, {
    type: 'button',
    className: white ? `${closeButton.base} ${closeButton.white}` : closeButton.base,
    aria: { label },
    disabled: disabled || undefined,
  });

  if (onClick) btn.addEventListener('click', onClick);

  return btn;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** CSS class references for the Close Button component. @category Constants */
export const closeButton = {
  /** Base close button with × icon. */
  base: 'btn-close',
  /** White variant for use on dark backgrounds. */
  white: 'btn-close-white',
} as const;
