/**
 * Terra UI Kit: Scrollspy
 *
 * @remarks
 * Wraps Bootstrap's ScrollSpy plugin. Automatically highlights the active
 * nav link as the user scrolls through a scrollable content area.
 *
 * Activate via HTML attributes on the scrollable element:
 * - `data-bs-spy="scroll"` — enables scrollspy
 * - `data-bs-target="#navId"` — the nav whose links should be activated
 * - `data-bs-smooth-scroll="true"` — enables smooth scrolling (optional)
 * - `data-bs-root-margin` — IntersectionObserver root margin (optional)
 *
 * Usage:
 * ```html
 * <nav id="spyNav" class="navbar bg-body-tertiary px-3 mb-3">
 *   <ul class="nav nav-pills">
 *     <li class="nav-item"><a class="nav-link" href="#section1">One</a></li>
 *     <li class="nav-item"><a class="nav-link" href="#section2">Two</a></li>
 *   </ul>
 * </nav>
 * <div
 *   data-bs-spy="scroll"
 *   data-bs-target="#spyNav"
 *   data-bs-smooth-scroll="true"
 *   class="scrollspy-content"
 *   tabindex="0"
 * >
 *   <h4 id="section1">One</h4>
 *   <p>Content…</p>
 *   <h4 id="section2">Two</h4>
 *   <p>Content…</p>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/scrollspy/
 *
 * @module
 * @category Components
 */

import BsScrollSpy from 'bootstrap/js/dist/scrollspy';

// Re-export Bootstrap ScrollSpy for consumers who need programmatic control.
export { BsScrollSpy };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for {@link initScrollspy}. */
export interface ScrollspyOptions {
  /**
   * CSS selector or element for the nav whose links are activated.
   * Maps to Bootstrap's `target` config option.
   */
  target: string | HTMLElement;
  /**
   * IntersectionObserver root margin used to determine which section is active.
   * Defaults to `'0px 0px -25%'`.
   */
  rootMargin?: string;
  /** Enables smooth scrolling when a nav link is clicked. Defaults to `false`. */
  smoothScroll?: boolean;
}

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Initialises Bootstrap ScrollSpy on a scrollable element.
 *
 * For HTML-authored scrollspy, Bootstrap auto-initialises on elements with
 * `data-bs-spy="scroll"`. Call this function when you need to set up
 * programmatically or after dynamic DOM insertion.
 *
 * @param element - The scrollable content element to observe.
 * @param options - ScrollSpy configuration.
 * @returns The Bootstrap ScrollSpy instance.
 * @category Initialiser
 *
 * @example
 * ```ts
 * initScrollspy(document.getElementById('content')!, {
 *   target: '#sideNav',
 *   smoothScroll: true,
 * });
 * ```
 */
export function initScrollspy(
  element: HTMLElement,
  options: ScrollspyOptions,
): InstanceType<typeof BsScrollSpy> {
  return BsScrollSpy.getOrCreateInstance(element, {
    target: options.target,
    rootMargin: options.rootMargin ?? '0px 0px -25%',
    smoothScroll: options.smoothScroll ?? false,
  });
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Data attribute and selector references for the Scrollspy component. @category Constants */
export const scrollspy = {
  /** `data-bs-spy` value that activates scrollspy on an element. */
  spy: 'scroll',
  /** Attribute name for the target nav selector. */
  attrTarget: 'data-bs-target',
  /** Attribute name for enabling smooth scroll. */
  attrSmoothScroll: 'data-bs-smooth-scroll',
  /** Attribute name for root margin. */
  attrRootMargin: 'data-bs-root-margin',
} as const;
