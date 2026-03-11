/**
 * Terra UI Kit: Pagination
 *
 * @remarks
 * Built on Bootstrap's Pagination. Renders a `<nav>` containing a `<ul>`
 * of page items. Supports previous/next controls, active and disabled states,
 * ellipsis items, size variants, and alignment.
 *
 * Usage:
 * ```html
 * <nav aria-label="Pagination">
 *   <ul class="pagination justify-content-center">
 *     <li class="page-item disabled">
 *       <a class="page-link" href="#" aria-disabled="true" tabindex="-1" rel="prev">Previous</a>
 *     </li>
 *     <li class="page-item active" aria-current="page">
 *       <a class="page-link" href="#">1</a>
 *     </li>
 *     <li class="page-item"><a class="page-link" href="#">2</a></li>
 *     <li class="page-item"><a class="page-link" href="#" rel="next">Next</a></li>
 *   </ul>
 * </nav>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/pagination/
 *
 * @module
 * @category Components
 */

import { createSpan } from '@lnpg/sol/elements/container/span';
import { createA } from '@lnpg/sol/elements/inline/a';
import { createNav } from '@lnpg/sol/elements/layout/nav';
import { createLi } from '@lnpg/sol/elements/list/li';
import { createUl } from '@lnpg/sol/elements/list/ul';
import type { ComponentSize } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Size variant for the pagination control.
 *
 * @remarks
 * `'sm'`: compact size.
 * `'md'`: default Bootstrap size (no modifier class).
 * `'lg'`: large size.
 *
 * @category Attributes
 */
export type PaginationSize = ComponentSize;

/**
 * Alignment of the pagination list within its container.
 *
 * @remarks
 * `'start'`: left-aligned (default).
 * `'center'`: centred.
 * `'end'`: right-aligned.
 *
 * @category Attributes
 */
export type PaginationAlign = 'start' | 'center' | 'end';

/**
 * Options for a single pagination item.
 *
 * @category Interfaces
 */
export interface PaginationItemOptions {
  /**
   * Visible label (e.g. `'1'`, `'Next'`, `'...'`).
   */
  label: string;

  /**
   * When provided, the item renders as an `<a>` link.
   */
  href?: string;

  /**
   * Marks the item as the currently active page.
   */
  active?: boolean;

  /**
   * Marks the item as non-interactive (e.g. Previous on page 1, ellipsis).
   */
  disabled?: boolean;

  /**
   * Sets a `rel` attribute on the link (`'prev'` or `'next'`).
   */
  rel?: 'prev' | 'next';
}

/**
 * Options for {@link createPagination}.
 *
 * @category Interfaces
 */
export interface PaginationOptions {
  /**
   * Page items to render.
   */
  items: PaginationItemOptions[];

  /**
   * Size of the pagination control. Defaults to `'md'`.
   */
  size?: PaginationSize;

  /**
   * Horizontal alignment. Defaults to `'start'`.
   */
  align?: PaginationAlign;

  /**
   * `aria-label` for the `<nav>` landmark. Defaults to `'Pagination'`.
   */
  ariaLabel?: string;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured pagination navigation element.
 *
 * @param options - Pagination configuration.
 * @returns A `<nav>` containing a `<ul class="pagination">`.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createPagination({
 *     align: 'center',
 *     items: [
 *       { label: 'Previous', href: '#', disabled: true, rel: 'prev' },
 *       { label: '1', href: '#', active: true },
 *       { label: '2', href: '#' },
 *       { label: '3', href: '#' },
 *       { label: 'Next', href: '#', rel: 'next' },
 *     ],
 *   })
 * );
 * ```
 */
export function createPagination(options: PaginationOptions): HTMLElement {
  const { items, size = 'md', align = 'start', ariaLabel = 'Pagination' } = options;

  const nav = createNav(undefined, { attrs: { 'aria-label': ariaLabel } });

  const ulClasses: string[] = [pagination.base];
  if (size !== 'md') ulClasses.push(pagination.sizes[size]);
  if (align !== 'start') ulClasses.push(pagination.align[align]);
  const ul = createUl(undefined, { className: ulClasses.join(' ') });

  for (const item of items) {
    const liClasses: string[] = [pagination.item];
    if (item.active) liClasses.push(pagination.active);
    if (item.disabled) liClasses.push(pagination.disabled);

    const li = createLi(undefined, {
      className: liClasses.join(' '),
      attrs: item.active ? { 'aria-current': 'page' } : undefined,
    });

    if (item.href) {
      const linkAttrs: Record<string, string> = {};
      if (item.rel) linkAttrs.rel = item.rel;
      if (item.disabled) {
        linkAttrs['aria-disabled'] = 'true';
        linkAttrs.tabindex = '-1';
      }
      const a = createA(item.label, {
        className: pagination.link,
        href: item.href,
        attrs: linkAttrs,
      });
      li.appendChild(a);
    } else {
      const span = createSpan(item.label, { className: pagination.link });
      li.appendChild(span);
    }

    ul.appendChild(li);
  }

  nav.appendChild(ul);
  return nav;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Pagination component.
 *
 * @category Constants
 */
export const pagination = {
  /**
   * Base pagination list class.
   */
  base: 'pagination',

  /**
   * Individual page list item.
   */
  item: 'page-item',

  /**
   * Link or span inside a page item.
   */
  link: 'page-link',

  /**
   * Applied to the currently active page item.
   */
  active: 'active',

  /**
   * Applied to non-interactive page items.
   */
  disabled: 'disabled',

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * Compact size.
     */
    sm: 'pagination-sm',

    /**
     * Large size.
     */
    lg: 'pagination-lg',
  },

  /**
   * Alignment classes (applied to the `<ul>`).
   */
  align: {
    /**
     * Centred.
     */
    center: 'justify-content-center',

    /**
     * Right-aligned.
     */
    end: 'justify-content-end',
  },
} as const;
