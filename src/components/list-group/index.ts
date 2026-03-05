/**
 * Terra UI Kit: List Group
 *
 * @remarks
 * Built on Bootstrap's List Group. Square-edged list of related items for
 * navigation, selectable lists, or content grouping.
 *
 * Items render as `<li>` by default. When `href` is provided they render as
 * `<a>` tags and the container switches to a `<div>` (Bootstrap requirement
 * for anchor-based list groups).
 *
 * Usage:
 * ```html
 * <!-- Standard list -->
 * <ul class="list-group">
 *   <li class="list-group-item">Item one</li>
 *   <li class="list-group-item list-group-item-action active" aria-current="true">Active</li>
 *   <li class="list-group-item list-group-item-action disabled" aria-disabled="true">Disabled</li>
 * </ul>
 *
 * <!-- Anchor list -->
 * <div class="list-group">
 *   <a href="#" class="list-group-item list-group-item-action active" aria-current="true">Link</a>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/list-group/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createA } from '@lnpg/sol/elements/inline/a';
import { createLi } from '@lnpg/sol/elements/list/li';
import { createUl } from '@lnpg/sol/elements/list/ul';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Options for a single list group item.
 *
 * @category Interfaces
 */
export interface ListGroupItemOptions {
  /**
   * Visible content text.
   */
  label: string;

  /**
   * When provided, renders the item as an `<a>` element.
   */
  href?: string;

  /**
   * Marks the item as the currently selected/active item.
   */
  active?: boolean;

  /**
   * Makes the item non-interactive.
   */
  disabled?: boolean;

  /**
   * Adds hover and focus interaction styles.
   * Applied automatically when `href` is set.
   */
  action?: boolean;
}

/**
 * Options for {@link createListGroup}.
 *
 * @category Interfaces
 */
export interface ListGroupOptions {
  /**
   * Items to render in the list group.
   */
  items: ListGroupItemOptions[];

  /**
   * Removes outer borders so the list group sits flush inside a card or panel.
   */
  flush?: boolean;

  /**
   * Displays items in a row instead of a column.
   */
  horizontal?: boolean;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured list group element.
 *
 * When any item has an `href`, the container renders as a `<div>` (Bootstrap
 * requirement for anchor-based list groups); otherwise it renders as a `<ul>`.
 *
 * @param options - List group configuration.
 * @returns A `<ul>` or `<div>` list group element.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createListGroup({
 *     items: [
 *       { label: 'Dashboard', href: '/dashboard', active: true },
 *       { label: 'Members', href: '/members' },
 *       { label: 'Reports', href: '/reports', disabled: true },
 *     ],
 *   })
 * );
 * ```
 */
export function createListGroup(options: ListGroupOptions): HTMLElement {
  const { items, flush = false, horizontal = false } = options;

  const hasLinks = items.some((item) => item.href !== undefined);

  const containerClasses: string[] = [listGroup.base];
  if (flush) containerClasses.push(listGroup.flush);
  if (horizontal) containerClasses.push(listGroup.horizontal);

  const container: HTMLElement = hasLinks
    ? createDiv(undefined, { className: containerClasses.join(' ') })
    : createUl(undefined, { className: containerClasses.join(' ') });

  for (const item of items) {
    const isAction = item.action || item.href !== undefined;

    const elClasses: string[] = [listGroup.item];
    if (isAction) elClasses.push(listGroup.action);
    if (item.active) elClasses.push(listGroup.active);
    if (item.disabled) elClasses.push(listGroup.disabled);

    const extraAttrs: Record<string, string> = {};
    if (item.active) extraAttrs['aria-current'] = 'true';
    if (item.disabled) extraAttrs['aria-disabled'] = 'true';

    let el: HTMLElement;

    if (item.href) {
      el = createA(item.label, {
        href: item.href,
        className: elClasses.join(' '),
        attrs: extraAttrs,
      });
    } else {
      el = createLi(item.label, {
        className: elClasses.join(' '),
        attrs: extraAttrs,
      });
    }

    container.appendChild(el);
  }

  return container;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the List Group component.
 *
 * @category Constants
 */
export const listGroup = {
  /**
   * Base list group class.
   */
  base: 'list-group',

  /**
   * Individual list group item.
   */
  item: 'list-group-item',

  /**
   * Adds interactive hover/focus styles to an item.
   */
  action: 'list-group-item-action',

  /**
   * Marks an item as currently active/selected.
   */
  active: 'active',

  /**
   * Marks an item as non-interactive.
   */
  disabled: 'disabled',

  /**
   * Removes outer borders for use inside cards or panels.
   */
  flush: 'list-group-flush',

  /**
   * Displays items in a row.
   */
  horizontal: 'list-group-horizontal',
} as const;
