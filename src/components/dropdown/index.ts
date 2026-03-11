/**
 * Terra UI Kit: Dropdown
 *
 * @remarks
 * Wraps Bootstrap's Dropdown plugin. Supports four opening directions,
 * optional hover-open behaviour, icon and label toggle buttons, anchor
 * and button items, dividers, and active/disabled item states.
 *
 * Usage:
 * ```html
 * <div class="dropdown">
 *   <button type="button" class="btn btn-success dropdown-toggle"
 *           data-bs-toggle="dropdown" aria-expanded="false">
 *     Actions
 *   </button>
 *   <ul class="dropdown-menu">
 *     <li><button type="button" class="dropdown-item">Edit</button></li>
 *     <li><hr class="dropdown-divider" /></li>
 *     <li><button type="button" class="dropdown-item text-danger">Delete</button></li>
 *   </ul>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/dropdowns/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createA } from '@lnpg/sol/elements/inline/a';
import { createI } from '@lnpg/sol/elements/inline/i';
import { createLi } from '@lnpg/sol/elements/list/li';
import { createUl } from '@lnpg/sol/elements/list/ul';
import { createHr } from '@lnpg/sol/elements/text/hr';
import BsDropdown from 'bootstrap/js/dist/dropdown';
import type { Tone } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Direction the dropdown menu opens relative to its toggle.
 *
 * @remarks
 * `'down'`: opens below (default).
 * `'up'`: opens above.
 * `'right'`: opens to the right.
 * `'left'`: opens to the left.
 *
 * @category Attributes
 */
export type DropdownDirection = 'down' | 'up' | 'right' | 'left';

/**
 * Whether a dropdown item renders as an anchor or a button.
 *
 * @remarks
 * `'anchor'`: renders as an `<a>` element.
 * `'button'`: renders as a `<button>` element (default).
 *
 * @category Attributes
 */
export type DropdownItemType = 'anchor' | 'button';

/**
 * Visual variant of the toggle button.
 *
 * @remarks
 * `'solid'`: filled background.
 * `'outline'`: transparent background with a coloured border.
 * `'link'`: text link style with no border or background.
 *
 * @category Attributes
 */
export type DropdownVariant = 'solid' | 'outline' | 'link';

/**
 * Colour tone of the toggle button.
 *
 * @remarks
 * `'success'`: green.
 * `'warning'`: amber.
 * `'danger'`: red.
 *
 * @category Attributes
 */
export type DropdownTone = Tone;

/**
 * Options for a single item inside a dropdown menu.
 *
 * @category Interfaces
 */
export interface DropdownItemOptions {
  /**
   * Display text.
   */
  label: string;

  /**
   * Render as an anchor or a button. Defaults to `'button'`.
   */
  type?: DropdownItemType;

  /**
   * `href` for anchor items.
   */
  href?: string;

  /**
   * Marks the item as the current selection.
   */
  active?: boolean;

  /**
   * Prevents interaction.
   */
  disabled?: boolean;

  /**
   * Inserts a divider rule above this item.
   */
  dividerBefore?: boolean;
}

/**
 * Options for {@link createDropdown}.
 *
 * @category Interfaces
 */
export interface DropdownOptions {
  /**
   * Menu items.
   */
  items: DropdownItemOptions[];

  /**
   * CSS class string for a leading icon inside the toggle button.
   */
  icon?: string;

  /**
   * Label text shown in the toggle button alongside or instead of the icon.
   */
  label?: string;

  /**
   * Direction the menu opens. Defaults to `'down'`.
   */
  direction?: DropdownDirection;

  /**
   * Open the menu on hover in addition to click. Defaults to `false`.
   */
  hover?: boolean;

  /**
   * Visual style of the toggle button. Defaults to `'solid'`.
   */
  variant?: DropdownVariant;

  /**
   * Colour tone of the toggle button.
   */
  tone?: DropdownTone;
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

const DIRECTION_CLASS: Record<DropdownDirection, string> = {
  down: 'dropdown',
  up: 'dropup',
  right: 'dropend',
  left: 'dropstart',
};

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Initialises Bootstrap Dropdown instances on all `[data-bs-toggle="dropdown"]`
 * elements. Automatically called on DOMContentLoaded.
 *
 * @category Initialiser
 */
export function initDropdowns(): void {
  document.querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"]').forEach((el) => {
    BsDropdown.getOrCreateInstance(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDropdowns);
} else {
  initDropdowns();
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured dropdown element.
 *
 * @param options - Dropdown configuration.
 * @returns A wrapper `<div>` containing the toggle button and menu.
 * @category Factory
 *
 * @example
 * ```ts
 * const el = createDropdown({
 *   label: 'Actions',
 *   tone: 'success',
 *   items: [
 *     { label: 'Edit', type: 'button' },
 *     { label: 'Delete', type: 'button', dividerBefore: true },
 *   ],
 * });
 * document.body.appendChild(el);
 * ```
 */
export function createDropdown(options: DropdownOptions): HTMLElement {
  const {
    items,
    icon,
    label,
    direction = 'down',
    hover = false,
    variant = 'solid',
    tone,
  } = options;

  // Wrapper
  const wrapper = createDiv(undefined, { className: DIRECTION_CLASS[direction] });

  // Toggle button classes
  const btnClasses = ['btn', 'dropdown-toggle'];
  if (variant === 'link') {
    btnClasses.push('btn-link');
  } else if (tone) {
    btnClasses.push(variant === 'outline' ? `btn-outline-${tone}` : `btn-${tone}`);
  }

  // Toggle button
  const toggle = createButton(undefined, {
    type: 'button',
    className: btnClasses.join(' '),
    dataset: { bsToggle: 'dropdown' },
    attrs: { 'aria-expanded': 'false' },
  });

  if (icon) {
    const iconEl = createI(undefined, { className: icon });
    toggle.appendChild(iconEl);
  }

  if (label) {
    toggle.appendChild(document.createTextNode(icon ? ` ${label}` : label));
  } else if (!icon) {
    toggle.setAttribute('aria-label', 'Open menu');
  }

  wrapper.appendChild(toggle);

  // Menu
  const menu = createUl(undefined, { className: 'dropdown-menu' });

  for (const item of items) {
    if (item.dividerBefore) {
      const dividerLi = createLi();
      const hr = createHr({ className: 'dropdown-divider' });
      dividerLi.appendChild(hr);
      menu.appendChild(dividerLi);
    }

    const li = createLi();
    const itemEl: HTMLAnchorElement | HTMLButtonElement =
      item.type === 'anchor'
        ? createA(item.label, { className: 'dropdown-item', href: item.href ?? '#' })
        : createButton(item.label, { type: 'button', className: 'dropdown-item' });

    if (item.active) itemEl.classList.add('active');
    if (item.disabled) {
      itemEl.classList.add('disabled');
      itemEl.setAttribute('aria-disabled', 'true');
    }

    li.appendChild(itemEl);
    menu.appendChild(li);
  }

  wrapper.appendChild(menu);

  // Hover-open
  if (hover) {
    wrapper.addEventListener('mouseenter', () => {
      BsDropdown.getOrCreateInstance(toggle).show();
    });
    wrapper.addEventListener('mouseleave', () => {
      BsDropdown.getOrCreateInstance(toggle).hide();
    });
  }

  return wrapper;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Dropdown component.
 *
 * @category Constants
 */
export const dropdown = {
  /**
   * Base wrapper class (opens downward).
   */
  base: 'dropdown',

  /**
   * Wrapper class variants by direction.
   */
  directions: {
    /**
     * Opens below.
     */
    down: 'dropdown',

    /**
     * Opens above.
     */
    up: 'dropup',

    /**
     * Opens to the right.
     */
    right: 'dropend',

    /**
     * Opens to the left.
     */
    left: 'dropstart',
  },

  /**
   * Applied to the toggle button.
   */
  toggle: 'dropdown-toggle',

  /**
   * The floating menu container.
   */
  menu: 'dropdown-menu',

  /**
   * Applied to each menu item (anchor or button).
   */
  item: 'dropdown-item',

  /**
   * Horizontal rule separating item groups.
   */
  divider: 'dropdown-divider',
} as const;
