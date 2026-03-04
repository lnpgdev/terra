/**
 * Terra UI Kit: Select
 *
 * @remarks
 * Built on Bootstrap's `.form-select`. Renders a native `<select>` with
 * Bootstrap styling, square corners, optional sizing, and a flush variant
 * for borderless use inside cards or panels.
 *
 * Usage:
 * ```html
 * <select class="form-select">
 *   <option value="">Choose...</option>
 *   <option value="sales">Sales</option>
 *   <option value="support">Support</option>
 * </select>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/forms/select/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createSelect as createSolSelect } from '@lnpg/sol/elements/form/select';
import { createOption } from '@lnpg/sol/elements/form/option';
import { createLabel as createSolLabel } from '@lnpg/sol/elements/form/label';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single option within a select. */
export interface SelectOption {
  /** Submitted value. */
  value: string;
  /** Visible label text. */
  label: string;
  /** Prevents the option from being selected. */
  disabled?: boolean;
}

/** Size of the select control. */
export type SelectSize = 'sm' | 'md' | 'lg';

/** Options for {@link createSelect}. */
export interface SelectOptions {
  /** The list of options to render. */
  options: SelectOption[];
  /** Initially selected value. Defaults to the first option. */
  value?: string;
  /** Size of the control. Defaults to `'md'`. */
  size?: SelectSize;
  /** Allows multiple selections. Defaults to `false`. */
  multiple?: boolean;
  /** Disables the control. Defaults to `false`. */
  disabled?: boolean;
  /**
   * Visible label text. Rendered as a `<label>` when provided.
   * Either `label` or `ariaLabel` should be set.
   */
  label?: string;
  /** `aria-label` applied to the `<select>` when no visible label is shown. */
  ariaLabel?: string;
  /** Called when the selected value changes. */
  onChange?: (value: string) => void;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a styled select control.
 *
 * When `label` is provided the function returns a `<div>` wrapper containing
 * a `<label>` and the `<select>`; otherwise it returns the `<select>` directly.
 *
 * @param options - Select configuration.
 * @returns A `<select>` or a `<div>` wrapper with label.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createSelect({
 *     label: 'Queue',
 *     options: [
 *       { value: 'sales', label: 'Sales' },
 *       { value: 'support', label: 'Support' },
 *       { value: 'billing', label: 'Billing' },
 *     ],
 *     value: 'sales',
 *     onChange: (v) => console.log('Selected:', v),
 *   })
 * );
 * ```
 */
export function createSelect(options: SelectOptions): HTMLElement {
  const {
    options: items,
    value,
    size = 'md',
    multiple = false,
    disabled = false,
    label,
    ariaLabel,
    onChange,
  } = options;

  const classes: string[] = [select.base];
  if (size !== 'md') classes.push(select.sizes[size]);

  const selectEl = createSolSelect({
    className: classes.join(' '),
    multiple: multiple || undefined,
    disabled: disabled || undefined,
    aria: ariaLabel && !label ? { label: ariaLabel } : undefined,
  });

  for (const item of items) {
    const opt = createOption(item.label, {
      value: item.value,
      disabled: item.disabled || undefined,
      selected: (value !== undefined && item.value === value) || undefined,
    });
    selectEl.appendChild(opt);
  }

  if (onChange) {
    selectEl.addEventListener('change', () => {
      onChange(selectEl.value);
    });
  }

  if (label) {
    const wrapper = createDiv();
    const id = `select-${Math.random().toString(36).slice(2, 9)}`;
    selectEl.id = id;

    const labelEl = createSolLabel(label, {
      htmlFor: id,
      className: 'form-label',
    });

    wrapper.appendChild(labelEl);
    wrapper.appendChild(selectEl);
    return wrapper;
  }

  return selectEl;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Select component. @category Constants */
export const select = {
  /** Base select class. */
  base: 'form-select',
  /** Size modifier classes. */
  sizes: {
    sm: 'form-select-sm',
    lg: 'form-select-lg',
  },
} as const;
