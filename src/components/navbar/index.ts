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
 * <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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

import BsCollapse from 'bootstrap/js/dist/collapse';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Visual theme variant for the navbar. */
export type NavbarVariant = 'default' | 'dark' | 'light';

/** Breakpoint at which the navbar expands from stacked to horizontal. */
export type NavbarExpand = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** Sticky positioning for the navbar. */
export type NavbarSticky = 'top' | 'bottom';

/** Options for {@link createNavbar}. */
export interface NavbarOptions {
  /** Visual colour scheme. Defaults to `'default'` (Bootstrap default styling). */
  variant?: NavbarVariant;
  /**
   * Breakpoint at which the navbar expands. Defaults to `'lg'`.
   * Pass `false` to never collapse (always expanded).
   */
  expand?: NavbarExpand | false;
  /** Stick the navbar to the top or bottom of the viewport. */
  sticky?: NavbarSticky;
}

/** Options for {@link createNavbarToggler}. */
export interface NavbarTogglerOptions {
  /** ID of the `NavbarCollapse` region this toggler controls (without `#`). */
  target: string;
  /** Accessible label for the toggler button. Defaults to `'Toggle navigation'`. */
  ariaLabel?: string;
}

/** Options for {@link createNavbarCollapse}. */
export interface NavbarCollapseOptions {
  /** ID applied to the collapse region. Used by the toggler's `aria-controls`. */
  id: string;
}

/** Options for {@link createNavbarLink}. */
export interface NavbarLinkOptions {
  /** Link destination. */
  href?: string;
  /** Visible label text. */
  label: string;
  /** Marks the link as the currently active page. */
  active?: boolean;
  /** Prevents interaction. */
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
  const { variant = 'default', expand = 'lg', sticky } = options;

  const el = document.createElement('nav');
  const classes: string[] = [navbar.base];

  if (expand !== false) classes.push(navbar.expand[expand]);
  if (variant !== 'default') classes.push(navbar.variants[variant]);
  if (sticky) classes.push(navbar.sticky[sticky]);

  el.className = classes.join(' ');
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
  const el = document.createElement('a');
  el.className = navbar.brand;
  el.href = href;
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

  const el = document.createElement('button');
  el.type = 'button';
  el.className = navbar.toggler;
  el.setAttribute('data-lnpg-toggle', 'collapse');
  el.setAttribute('data-lnpg-target', target);
  el.setAttribute('aria-controls', target);
  el.setAttribute('aria-expanded', 'false');
  el.setAttribute('aria-label', ariaLabel);

  const icon = document.createElement('span');
  icon.className = navbar.togglerIcon;
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
  const el = document.createElement('div');
  el.id = options.id;
  el.className = `${navbar.collapse} collapse`;
  return el;
}

/**
 * Creates a `<ul>` navbar nav list for grouping nav items.
 *
 * @returns An `HTMLUListElement` (`<ul class="navbar-nav">`).
 * @category Factory
 */
export function createNavbarNav(): HTMLUListElement {
  const el = document.createElement('ul');
  el.className = navbar.nav;
  return el;
}

/**
 * Creates a `<li>` navbar item that wraps a nav link.
 *
 * @returns An `HTMLLIElement` (`<li class="navbar-item">`).
 * @category Factory
 */
export function createNavbarItem(): HTMLLIElement {
  const el = document.createElement('li');
  el.className = navbar.item;
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

  const el = document.createElement('a');
  el.href = href;
  el.textContent = label;

  const classes: string[] = [navbar.link];
  if (active) classes.push('active');
  if (disabled) classes.push('disabled');
  el.className = classes.join(' ');

  if (active) el.setAttribute('aria-current', 'page');
  if (disabled) el.setAttribute('aria-disabled', 'true');

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
  const el = document.createElement('div');
  el.className = navbar.actions;
  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Navbar component. @category Constants */
export const navbar = {
  /** Base navbar class. */
  base: 'navbar',
  /** Brand/logo link class. */
  brand: 'navbar-brand',
  /** Collapse toggle button class. */
  toggler: 'navbar-toggler',
  /** Icon inside the toggler button. */
  togglerIcon: 'navbar-toggler-icon',
  /** Collapsible nav region class. */
  collapse: 'navbar-collapse',
  /** Nav item list class. */
  nav: 'navbar-nav',
  /** Individual nav item (Terra alias for Bootstrap's nav-item). */
  item: 'navbar-item',
  /** Nav link (Terra alias for Bootstrap's nav-link). */
  link: 'navbar-link',
  /** Right-side actions slot class. */
  actions: 'navbar-actions',
  /** Variant modifier classes. */
  variants: {
    dark: 'navbar-dark',
    light: 'navbar-light',
  },
  /** Expand breakpoint modifier classes. */
  expand: {
    sm: 'navbar-expand-sm',
    md: 'navbar-expand-md',
    lg: 'navbar-expand-lg',
    xl: 'navbar-expand-xl',
    xxl: 'navbar-expand-xxl',
  },
  /** Sticky positioning modifier classes. */
  sticky: {
    top: 'sticky-top',
    bottom: 'sticky-bottom',
  },
} as const;
