/**
 * Terra UI Kit: SideNav
 *
 * @remarks
 * A narrow trigger tab fixed to the viewport edge that opens a sliding
 * Offcanvas panel. Wraps Bootstrap's Offcanvas plugin with a custom tab
 * trigger styled as a vertical strip with an optional icon and rotated label.
 *
 * Two common uses:
 * - **Left side** — page navigation drawer
 * - **Right side** — call queue or secondary content panel
 *
 * The factory returns `{ element, body }`. Append your content to `body`,
 * then insert `element` anywhere in the DOM (the tab is `position: fixed`
 * so placement in the document tree does not affect its visual position).
 *
 * Usage:
 * ```ts
 * const { element, body } = createSideNav({
 *   id: 'callQueue',
 *   placement: 'right',
 *   label: 'Calls',
 *   icon: '<i class="bi bi-telephone-fill"></i>',
 *   rounded: true,
 *   title: 'Call Queue',
 * });
 *
 * body.appendChild(myCallListElement);
 * document.body.appendChild(element);
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/offcanvas/
 *
 * @module
 * @category Components
 */

import BsOffcanvas from 'bootstrap/js/dist/offcanvas';

// Re-export Bootstrap Offcanvas for consumers who need programmatic control.
export { BsOffcanvas as BsSideNavOffcanvas };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Viewport edge and vertical position for the SideNav trigger tab.
 *
 * - `left-top` / `right-top` — pinned near the top of the viewport.
 * - `left` / `right` — vertically centred.
 * - `left-bottom` / `right-bottom` — pinned near the bottom.
 */
export type SideNavPlacement =
  | 'left-top'
  | 'left'
  | 'left-bottom'
  | 'right-top'
  | 'right'
  | 'right-bottom';

/** Options for {@link createSideNav}. */
export interface SideNavOptions {
  /**
   * Base ID for the component. The offcanvas panel ID is derived as
   * `${id}-panel` and the title element ID as `${id}-title`.
   */
  id: string;
  /** Which edge and vertical position the trigger tab occupies. Defaults to `'right'`. */
  placement?: SideNavPlacement;
  /** HTML string rendered inside the trigger tab as an icon (e.g. a Bootstrap Icon `<i>` element). */
  icon?: string;
  /** Text label rendered on the trigger tab, rotated to read along the tab. */
  label?: string;
  /**
   * Whether the trigger tab has rounded corners on its outward-facing side.
   * Defaults to `false` (square, matching the kit's design language).
   */
  rounded?: boolean;
  /** Title text displayed in the offcanvas panel header. Defaults to `label` if omitted. */
  title?: string;
  /** Override the auto-generated title element ID. */
  titleId?: string;
}

/** Elements returned by {@link createSideNav}. */
export interface SideNavElements {
  /** The SideNav wrapper element containing the trigger tab and the offcanvas panel. */
  element: HTMLElement;
  /** The offcanvas body element — append your panel content here. */
  body: HTMLElement;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Ensures Bootstrap Offcanvas instances are created for all `.sidenav` panels
 * in the document. Useful after dynamically inserting a SideNav into the DOM.
 *
 * Bootstrap auto-wires triggers that carry `data-bs-toggle="offcanvas"`, so
 * this is only needed for programmatic control (e.g. calling `.show()`).
 *
 * @category Initialiser
 */
export function initSideNavs(): void {
  document.querySelectorAll<HTMLElement>(`.${sidenav.base}`).forEach((wrapper) => {
    const tab = wrapper.querySelector<HTMLElement>(`.${sidenav.tab}`);
    if (!tab) return;

    const panelId = tab.getAttribute('data-bs-target')?.replace('#', '');
    if (!panelId) return;

    const panel = document.getElementById(panelId);
    if (panel) BsOffcanvas.getOrCreateInstance(panel);
  });
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a SideNav — a fixed trigger tab and an Offcanvas panel — as a
 * single wrapper element.
 *
 * Append your content to the returned `body` element, then insert `element`
 * into the DOM. The trigger tab is `position: fixed`, so its location in the
 * document tree does not affect its visual position.
 *
 * @param options - Configuration for the SideNav.
 * @returns `{ element, body }` — the wrapper and the offcanvas body element.
 * @category Factory
 */
export function createSideNav(options: SideNavOptions): SideNavElements {
  const {
    id,
    placement = 'right',
    icon,
    label,
    rounded = false,
    title,
    titleId,
  } = options;

  const panelId = `${id}-panel`;
  const resolvedTitleId = titleId ?? `${id}-title`;
  const offcanvasSide = placement.startsWith('left') ? 'start' : 'end';

  // -------------------------------------------------------------------------
  // Wrapper
  // -------------------------------------------------------------------------

  const wrapper = document.createElement('div');
  wrapper.id = id;
  const wrapperClasses: string[] = [sidenav.base, sidenav.placements[placement]];
  if (rounded) wrapperClasses.push(sidenav.rounded);
  wrapper.className = wrapperClasses.join(' ');

  // -------------------------------------------------------------------------
  // Trigger tab
  // -------------------------------------------------------------------------

  const tab = document.createElement('button');
  tab.type = 'button';
  tab.className = sidenav.tab;
  tab.setAttribute('data-bs-toggle', 'offcanvas');
  tab.setAttribute('data-bs-target', `#${panelId}`);
  tab.setAttribute('aria-controls', panelId);

  const tabContent = document.createElement('span');
  tabContent.className = sidenav.tabContent;

  if (icon) {
    const iconEl = document.createElement('span');
    iconEl.className = sidenav.tabIcon;
    iconEl.innerHTML = icon;
    tabContent.appendChild(iconEl);
  }

  if (label) {
    const labelEl = document.createElement('span');
    labelEl.className = sidenav.tabLabel;
    labelEl.textContent = label;
    tabContent.appendChild(labelEl);
  }

  tab.appendChild(tabContent);

  // -------------------------------------------------------------------------
  // Offcanvas panel
  // -------------------------------------------------------------------------

  const panel = document.createElement('div');
  panel.id = panelId;
  panel.className = `offcanvas offcanvas-${offcanvasSide}`;
  panel.tabIndex = -1;
  panel.setAttribute('aria-labelledby', resolvedTitleId);

  const header = document.createElement('div');
  header.className = 'offcanvas-header';

  const titleEl = document.createElement('h5');
  titleEl.className = 'offcanvas-title';
  titleEl.id = resolvedTitleId;
  titleEl.textContent = title ?? label ?? '';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn-close';
  closeBtn.setAttribute('data-bs-dismiss', 'offcanvas');
  closeBtn.setAttribute('aria-label', 'Close');

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  const body = document.createElement('div');
  body.className = 'offcanvas-body';

  panel.appendChild(header);
  panel.appendChild(body);

  // -------------------------------------------------------------------------
  // Assemble
  // -------------------------------------------------------------------------

  wrapper.appendChild(tab);
  wrapper.appendChild(panel);

  return { element: wrapper, body };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the SideNav component. @category Constants */
export const sidenav = {
  /** Wrapper element class. */
  base: 'sidenav',
  /** Trigger tab button class. */
  tab: 'sidenav-tab',
  /** Inner content wrapper class (handles rotation). */
  tabContent: 'sidenav-tab-content',
  /** Icon element class within the tab. */
  tabIcon: 'sidenav-tab-icon',
  /** Label element class within the tab. */
  tabLabel: 'sidenav-tab-label',
  /** Modifier class that rounds the outward-facing corners of the trigger tab. */
  rounded: 'sidenav-rounded',
  /** Placement modifier classes keyed by placement value. */
  placements: {
    'left-top': 'sidenav-left-top',
    left: 'sidenav-left',
    'left-bottom': 'sidenav-left-bottom',
    'right-top': 'sidenav-right-top',
    right: 'sidenav-right',
    'right-bottom': 'sidenav-right-bottom',
  },
} as const;
