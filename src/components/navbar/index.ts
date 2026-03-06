/**
 * Terra UI Kit: Navbar
 *
 * @remarks
 * Top-level navigation wrapper built on Bootstrap's Navbar component.
 * Provides Terra-specific class aliases (`navbar-item`, `navbar-link`) and
 * an `navbar-actions` slot for right-side utility content (search, buttons, etc.).
 *
 * The navbar toggler uses `data-lnpg-toggle="collapse"` and
 * `data-lnpg-target` (the collapse region ID). {@link initNavbars} translates
 * these to Bootstrap attributes on `DOMContentLoaded`.
 *
 * Usage (HTML-authored):
 * ```html
 * <nav class="navbar navbar-expand-lg">
 *   <div class="container">
 *     <a class="navbar-brand" href="/">Brand</a>
 *
 *     <button
 *       type="button"
 *       class="navbar-toggler"
 *       data-lnpg-toggle="collapse"
 *       data-lnpg-target="mainNav"
 *       aria-controls="mainNav"
 *       aria-expanded="false"
 *       aria-label="Toggle navigation"
 *     >
 *       <span class="navbar-toggler-icon"></span>
 *     </button>
 *
 *     <div class="navbar-collapse collapse" id="mainNav">
 *       <ul class="navbar-nav">
 *         <li class="navbar-item">
 *           <a class="navbar-link active" href="#">Dashboard</a>
 *         </li>
 *         <li class="navbar-item">
 *           <a class="navbar-link" href="#">Reports</a>
 *         </li>
 *       </ul>
 *       <div class="navbar-actions">
 *         <button type="button" class="btn btn-sm btn-success">New Call</button>
 *       </div>
 *     </div>
 *   </div>
 * </nav>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/navbar/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createSpan } from '@lnpg/sol/elements/container/span';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createA } from '@lnpg/sol/elements/inline/a';
import { createNav } from '@lnpg/sol/elements/layout/nav';
import { createLi } from '@lnpg/sol/elements/list/li';
import { createUl } from '@lnpg/sol/elements/list/ul';
import BsCollapse from 'bootstrap/js/dist/collapse';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Visual theme variant for the navbar.
 *
 * @remarks
 * `'dark'`: dark background with light text (default - matches Orbit wireframe).
 * `'light'`: light background with dark text.
 *
 * @category Attributes
 */
export type NavbarVariant = 'dark' | 'light';

/**
 * Breakpoint at which the navbar expands from stacked to horizontal.
 *
 * @remarks
 * `'sm'` / `'md'` / `'lg'` / `'xl'` / `'xxl'`: Bootstrap responsive breakpoints.
 *
 * @category Attributes
 */
export type NavbarExpand = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Sticky positioning for the navbar.
 *
 * @remarks
 * `'top'`: sticks to the top of the viewport.
 * `'bottom'`: sticks to the bottom of the viewport.
 *
 * @category Attributes
 */
export type NavbarSticky = 'top' | 'bottom';

/**
 * Options for {@link createNavbar}.
 *
 * @category Interfaces
 */
export interface NavbarOptions {
  /**
   * Visual colour scheme. Defaults to `'dark'` (dark surface, matches Orbit wireframe).
   */
  variant?: NavbarVariant;

  /**
   * Breakpoint at which the navbar expands. Defaults to `'lg'`.
   * Pass `false` to never collapse (always expanded).
   */
  expand?: NavbarExpand | false;

  /**
   * Stick the navbar to the top or bottom of the viewport.
   */
  sticky?: NavbarSticky;
}

/**
 * Options for {@link createNavbarToggler}.
 *
 * @category Interfaces
 */
export interface NavbarTogglerOptions {
  /**
   * ID of the `NavbarCollapse` region this toggler controls (without `#`).
   */
  target: string;

  /**
   * Accessible label for the toggler button. Defaults to `'Toggle navigation'`.
   */
  ariaLabel?: string;
}

/**
 * Options for {@link createNavbarCollapse}.
 *
 * @category Interfaces
 */
export interface NavbarCollapseOptions {
  /**
   * ID applied to the collapse region. Used by the toggler's `aria-controls`.
   */
  id: string;
}

/**
 * Options for {@link createNavbarLink}.
 *
 * @category Interfaces
 */
export interface NavbarLinkOptions {
  /**
   * Link destination.
   */
  href?: string;

  /**
   * Visible label text.
   */
  label: string;

  /**
   * Marks the link as the currently active page.
   */
  active?: boolean;

  /**
   * Prevents interaction.
   */
  disabled?: boolean;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Wires up all navbar togglers that use `data-lnpg-toggle="collapse"` by
 * translating them to Bootstrap's `data-bs-toggle`/`data-bs-target` attributes
 * and creating a `BsCollapse` instance on the target region.
 *
 * Runs automatically on `DOMContentLoaded`. Call manually after dynamically
 * inserting navbar elements into the DOM.
 *
 * @category Initialiser
 */
export function initNavbars(): void {
  document.querySelectorAll<HTMLElement>('[data-lnpg-toggle="collapse"]').forEach((toggler) => {
    const target = toggler.getAttribute('data-lnpg-target');
    if (!target) return;

    toggler.setAttribute('data-bs-toggle', 'collapse');
    toggler.setAttribute('data-bs-target', `#${target}`);

    const collapseEl = document.getElementById(target);
    if (collapseEl) BsCollapse.getOrCreateInstance(collapseEl, { toggle: false });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initNavbars());
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a `<nav>` navbar container.
 *
 * @param options - Configuration for the navbar.
 * @returns A configured `HTMLElement` (`<nav class="navbar ...">`).
 * @category Factory
 */
export function createNavbar(options: NavbarOptions = {}): HTMLElement {
  const { variant = 'dark', expand = 'lg', sticky } = options;

  const classes: string[] = [navbar.base];

  if (expand !== false) classes.push(navbar.expand[expand]);
  if (variant === 'light') classes.push(navbar.variants.light);
  if (sticky) classes.push(navbar.sticky[sticky]);

  const el = createNav(undefined, { className: classes.join(' ') });
  return el;
}

/**
 * Creates a navbar brand link - typically wraps a logo.
 *
 * @param href - The link destination. Defaults to `'/'`.
 * @returns An `HTMLAnchorElement` with the `navbar-brand` class.
 * @category Factory
 */
export function createNavbarBrand(href = '/'): HTMLAnchorElement {
  const el = createA(undefined, { className: navbar.brand, href });
  return el;
}

/**
 * Creates a navbar toggler button for collapsing the nav on small screens.
 *
 * Uses `data-lnpg-toggle` so it is picked up by {@link initNavbars}.
 *
 * @param options - Configuration for the toggler.
 * @returns An `HTMLButtonElement`.
 * @category Factory
 */
export function createNavbarToggler(options: NavbarTogglerOptions): HTMLButtonElement {
  const { target, ariaLabel = 'Toggle navigation' } = options;

  const el = createButton(undefined, {
    type: 'button',
    className: navbar.toggler,
    dataset: { lnpgToggle: 'collapse', lnpgTarget: target },
    attrs: { 'aria-controls': target, 'aria-expanded': 'false', 'aria-label': ariaLabel },
  });

  const icon = createSpan(undefined, { className: navbar.togglerIcon });
  el.appendChild(icon);

  return el;
}

/**
 * Creates the collapsible container that holds nav items.
 *
 * @param options - Configuration for the collapse region.
 * @returns An `HTMLElement` (`<div class="navbar-collapse collapse">`).
 * @category Factory
 */
export function createNavbarCollapse(options: NavbarCollapseOptions): HTMLElement {
  const el = createDiv(undefined, {
    id: options.id,
    className: `${navbar.collapse} collapse`,
  });
  return el;
}

/**
 * Creates a `<ul>` navbar nav list for grouping nav items.
 *
 * @returns An `HTMLUListElement` (`<ul class="navbar-nav">`).
 * @category Factory
 */
export function createNavbarNav(): HTMLUListElement {
  const el = createUl(undefined, { className: navbar.nav });
  return el;
}

/**
 * Creates a `<li>` navbar item that wraps a nav link.
 *
 * @returns An `HTMLLIElement` (`<li class="navbar-item">`).
 * @category Factory
 */
export function createNavbarItem(): HTMLLIElement {
  const el = createLi(undefined, { className: navbar.item });
  return el;
}

/**
 * Creates a navbar link anchor.
 *
 * @param options - Configuration for the link.
 * @returns An `HTMLAnchorElement` with the `navbar-link` class.
 * @category Factory
 */
export function createNavbarLink(options: NavbarLinkOptions): HTMLAnchorElement {
  const { href = '#', label, active = false, disabled = false } = options;

  const classes: string[] = [navbar.link];
  if (active) classes.push('active');
  if (disabled) classes.push('disabled');

  const extraAttrs: Record<string, string> = {};
  if (active) extraAttrs['aria-current'] = 'page';
  if (disabled) extraAttrs['aria-disabled'] = 'true';

  const el = createA(label, {
    href,
    className: classes.join(' '),
    attrs: extraAttrs,
  });

  return el;
}

/**
 * Creates the `navbar-actions` slot - a right-aligned flex container for
 * utility content such as search bars, buttons, or user avatars.
 *
 * @returns An `HTMLElement` (`<div class="navbar-actions">`).
 * @category Factory
 */
export function createNavbarActions(): HTMLElement {
  const el = createDiv(undefined, { className: navbar.actions });
  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Navbar component.
 *
 * @category Constants
 */
export const navbar = {
  /**
   * Base navbar class.
   */
  base: 'navbar',

  /**
   * Brand/logo link class.
   */
  brand: 'navbar-brand',

  /**
   * Collapse toggle button class.
   */
  toggler: 'navbar-toggler',

  /**
   * Icon inside the toggler button.
   */
  togglerIcon: 'navbar-toggler-icon',

  /**
   * Collapsible nav region class.
   */
  collapse: 'navbar-collapse',

  /**
   * Nav item list class.
   */
  nav: 'navbar-nav',

  /**
   * Individual nav item (Terra alias for Bootstrap's nav-item).
   */
  item: 'navbar-item',

  /**
   * Nav link (Terra alias for Bootstrap's nav-link).
   */
  link: 'navbar-link',

  /**
   * Right-side actions slot class.
   */
  actions: 'navbar-actions',

  /**
   * Variant modifier classes. Dark is the Terra base - only light needs a class.
   */
  variants: {
    /**
     * Light background with dark text.
     */
    light: 'navbar-light',
  },

  /**
   * Expand breakpoint modifier classes.
   */
  expand: {
    /**
     * Expand at sm breakpoint.
     */
    sm: 'navbar-expand-sm',

    /**
     * Expand at md breakpoint.
     */
    md: 'navbar-expand-md',

    /**
     * Expand at lg breakpoint.
     */
    lg: 'navbar-expand-lg',

    /**
     * Expand at xl breakpoint.
     */
    xl: 'navbar-expand-xl',

    /**
     * Expand at xxl breakpoint.
     */
    xxl: 'navbar-expand-xxl',
  },

  /**
   * Sticky positioning modifier classes.
   */
  sticky: {
    /**
     * Sticks to the top of the viewport.
     */
    top: 'sticky-top',

    /**
     * Sticks to the bottom of the viewport.
     */
    bottom: 'sticky-bottom',
  },
} as const;
