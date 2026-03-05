/**
 * Terra UI Kit: Accordion
 *
 * @remarks
 * Built on Bootstrap's Accordion (which uses the Collapse plugin internally).
 * Supports single-open and multiple-open modes, a disabled item state, and a
 * notification variant that shows a coloured left accent bar on each item.
 *
 * Usage:
 * ```html
 * <!-- Single mode (only one item open at a time) -->
 * <div class="accordion" id="myAccordion">
 *   <div class="accordion-item">
 *     <h2 class="accordion-header">
 *       <button class="accordion-button" type="button"
 *               data-bs-toggle="collapse" data-bs-target="#item1"
 *               aria-expanded="true" aria-controls="item1">
 *         Item 1
 *       </button>
 *     </h2>
 *     <div id="item1" class="accordion-collapse collapse show"
 *          data-bs-parent="#myAccordion">
 *       <div class="accordion-body">Content here.</div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/accordion/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createH2 } from '@lnpg/sol/elements/heading/h2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * The supported modes for the accordion.
 *
 * @remarks
 * `'single'`: only one item open at a time (Bootstrap `data-bs-parent`).
 * `'multiple'`: items toggle independently.
 *
 * @category Attributes
 */
export type AccordionMode = 'single' | 'multiple';

/**
 * The supported variants for the accordion.
 *
 * @remarks
 * `'default'`: standard accordion style.
 * `'notification'`: shows a coloured left accent bar on each item.
 *
 * @category Attributes
 */
export type AccordionVariant = 'default' | 'notification';

/**
 * The supported tones for an accordion item in the notification variant.
 *
 * @remarks
 * `'info'`: informational tone.
 * `'success'`: success tone.
 * `'warning'`: warning tone.
 * `'danger'`: danger tone.
 *
 * @category Attributes
 */
export type AccordionItemTone =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'dark';

/**
 * Options for a single accordion item.
 *
 * @category Interfaces
 */
export interface AccordionItemOptions {
  /**
   * Unique ID used for the collapse panel and button aria attributes.
   */
  id: string;

  /**
   * Button label text.
   */
  label: string;

  /**
   * Body content text (HTML not supported -- use the DOM API for rich content).
   */
  body: string;

  /**
   * Render the item expanded on load. Defaults to `false`.
   */
  open?: boolean;

  /**
   * Prevent the item from being toggled. Defaults to `false`.
   */
  disabled?: boolean;

  /**
   * Accent tone for the notification variant.
   */
  tone?: AccordionItemTone;
}

/**
 * Options for {@link createAccordion}.
 *
 * @category Interfaces
 */
export interface AccordionOptions {
  /**
   * Unique ID for the accordion container. Required for `'single'` mode.
   */
  id: string;

  /**
   * Item descriptors.
   */
  items: AccordionItemOptions[];

  /**
   * `'single'`: only one item open at a time (Bootstrap `data-bs-parent`).
   * `'multiple'`: items toggle independently.
   *
   * Defaults to `'single'`.
   */
  mode?: AccordionMode;

  /**
   * Visual style. Defaults to `'default'`.
   */
  variant?: AccordionVariant;

  /**
   * Remove outer borders and rounded corners (Bootstrap flush style).
   */
  flush?: boolean;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured accordion element.
 *
 * @param options - Accordion configuration.
 * @returns A `<div class="accordion">` containing all items.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createAccordion({
 *     id: 'faq',
 *     mode: 'single',
 *     items: [
 *       { id: 'q1', label: 'What is Terra?', body: 'LNPG UI Kit.', open: true },
 *       { id: 'q2', label: 'How do I install it?', body: 'npm install @lnpg/terra' },
 *     ],
 *   })
 * );
 * ```
 */
export function createAccordion(options: AccordionOptions): HTMLElement {
  const { id, items, mode = 'single', variant = 'default', flush = false } = options;

  const wrapperClasses: string[] = [accordion.base];
  if (flush) wrapperClasses.push(accordion.flush);
  if (variant === 'notification') wrapperClasses.push(accordion.variants.notification);

  const wrapper = createDiv(undefined, {
    id,
    className: wrapperClasses.join(' '),
  });

  for (const item of items) {
    const itemClasses: string[] = [accordion.item];
    if (item.tone) itemClasses.push(accordion.tones[item.tone]);

    const itemEl = createDiv(undefined, { className: itemClasses.join(' ') });

    // Header
    const header = createH2(undefined, { className: accordion.header });

    const btn = createButton(item.label, {
      type: 'button',
      className: item.open ? accordion.button : `${accordion.button} collapsed`,
      disabled: item.disabled || undefined,
      dataset: { bsToggle: 'collapse', bsTarget: `#${item.id}` },
      attrs: { 'aria-expanded': item.open ? 'true' : 'false', 'aria-controls': item.id },
    });

    header.appendChild(btn);
    itemEl.appendChild(header);

    // Panel
    const panelClassName = `${accordion.panel} collapse${item.open ? ' show' : ''}`;
    const panelAttrs =
      mode === 'single'
        ? { id: item.id, className: panelClassName, dataset: { bsParent: `#${id}` } }
        : { id: item.id, className: panelClassName };

    const panel = createDiv(undefined, panelAttrs);

    const body = createDiv(item.body, { className: accordion.body });

    panel.appendChild(body);
    itemEl.appendChild(panel);
    wrapper.appendChild(itemEl);
  }

  return wrapper;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Accordion component.
 *
 * @category Constants
 */
export const accordion = {
  /**
   * Base accordion class.
   */
  base: 'accordion',

  /**
   * Removes outer borders (Bootstrap flush style).
   */
  flush: 'accordion-flush',

  /**
   * Variant modifier classes.
   */
  variants: {
    /**
     * Left accent bar variant for notification-style accordions.
     */
    notification: 'accordion-notification',
  },

  /**
   * Individual accordion item wrapper.
   */
  item: 'accordion-item',

  /**
   * Item header wrapper (should be an `<h2>`-`<h6>`).
   */
  header: 'accordion-header',

  /**
   * Toggle button inside the header.
   */
  button: 'accordion-button',

  /**
   * Collapsible panel wrapping the body.
   */
  panel: 'accordion-collapse',

  /**
   * Content area inside the panel.
   */
  body: 'accordion-body',

  /**
   * Tone modifiers for notification variant items.
   */
  tones: {
    primary: 'accordion-item-primary',
    secondary: 'accordion-item-secondary',
    info: 'accordion-item-info',
    success: 'accordion-item-success',
    warning: 'accordion-item-warning',
    danger: 'accordion-item-danger',
    dark: 'accordion-item-dark',
  },
} as const;
