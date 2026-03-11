/**
 * Terra UI Kit: App Switcher
 *
 * @remarks
 * A 3×3 grid trigger button that opens a dropdown panel listing all
 * applications in the LNPG suite. Intended for placement inside the navbar,
 * to the left of the logo.
 *
 * Usage:
 * ```html
 * <div class="app-switcher dropdown">
 *   <button
 *     class="app-switcher-toggle"
 *     type="button"
 *     data-bs-toggle="dropdown"
 *     aria-expanded="false"
 *   >
 *     <i class="bi bi-grid-3x3-gap-fill"></i>
 *   </button>
 *   <div class="app-switcher-menu dropdown-menu">
 *     <div class="app-switcher-grid">
 *       <a class="app-switcher-item app-switcher-item-active" href="#">
 *         <div class="app-switcher-icon">
 *           <i class="bi bi-circles-nested"></i>
 *         </div>
 *         <span class="app-switcher-label">Orbit</span>
 *       </a>
 *       <a class="app-switcher-item" href="#">
 *         <div class="app-switcher-icon">
 *           <i class="bi bi-credit-card-fill"></i>
 *         </div>
 *         <span class="app-switcher-label">Payments</span>
 *       </a>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @module
 * @category Components
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A single application entry in the switcher panel.
 *
 * @category Interfaces
 */
export interface AppSwitcherEntry {
  /**
   * Display name of the application.
   */
  label: string;

  /**
   * Bootstrap Icon class string (e.g. `'bi bi-circles-nested'`).
   */
  icon: string;

  /**
   * URL to navigate to when the app is selected.
   */
  href: string;

  /**
   * Whether this is the currently active application. Applies
   * `app-switcher-item-active` to highlight the entry.
   */
  active?: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the App Switcher component.
 *
 * @category Constants
 */
export const appSwitcher = {
  /** Root wrapper. Also apply Bootstrap's `dropdown` class. */
  root: 'app-switcher',

  /** The grid icon trigger button. Also apply Bootstrap's `data-bs-toggle="dropdown"`. */
  toggle: 'app-switcher-toggle',

  /** The dropdown panel. Also apply Bootstrap's `dropdown-menu`. */
  menu: 'app-switcher-menu',

  /** The CSS grid container wrapping all app items. */
  grid: 'app-switcher-grid',

  /** An individual app entry. */
  item: 'app-switcher-item',

  /** Modifier applied to the currently active app. */
  itemActive: 'app-switcher-item-active',

  /** The icon container inside an app entry. */
  icon: 'app-switcher-icon',

  /** The text label inside an app entry. */
  label: 'app-switcher-label',
} as const;
