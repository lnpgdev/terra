/**
 * Terra UI Kit: SubNav
 *
 * @remarks
 * A contextual secondary navigation bar that sits flush beneath the main
 * Navbar with no gap. Renders up to two navigation links - one on the left
 * and one on the right - whose content changes per page.
 *
 * Typical use: "← Back to search" on the left, "All members →" on the right.
 * Either slot is optional; the bar collapses gracefully if only one is provided.
 *
 * Usage:
 * ```html
 * <div class="subnav">
 *   <a class="subnav-link" href="/search">&larr; Back to search</a>
 *   <a class="subnav-link" href="/members">All members &rarr;</a>
 * </div>
 * ```
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createSpan } from '@lnpg/sol/elements/container/span';
import { createA } from '@lnpg/sol/elements/inline/a';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A single SubNav link option.
 *
 * @category Interfaces
 */
export interface SubNavOption {
  /**
   * Visible label text.
   */
  label: string;

  /**
   * Link destination.
   */
  href: string;

  /**
   * Optional icon rendered as HTML. Appears before the label on the left link
   * and after the label on the right link.
   *
   * @example '&larr;'
   * @example '<i class="bi bi-arrow-left"></i>'
   */
  icon?: string;
}

/**
 * Options for {@link createSubNav}.
 *
 * @category Interfaces
 */
export interface SubNavOptions {
  /**
   * Left navigation link (e.g. "← Back to search").
   */
  left?: SubNavOption;

  /**
   * Right navigation link (e.g. "All members →").
   */
  right?: SubNavOption;
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a SubNav bar with optional left and right navigation links.
 *
 * @param options - Left and/or right link configuration.
 * @returns An `HTMLElement` (`<div class="subnav">`).
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createSubNav({
 *     left: { label: 'Back to search', href: '/search', icon: '&larr;' },
 *     right: { label: 'All members', href: '/members', icon: '&rarr;' },
 *   })
 * );
 * ```
 */
export function createSubNav(options: SubNavOptions = {}): HTMLElement {
  const { left, right } = options;

  const el = createDiv(undefined, { className: subnav.base });

  if (left) el.appendChild(createSubNavLink(left, 'left'));
  if (right) el.appendChild(createSubNavLink(right, 'right'));

  return el;
}

/**
 * Creates a single SubNav link anchor.
 *
 * For `'left'` links the icon precedes the label; for `'right'` links the
 * icon follows the label.
 *
 * @param option - Link configuration.
 * @param side - Which side of the bar this link occupies.
 * @returns An `HTMLAnchorElement`.
 * @category Factory
 */
export function createSubNavLink(option: SubNavOption, side: 'left' | 'right'): HTMLAnchorElement {
  const { label, href, icon } = option;

  const el = createA(undefined, { className: subnav.link, href });

  if (icon && side === 'left') {
    const iconEl = createSpan(undefined);
    iconEl.innerHTML = icon;
    el.appendChild(iconEl);
  }

  const labelEl = createSpan(label);
  el.appendChild(labelEl);

  if (icon && side === 'right') {
    const iconEl = createSpan(undefined);
    iconEl.innerHTML = icon;
    el.appendChild(iconEl);
  }

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the SubNav component.
 *
 * @category Constants
 */
export const subnav = {
  /**
   * Bar wrapper class.
   */
  base: 'subnav',

  /**
   * Navigation link class.
   */
  link: 'subnav-link',
} as const;
