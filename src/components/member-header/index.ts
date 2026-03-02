/**
 * Terra UI Kit: MemberHeader
 *
 * @remarks
 * Three-slot header layout - left, center, right. The center slot is
 * absolutely positioned so it remains truly centred relative to the full
 * header width regardless of the content in the left and right slots.
 *
 * Usage:
 * ```html
 * <div class="member-header">
 *   <div class="member-header-left">
 *     <!-- back button, breadcrumb, etc. -->
 *   </div>
 *   <div class="member-header-center">
 *     <!-- page title, logo, etc. -->
 *   </div>
 *   <div class="member-header-right">
 *     <!-- actions, avatar, etc. -->
 *   </div>
 * </div>
 * ```
 *
 * @module
 * @category Components
 */

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a MemberHeader wrapper element.
 *
 * Append {@link createMemberHeaderLeft}, {@link createMemberHeaderCenter},
 * and {@link createMemberHeaderRight} as children.
 *
 * @returns An `HTMLElement` (`<div class="member-header">`).
 * @category Factory
 */
export function createMemberHeader(): HTMLElement {
  const el = document.createElement('div');
  el.className = memberHeader.base;
  return el;
}

/**
 * Creates the left slot of a MemberHeader.
 *
 * @returns An `HTMLElement` (`<div class="member-header-left">`).
 * @category Factory
 */
export function createMemberHeaderLeft(): HTMLElement {
  const el = document.createElement('div');
  el.className = memberHeader.left;
  return el;
}

/**
 * Creates the center slot of a MemberHeader.
 *
 * This slot is absolutely positioned and always centred relative to the
 * full header width. Keep content here concise to avoid overlap with the
 * left and right slots on narrow viewports.
 *
 * @returns An `HTMLElement` (`<div class="member-header-center">`).
 * @category Factory
 */
export function createMemberHeaderCenter(): HTMLElement {
  const el = document.createElement('div');
  el.className = memberHeader.center;
  return el;
}

/**
 * Creates the right slot of a MemberHeader.
 *
 * @returns An `HTMLElement` (`<div class="member-header-right">`).
 * @category Factory
 */
export function createMemberHeaderRight(): HTMLElement {
  const el = document.createElement('div');
  el.className = memberHeader.right;
  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the MemberHeader component. @category Constants */
export const memberHeader = {
  /** Wrapper element class. */
  base: 'member-header',
  /** Left slot class. */
  left: 'member-header-left',
  /** Center slot class (absolutely positioned, always truly centred). */
  center: 'member-header-center',
  /** Right slot class. */
  right: 'member-header-right',
} as const;
