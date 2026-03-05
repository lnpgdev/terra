/**
 * Terra UI Kit: Tab
 *
 * @remarks
 * Wraps Bootstrap's Tab plugin. Provides factories for a nav tab list
 * and a matching tab-content panel container, plus an initialiser that
 * auto-runs on DOMContentLoaded.
 *
 * Call {@link initTabs} manually after dynamically inserting
 * tab-enabled elements into the DOM.
 *
 * Usage:
 * ```html
 * <ul class="nav nav-tabs" role="tablist">
 *   <li class="nav-item" role="presentation">
 *     <button
 *       type="button"
 *       class="nav-link active"
 *       data-bs-toggle="tab"
 *       data-bs-target="#tab-one"
 *       aria-controls="tab-one"
 *       aria-selected="true"
 *     >One</button>
 *   </li>
 * </ul>
 * <div class="tab-content">
 *   <div class="tab-pane fade show active" id="tab-one" role="tabpanel" tabindex="0">...</div>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/navs-tabs/
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
import BsTab from 'bootstrap/js/dist/tab';

import { createBadge, type BadgeOptions } from '../badge/index';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Visual style of the nav.
 *
 * @remarks
 * `'tabs'`: Bootstrap tab borders (default).
 * `'pills'`: pill-shaped nav items.
 * `'underline'`: underline indicator.
 *
 * @category Attributes
 */
export type TabVariant = 'tabs' | 'pills' | 'underline';

/**
 * Horizontal alignment of the nav.
 *
 * @remarks
 * `'start'`: left-aligned (default).
 * `'centre'`: centred.
 * `'end'`: right-aligned.
 * `'spread'`: items fill available width.
 *
 * @category Attributes
 */
export type TabAlign = 'start' | 'centre' | 'end' | 'spread';

/**
 * Size modifier for the nav.
 *
 * @remarks
 * `'sm'`: compact.
 * `'md'`: default (no modifier class).
 * `'lg'`: large.
 *
 * @category Attributes
 */
export type TabSize = 'sm' | 'md' | 'lg';

/**
 * Interaction mode.
 *
 * @remarks
 * `'panels'`: each item is a `<button>` that toggles a tab-pane (default).
 * `'links'`: each item is an `<a>` navigating to `href`.
 *
 * @category Attributes
 */
export type TabMode = 'links' | 'panels';

/**
 * Options for a single tab item within {@link TabsOptions}.
 *
 * @category Interfaces
 */
export interface TabItemOptions {
  /**
   * Unique ID for the item. Used as the `<button>` id and to link the panel.
   */
  id: string;

  /**
   * Visible label text.
   */
  label: string;

  /**
   * Optional leading icon CSS class string (e.g. `'bi bi-house'`).
   */
  icon?: string;

  /**
   * URL for link-mode items.
   */
  href?: string;

  /**
   * ID of the target tab-pane panel. Falls back to `id` when omitted.
   * Only used in panels mode.
   */
  target?: string;

  /**
   * Whether this item is active/selected.
   */
  active?: boolean;

  /**
   * Whether this item is disabled.
   */
  disabled?: boolean;

  /**
   * Tooltip text. Requires Bootstrap Tooltip initialisation after DOM insertion.
   */
  tooltip?: string;

  /**
   * Tooltip placement. Defaults to Bootstrap's default (`'top'`).
   */
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Optional badge to append after the label.
   */
  badge?: BadgeOptions;
}

/**
 * Options for {@link createTabs}.
 *
 * @category Interfaces
 */
export interface TabsOptions {
  /**
   * Array of tab item descriptors.
   */
  tabs: TabItemOptions[];

  /**
   * Visual style. Defaults to `'tabs'`.
   */
  variant?: TabVariant;

  /**
   * Size modifier. Defaults to `'md'` (no size class).
   */
  size?: TabSize;

  /**
   * Alignment of the nav items. Defaults to `'start'`.
   */
  align?: TabAlign;

  /**
   * Allow items to wrap onto multiple lines. Defaults to `true`.
   */
  wrap?: boolean;

  /**
   * Enable horizontal scrolling instead of wrapping. Defaults to `false`.
   */
  scroll?: boolean;

  /**
   * Interaction mode. Defaults to `'panels'`.
   * Set to `'links'` to render `<a>` elements instead of `<button>` toggles.
   */
  mode?: TabMode;

  /**
   * Optional id applied to the `<ul>` element.
   */
  id?: string;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Initialises Bootstrap Tab instances on all `[data-bs-toggle="tab"]`
 * elements in the document. Call this after dynamically inserting
 * tab-enabled elements into the DOM.
 *
 * Runs automatically on `DOMContentLoaded`.
 *
 * @category Initialiser
 */
export function initTabs(): void {
  document.querySelectorAll<HTMLElement>('[data-bs-toggle="tab"]').forEach((el) => {
    BsTab.getOrCreateInstance(el);
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initTabs());
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a Terra tab nav element.
 *
 * @param options - Configuration for the tab nav.
 * @returns An `HTMLElement` -- a `<ul>` or a `<div class="nav-scroll">` wrapper.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createTabs({
 *     tabs: [
 *       { id: 'tab-a', label: 'One', active: true },
 *       { id: 'tab-b', label: 'Two' },
 *     ],
 *     variant: 'tabs',
 *   })
 * );
 * ```
 */
export function createTabs(options: TabsOptions): HTMLElement {
  const {
    tabs,
    variant = 'tabs',
    size,
    align,
    wrap = true,
    scroll = false,
    mode = 'panels',
    id,
  } = options;

  const classes: string[] = [tab.nav, tab.variants[variant]];

  if (align === 'centre') classes.push(tab.align.centre);
  else if (align === 'end') classes.push(tab.align.end);
  else if (align === 'spread') classes.push(tab.align.spread);

  if (size === 'sm') classes.push(tab.sizes.sm);
  else if (size === 'lg') classes.push(tab.sizes.lg);

  if (!wrap || scroll) classes.push('flex-nowrap');

  const ul = createUl(undefined, {
    id,
    className: classes.join(' '),
    attrs: { role: 'tablist' },
  });

  for (const item of tabs) {
    const li = createLi(undefined, {
      className: tab.item,
      attrs: { role: 'presentation' },
    });

    const isLink = mode === 'links' || !!item.href;
    let trigger: HTMLAnchorElement | HTMLButtonElement;

    if (isLink) {
      trigger = createA(undefined, {
        href: item.href ?? `#${item.target ?? item.id}`,
        className: tab.link,
      });
    } else {
      trigger = createButton(undefined, {
        type: 'button',
        id: item.id,
        className: tab.link,
        dataset: { bsToggle: 'tab', bsTarget: `#${item.target ?? item.id}` },
        attrs: {
          'aria-controls': item.target ?? item.id,
          'aria-selected': String(!!item.active),
        },
      });
    }

    if (item.active) trigger.classList.add('active');

    if (item.disabled) {
      trigger.classList.add('disabled');
      trigger.setAttribute('aria-disabled', 'true');
      if (trigger instanceof HTMLButtonElement) trigger.disabled = true;
    }

    // Icon
    if (item.icon) {
      const iconEl = createI(undefined, { className: item.icon });
      trigger.appendChild(iconEl);
      trigger.appendChild(document.createTextNode('\u00a0'));
    }

    trigger.appendChild(document.createTextNode(item.label));

    // Badge
    if (item.badge) {
      trigger.appendChild(document.createTextNode('\u00a0'));
      trigger.appendChild(createBadge(item.badge));
    }

    // Tooltip
    if (item.tooltip) {
      trigger.setAttribute('data-bs-toggle', 'tooltip');
      trigger.setAttribute('data-bs-title', item.tooltip);
      if (item.tooltipPosition) {
        trigger.setAttribute('data-bs-placement', item.tooltipPosition);
      }
    }

    li.appendChild(trigger);
    ul.appendChild(li);
  }

  if (scroll) {
    const wrapper = createDiv(undefined, { className: tab.scroll });
    wrapper.appendChild(ul);
    return wrapper;
  }

  return ul;
}

/**
 * Creates an empty tab-content container for panels mode.
 * The caller is responsible for appending content inside each `.tab-pane`.
 *
 * @param tabs - The same tab items passed to {@link createTabs}.
 * @returns An `HTMLElement` (`<div class="tab-content">`).
 * @category Factory
 *
 * @example
 * ```ts
 * const content = createTabContent(tabs);
 * content.querySelector('#tab-a')!.textContent = 'Panel one content.';
 * document.body.appendChild(content);
 * ```
 */
export function createTabContent(tabs: TabItemOptions[]): HTMLElement {
  const container = createDiv(undefined, { className: tab.content });

  for (const item of tabs) {
    const paneClasses: string[] = [tab.pane, 'fade'];
    if (item.active) paneClasses.push('show', 'active');

    const pane = createDiv(undefined, {
      id: item.target ?? item.id,
      className: paneClasses.join(' '),
      attrs: { role: 'tabpanel', 'aria-labelledby': item.id, tabindex: '0' },
    });

    container.appendChild(pane);
  }

  return container;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Tab component.
 *
 * @category Constants
 */
export const tab = {
  /**
   * Base nav class. Always applied.
   */
  nav: 'nav',

  /**
   * Variant classes keyed by variant name.
   */
  variants: {
    /**
     * Bootstrap tab borders variant.
     */
    tabs: 'nav-tabs',

    /**
     * Pill-shaped nav items variant.
     */
    pills: 'nav-pills',

    /**
     * Underline indicator variant.
     */
    underline: 'nav-underline',
  },

  /**
   * Nav item class.
   */
  item: 'nav-item',

  /**
   * Nav link class. Applied to each `<button>` or `<a>`.
   */
  link: 'nav-link',

  /**
   * Size modifier classes applied to the `<ul>`.
   */
  sizes: {
    /**
     * Compact size modifier.
     */
    sm: 'nav-sm',

    /**
     * Large size modifier.
     */
    lg: 'nav-lg',
  },

  /**
   * Alignment modifier classes.
   */
  align: {
    /**
     * Centred alignment.
     */
    centre: 'justify-content-center',

    /**
     * Right-aligned.
     */
    end: 'justify-content-end',

    /**
     * Items fill available width.
     */
    spread: 'nav-fill',
  },

  /**
   * Horizontal-scroll wrapper class.
   */
  scroll: 'nav-scroll',

  /**
   * Tab-content container class.
   */
  content: 'tab-content',

  /**
   * Tab-pane class.
   */
  pane: 'tab-pane',
} as const;
