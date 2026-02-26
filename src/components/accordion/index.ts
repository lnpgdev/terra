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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Controls whether only one item can be open at a time (`'single'`) or
 * items toggle independently (`'multiple'`).
 */
export type AccordionMode = 'single' | 'multiple';

/** Visual style of the accordion. */
export type AccordionVariant = 'default' | 'notification';

/** Colour tone applied to an item in the notification variant. */
export type AccordionItemTone = 'info' | 'success' | 'warning' | 'danger';

/** Options for a single accordion item. */
export interface AccordionItemOptions {
  /** Unique ID used for the collapse panel and button aria attributes. */
  id: string;
  /** Button label text. */
  label: string;
  /** Body content text (HTML not supported -- use the DOM API for rich content). */
  body: string;
  /** Render the item expanded on load. Defaults to `false`. */
  open?: boolean;
  /** Prevent the item from being toggled. Defaults to `false`. */
  disabled?: boolean;
  /** Accent tone for the notification variant. */
  tone?: AccordionItemTone;
}

/** Options for {@link createAccordion}. */
export interface AccordionOptions {
  /** Unique ID for the accordion container. Required for `'single'` mode. */
  id: string;
  /** Item descriptors. */
  items: AccordionItemOptions[];
  /**
   * `'single'` -- only one item open at a time (Bootstrap `data-bs-parent`).
   * `'multiple'` -- items toggle independently.
   * Defaults to `'single'`.
   */
  mode?: AccordionMode;
  /** Visual style. Defaults to `'default'`. */
  variant?: AccordionVariant;
  /** Remove outer borders and rounded corners (Bootstrap flush style). */
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

  const wrapper = document.createElement('div');
  const wrapperClasses: string[] = [accordion.base];
  if (flush) wrapperClasses.push(accordion.flush);
  if (variant === 'notification') wrapperClasses.push(accordion.variants.notification);
  wrapper.className = wrapperClasses.join(' ');
  wrapper.id = id;

  for (const item of items) {
    const itemEl = document.createElement('div');
    const itemClasses: string[] = [accordion.item];
    if (item.tone) itemClasses.push(accordion.tones[item.tone]);
    itemEl.className = itemClasses.join(' ');

    // Header
    const header = document.createElement('h2');
    header.className = accordion.header;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = item.open ? accordion.button : `${accordion.button} collapsed`;
    btn.setAttribute('data-bs-toggle', 'collapse');
    btn.setAttribute('data-bs-target', `#${item.id}`);
    btn.setAttribute('aria-expanded', item.open ? 'true' : 'false');
    btn.setAttribute('aria-controls', item.id);
    btn.textContent = item.label;
    if (item.disabled) {
      btn.disabled = true;
    }

    header.appendChild(btn);
    itemEl.appendChild(header);

    // Panel
    const panel = document.createElement('div');
    panel.id = item.id;
    panel.className = `accordion-collapse collapse${item.open ? ' show' : ''}`;
    if (mode === 'single') {
      panel.setAttribute('data-bs-parent', `#${id}`);
    }

    const body = document.createElement('div');
    body.className = accordion.body;
    body.textContent = item.body;

    panel.appendChild(body);
    itemEl.appendChild(panel);
    wrapper.appendChild(itemEl);
  }

  return wrapper;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Accordion component. @category Constants */
export const accordion = {
  /** Base accordion class. */
  base: 'accordion',
  /** Removes outer borders (Bootstrap flush style). */
  flush: 'accordion-flush',
  variants: {
    notification: 'accordion-notification',
  },
  /** Individual accordion item wrapper. */
  item: 'accordion-item',
  /** Item header wrapper (should be an `<h2>`-`<h6>`). */
  header: 'accordion-header',
  /** Toggle button inside the header. */
  button: 'accordion-button',
  /** Collapsible panel wrapping the body. */
  panel: 'accordion-collapse',
  /** Content area inside the panel. */
  body: 'accordion-body',
  /** Tone modifiers for notification variant items. */
  tones: {
    info: 'accordion-item-info',
    success: 'accordion-item-success',
    warning: 'accordion-item-warning',
    danger: 'accordion-item-danger',
  },
} as const;
