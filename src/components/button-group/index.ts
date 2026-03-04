/**
 * Terra UI Kit: Button Group
 *
 * @remarks
 * Groups multiple buttons into a horizontal or vertical toolbar.
 * Supports solid, outline, and link variants across success, warning, and
 * danger tones, with sm/md/lg size modifiers.
 *
 * Usage:
 * ```html
 * <!-- Horizontal solid group -->
 * <div class="btn-group" role="group" aria-label="Actions">
 *   <button type="button" class="btn btn-success">Save</button>
 *   <button type="button" class="btn btn-warning">Edit</button>
 *   <button type="button" class="btn btn-danger">Delete</button>
 * </div>
 *
 * <!-- Vertical outline group -->
 * <div class="btn-group-vertical" role="group" aria-label="Options">
 *   <button type="button" class="btn btn-outline-success">Option 1</button>
 *   <button type="button" class="btn btn-outline-danger">Option 2</button>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/button-group/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createButton } from '@lnpg/sol/elements/form/button';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Layout direction of the button group. */
export type ButtonGroupDirection = 'horizontal' | 'vertical';

/** Visual style of each button in the group. */
export type ButtonGroupVariant = 'solid' | 'outline' | 'link';

/**
 * Colour tone. Required for solid and outline variants;
 * ignored for link.
 */
export type ButtonGroupTone = 'success' | 'warning' | 'danger';

/** Size modifier for the button group and its buttons. */
export type ButtonGroupSize = 'sm' | 'md' | 'lg';

/** Options for a single button within a {@link ButtonGroupOptions}. */
export interface ButtonGroupItemOptions {
  /** Button label text. */
  label: string;
  /** Whether the button is disabled. Defaults to `false`. */
  disabled?: boolean;
}

/** Options for {@link createButtonGroup}. */
export interface ButtonGroupOptions {
  /** Array of button descriptors to render inside the group. */
  buttons: ButtonGroupItemOptions[];
  /** Layout direction. Defaults to `'horizontal'`. */
  direction?: ButtonGroupDirection;
  /** Size modifier. Defaults to `'md'` (no size class). */
  size?: ButtonGroupSize;
  /** Visual style for every button in the group. Defaults to `'solid'`. */
  variant?: ButtonGroupVariant;
  /**
   * Colour tone. Required for solid and outline variants;
   * ignored for link.
   */
  tone?: ButtonGroupTone;
  /** `aria-label` for the group element. Defaults to `'Button group'`. */
  ariaLabel?: string;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a Terra button group element.
 *
 * @param options - Configuration options for the button group.
 * @returns A configured `HTMLElement` (a `<div role="group">`).
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createButtonGroup({
 *     buttons: [{ label: 'Save' }, { label: 'Delete' }],
 *     variant: 'solid',
 *     tone: 'success',
 *   })
 * );
 * ```
 */
export function createButtonGroup(options: ButtonGroupOptions): HTMLElement {
  const {
    buttons,
    direction = 'horizontal',
    size,
    variant = 'solid',
    tone,
    ariaLabel = 'Button group',
  } = options;

  const groupClasses: string[] = [
    direction === 'vertical' ? buttonGroup.vertical : buttonGroup.base,
  ];

  if (size === 'sm') groupClasses.push(buttonGroup.sizes.sm);
  else if (size === 'lg') groupClasses.push(buttonGroup.sizes.lg);

  const group = createDiv(undefined, {
    role: 'group',
    aria: { label: ariaLabel },
    className: groupClasses.join(' '),
  });

  for (const item of buttons) {
    const btnClasses: string[] = ['btn'];

    if (variant === 'link') {
      btnClasses.push('btn-link');
    } else if (tone) {
      btnClasses.push(variant === 'outline' ? `btn-outline-${tone}` : `btn-${tone}`);
    }

    if (size === 'sm') btnClasses.push('btn-sm');
    else if (size === 'lg') btnClasses.push('btn-lg');

    const btn = createButton(item.label, {
      type: 'button',
      className: btnClasses.join(' '),
      disabled: item.disabled || undefined,
    });

    group.appendChild(btn);
  }

  return group;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Button Group component. @category Constants */
export const buttonGroup = {
  /** Base horizontal group class. */
  base: 'btn-group',
  /** Vertical group class. */
  vertical: 'btn-group-vertical',
  /** Size modifier classes applied to the group wrapper. */
  sizes: { sm: 'btn-group-sm', lg: 'btn-group-lg' },
} as const;
