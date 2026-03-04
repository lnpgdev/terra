/**
 * Terra UI Kit: Breadcrumb
 *
 * @remarks
 * Built on Bootstrap's Breadcrumb. Renders a `<nav>` containing an `<ol>`
 * of breadcrumb items. Items can be links, plain text (active), or disabled.
 *
 * The divider character defaults to `/` and can be overridden via the
 * `divider` option, which sets `--bs-breadcrumb-divider` as an inline style.
 *
 * Usage:
 * ```html
 * <nav aria-label="breadcrumb">
 *   <ol class="breadcrumb">
 *     <li class="breadcrumb-item"><a href="/home">Home</a></li>
 *     <li class="breadcrumb-item"><a href="/settings">Settings</a></li>
 *     <li class="breadcrumb-item active" aria-current="page">Profile</li>
 *   </ol>
 * </nav>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/breadcrumb/
 *
 * @module
 * @category Components
 */

import { createNav } from '@lnpg/sol/elements/layout/nav';
import { createOl } from '@lnpg/sol/elements/list/ol';
import { createLi } from '@lnpg/sol/elements/list/li';
import { createA } from '@lnpg/sol/elements/inline/a';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for a single breadcrumb item. */
export interface BreadcrumbItemOptions {
  /** Visible label text. */
  label: string;
  /** When provided, the item renders as an `<a>` link. */
  href?: string;
  /** Marks the item as the current page. Adds `active` class and `aria-current="page"`. */
  active?: boolean;
  /** Renders the link as visually disabled. Only applies when `href` is also set. */
  disabled?: boolean;
}

/** Options for {@link createBreadcrumb}. */
export interface BreadcrumbOptions {
  /** Breadcrumb items in order from first to last. */
  items: BreadcrumbItemOptions[];
  /**
   * Divider character rendered between items.
   * Sets `--bs-breadcrumb-divider` as an inline style on the `<nav>`.
   * Defaults to Bootstrap's built-in `/`.
   */
  divider?: string;
  /** `aria-label` for the `<nav>` landmark. Defaults to `'breadcrumb'`. */
  label?: string;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured breadcrumb navigation element.
 *
 * @param options - Breadcrumb configuration.
 * @returns A `<nav aria-label="breadcrumb">` containing the item list.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createBreadcrumb({
 *     items: [
 *       { label: 'Home', href: '/' },
 *       { label: 'Members', href: '/members' },
 *       { label: 'Em Yates', active: true },
 *     ],
 *   })
 * );
 * ```
 */
export function createBreadcrumb(options: BreadcrumbOptions): HTMLElement {
  const { items, divider, label = 'breadcrumb' } = options;

  const nav = createNav(undefined, { aria: { label } });
  if (divider !== undefined) {
    nav.style.setProperty('--bs-breadcrumb-divider', `'${divider}'`);
  }

  const ol = createOl({ className: breadcrumb.base });

  for (const item of items) {
    const liClasses: string[] = [breadcrumb.item];
    if (item.active) liClasses.push(breadcrumb.active);

    const li = createLi(undefined, {
      className: liClasses.join(' '),
      ...(item.active ? { attrs: { 'aria-current': 'page' } } : {}),
    });

    if (item.href && !item.active) {
      const a = createA(item.label, {
        href: item.href,
        className: item.disabled ? breadcrumb.disabled : undefined,
        tabIndex: item.disabled ? -1 : undefined,
        attrs: item.disabled ? { 'aria-disabled': 'true' } : undefined,
      });
      li.appendChild(a);
    } else {
      li.textContent = item.label;
    }

    ol.appendChild(li);
  }

  nav.appendChild(ol);
  return nav;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Breadcrumb component. @category Constants */
export const breadcrumb = {
  /** Base breadcrumb list class. */
  base: 'breadcrumb',
  /** Individual breadcrumb item. */
  item: 'breadcrumb-item',
  /** Applied to the current/last item. */
  active: 'active',
  /** Applied to a disabled link within an item. */
  disabled: 'disabled',
} as const;
