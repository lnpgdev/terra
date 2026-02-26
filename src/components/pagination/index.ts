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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Size variant for the pagination control. */
export type PaginationSize = 'sm' | 'md' | 'lg';

/** Alignment of the pagination list within its container. */
export type PaginationAlign = 'start' | 'center' | 'end';

/** Options for a single pagination item. */
export interface PaginationItemOptions {
  /** Visible label (e.g. `'1'`, `'Next'`, `'…'`). */
  label: string;
  /** When provided, the item renders as an `<a>` link. */
  href?: string;
  /** Marks the item as the currently active page. */
  active?: boolean;
  /** Marks the item as non-interactive (e.g. Previous on page 1, ellipsis). */
  disabled?: boolean;
  /** Sets a `rel` attribute on the link (`'prev'` or `'next'`). */
  rel?: 'prev' | 'next';
}

/** Options for {@link createPagination}. */
export interface PaginationOptions {
  /** Page items to render. */
  items: PaginationItemOptions[];
  /** Size of the pagination control. Defaults to `'md'`. */
  size?: PaginationSize;
  /** Horizontal alignment. Defaults to `'start'`. */
  align?: PaginationAlign;
  /** `aria-label` for the `<nav>` landmark. Defaults to `'Pagination'`. */
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

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', ariaLabel);

  const ul = document.createElement('ul');
  const ulClasses: string[] = [pagination.base];
  if (size !== 'md') ulClasses.push(pagination.sizes[size]);
  if (align !== 'start') ulClasses.push(pagination.align[align]);
  ul.className = ulClasses.join(' ');

  for (const item of items) {
    const li = document.createElement('li');
    const liClasses: string[] = [pagination.item];
    if (item.active) liClasses.push(pagination.active);
    if (item.disabled) liClasses.push(pagination.disabled);
    li.className = liClasses.join(' ');

    if (item.active) {
      li.setAttribute('aria-current', 'page');
    }

    if (item.href) {
      const a = document.createElement('a');
      a.className = pagination.link;
      a.href = item.href;
      a.textContent = item.label;
      if (item.rel) a.setAttribute('rel', item.rel);
      if (item.disabled) {
        a.setAttribute('aria-disabled', 'true');
        a.setAttribute('tabindex', '-1');
      }
      li.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.className = pagination.link;
      span.textContent = item.label;
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

/** CSS class references for the Pagination component. @category Constants */
export const pagination = {
  /** Base pagination list class. */
  base: 'pagination',
  /** Individual page list item. */
  item: 'page-item',
  /** Link or span inside a page item. */
  link: 'page-link',
  /** Applied to the currently active page item. */
  active: 'active',
  /** Applied to non-interactive page items. */
  disabled: 'disabled',
  /** Size modifier classes. */
  sizes: {
    sm: 'pagination-sm',
    lg: 'pagination-lg',
  },
  /** Alignment classes (applied to the `<ul>`). */
  align: {
    center: 'justify-content-center',
    end: 'justify-content-end',
  },
} as const;
