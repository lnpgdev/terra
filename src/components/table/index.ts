/**
 * Terra UI Kit: Table
 *
 * @remarks
 * Built on Bootstrap's Table. Provides factory functions for the table
 * container, rows, data cells, header cells, and table section header/footer
 * UI elements (title + optional metadata rendered above/below the `<table>`).
 *
 * Usage:
 * ```html
 * <div class="table-responsive">
 *   <table class="table table-hover table-striped">
 *     <thead>
 *       <tr>
 *         <th>Name</th>
 *         <th class="text-end">Score</th>
 *       </tr>
 *     </thead>
 *     <tbody>
 *       <tr class="table-success">
 *         <td>Em Yates</td>
 *         <td class="text-end">98</td>
 *       </tr>
 *     </tbody>
 *   </table>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/content/tables/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createSpan } from '@lnpg/sol/elements/container/span';
import { createStrong } from '@lnpg/sol/elements/inline/strong';
import { createTable as createTableElement } from '@lnpg/sol/elements/table/table';
import { createTd } from '@lnpg/sol/elements/table/td';
import { createTh } from '@lnpg/sol/elements/table/th';
import { createTr } from '@lnpg/sol/elements/table/tr';
import type { Tone } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Compact or standard row height.
 *
 * @remarks
 * `'sm'`: compact row padding.
 * `'md'`: standard row padding (default).
 *
 * @category Attributes
 */
export type TableSize = 'sm' | 'md';

/**
 * Background tone of the table.
 *
 * @remarks
 * `'default'`: standard Bootstrap table styling.
 * `'muted'`: subtle secondary background with no border.
 *
 * @category Attributes
 */
export type TableVariant = 'default' | 'muted';

/**
 * Contextual row tone.
 *
 * @remarks
 * `'info'`: cyan.
 * `'success'`: green.
 * `'danger'`: red.
 *
 * @category Attributes
 */
export type TableRowTone = Tone;

/**
 * Cell text alignment.
 *
 * @remarks
 * `'left'`: left-aligned (default).
 * `'center'`: centred.
 * `'right'`: right-aligned.
 *
 * @category Attributes
 */
export type TableAlign = 'left' | 'center' | 'right';

/**
 * Options for {@link createTable}.
 *
 * @category Interfaces
 */
export interface TableOptions {
  /**
   * Compact row padding. Defaults to `'md'`.
   */
  size?: TableSize;

  /**
   * Alternate row background shading.
   */
  striped?: boolean;

  /**
   * Row highlight on hover.
   */
  hover?: boolean;

  /**
   * Cell borders on all sides.
   */
  bordered?: boolean;

  /**
   * Remove all cell borders.
   */
  borderless?: boolean;

  /**
   * Wraps the `<table>` in a `<div class="table-responsive">` for horizontal
   * scrolling on narrow viewports. When `true` the function returns the
   * wrapper `<div>` rather than the `<table>` directly.
   */
  responsive?: boolean;

  /**
   * Wraps the `<table>` in a scrollable container and makes `<thead>` cells
   * sticky. Implies `responsive`. When `true` the function returns the wrapper.
   */
  stickyHeader?: boolean;

  /**
   * Visual style of the table. Defaults to `'default'`.
   */
  variant?: TableVariant;
}

/**
 * Options for {@link createTableRow}.
 *
 * @category Interfaces
 */
export interface TableRowOptions {
  /**
   * Contextual background tone for the row.
   */
  tone?: TableRowTone;

  /**
   * Highlights the row as the selected/active row.
   */
  selected?: boolean;

  /**
   * Fades and blocks interaction on the row.
   */
  disabled?: boolean;
}

/**
 * Options for {@link createTableCell}.
 *
 * @category Interfaces
 */
export interface TableCellOptions {
  /**
   * Text alignment within the cell. Defaults to `'left'`.
   */
  align?: TableAlign;

  /**
   * Truncates overflowing text with an ellipsis.
   */
  truncate?: boolean;

  /**
   * Right-aligns content (conventional for numeric columns).
   */
  numeric?: boolean;

  /**
   * Prevents text wrapping.
   */
  nowrap?: boolean;

  /**
   * Makes the cell content editable.
   */
  isEditable?: boolean;
}

/**
 * Options for {@link createTableHeadCell}.
 *
 * @category Interfaces
 */
export interface TableHeadCellOptions {
  /**
   * Text alignment within the header cell. Defaults to `'left'`.
   */
  align?: TableAlign;

  /**
   * Truncates overflowing text with an ellipsis.
   */
  truncate?: boolean;

  /**
   * Right-aligns content (conventional for numeric columns).
   */
  numeric?: boolean;

  /**
   * Prevents text wrapping.
   */
  nowrap?: boolean;
}

/**
 * Options for {@link createTableHeader} and {@link createTableFooter}.
 *
 * @category Interfaces
 */
export interface TableSectionOptions {
  /**
   * Primary title text displayed in the section.
   */
  title: string;

  /**
   * Secondary metadata text (e.g. row count, last updated).
   */
  meta?: string;
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a `<table>` element (or a scroll wrapper containing one).
 *
 * When `responsive` or `stickyHeader` is `true`, the returned element is a
 * `<div>` wrapper; otherwise it is the `<table>` itself.
 *
 * @param options - Table configuration.
 * @returns A `<table>` or wrapper `<div>`.
 * @category Factory
 *
 * @example
 * ```ts
 * const tableEl = createTable({ hover: true, striped: true, responsive: true });
 * // tableEl is a <div class="table-responsive">; the <table> is its first child.
 * const thead = tableEl.querySelector('table')!.createTHead();
 * ```
 */
export function createTable(options: TableOptions = {}): HTMLElement {
  const {
    size = 'md',
    striped = false,
    hover = false,
    bordered = false,
    borderless = false,
    responsive = false,
    stickyHeader = false,
    variant = 'default',
  } = options;

  const tableClasses: string[] = [table.base];
  if (size === 'sm') tableClasses.push(table.sizes.sm);
  if (striped) tableClasses.push(table.striped);
  if (hover) tableClasses.push(table.hover);
  if (bordered) tableClasses.push(table.bordered);
  if (borderless) tableClasses.push(table.borderless);
  if (variant === 'muted') tableClasses.push(table.variants.muted);

  const tableEl = createTableElement(undefined, { className: tableClasses.join(' ') });

  if (stickyHeader || responsive) {
    const wrapper = createDiv(undefined, {
      className: stickyHeader ? table.scrollable : table.responsive,
    });
    wrapper.appendChild(tableEl);
    return wrapper;
  }

  return tableEl;
}

/**
 * Creates a `<tr>` table row element.
 *
 * @param options - Row configuration.
 * @returns An `HTMLTableRowElement`.
 * @category Factory
 */
export function createTableRow(options: TableRowOptions = {}): HTMLTableRowElement {
  const { tone, selected = false, disabled = false } = options;

  const classes: string[] = [];
  if (tone) classes.push(table.rowTones[tone]);
  if (selected) classes.push(table.rowSelected);
  if (disabled) classes.push(table.rowDisabled);

  const tr = createTr(undefined, classes.length ? { className: classes.join(' ') } : undefined);

  return tr;
}

/**
 * Creates a `<td>` data cell element.
 *
 * @param content - Text content for the cell.
 * @param options - Cell configuration.
 * @returns An `HTMLTableCellElement`.
 * @category Factory
 */
export function createTableCell(
  content: string,
  options: TableCellOptions = {},
): HTMLTableCellElement {
  const { align, truncate = false, numeric = false, nowrap = false, isEditable = false } = options;

  const classes: string[] = [];

  const effectiveAlign = numeric ? 'right' : align;
  if (effectiveAlign === 'center') classes.push('text-center');
  if (effectiveAlign === 'right') classes.push('text-end');
  if (effectiveAlign === 'left') classes.push('text-start');
  if (truncate) classes.push('text-truncate');
  if (nowrap) classes.push('text-nowrap');

  const td = createTd(content, {
    className: classes.length ? classes.join(' ') : undefined,
    attrs: isEditable ? { contenteditable: 'true' } : undefined,
  });

  return td;
}

/**
 * Creates a `<th>` header cell element.
 *
 * @param content - Text content for the header cell.
 * @param options - Header cell configuration.
 * @returns An `HTMLTableCellElement`.
 * @category Factory
 */
export function createTableHeadCell(
  content: string,
  options: TableHeadCellOptions = {},
): HTMLTableCellElement {
  const { align, truncate = false, numeric = false, nowrap = false } = options;

  const classes: string[] = [];

  const effectiveAlign = numeric ? 'right' : align;
  if (effectiveAlign === 'center') classes.push('text-center');
  if (effectiveAlign === 'right') classes.push('text-end');
  if (effectiveAlign === 'left') classes.push('text-start');
  if (truncate) classes.push('text-truncate');
  if (nowrap) classes.push('text-nowrap');

  const th = createTh(content, {
    scope: 'col',
    className: classes.length ? classes.join(' ') : undefined,
  });

  return th;
}

/**
 * Creates a section header element rendered above a table - shows a title
 * and optional metadata such as a row count or last-updated timestamp.
 *
 * @param options - Section header configuration.
 * @returns A `<div class="table-section-header">`.
 * @category Factory
 */
export function createTableHeader(options: TableSectionOptions): HTMLElement {
  return _createTableSection(table.sectionHeader, options);
}

/**
 * Creates a section footer element rendered below a table - shows a title
 * and optional metadata such as a summary or pagination note.
 *
 * @param options - Section footer configuration.
 * @returns A `<div class="table-section-footer">`.
 * @category Factory
 */
export function createTableFooter(options: TableSectionOptions): HTMLElement {
  return _createTableSection(table.sectionFooter, options);
}

function _createTableSection(className: string, options: TableSectionOptions): HTMLElement {
  const { title, meta } = options;

  const el = createDiv(undefined, { className });

  const titleEl = createStrong(title);
  el.appendChild(titleEl);

  if (meta !== undefined) {
    const metaEl = createSpan(meta, { className: table.sectionMeta });
    el.appendChild(metaEl);
  }

  return el;
}

// ---------------------------------------------------------------------------
// Detail table
// ---------------------------------------------------------------------------

/**
 * Options for {@link createDetailTable}.
 *
 * @category Interfaces
 */
export interface DetailTableOptions {
  /**
   * Compact row padding. Defaults to `'md'`.
   */
  size?: TableSize;

  /**
   * Row highlight on hover.
   */
  hover?: boolean;

  /**
   * Wraps the `<table>` in a `<div class="table-responsive">` for horizontal
   * scrolling on narrow viewports. When `true` the function returns the wrapper.
   */
  responsive?: boolean;

  /**
   * Wraps the `<table>` in a scrollable container and makes `<thead>` cells
   * sticky. Implies `responsive`. When `true` the function returns the wrapper.
   */
  stickyHeader?: boolean;
}

/**
 * Creates a striped `<table>` element suited for key-value detail layouts.
 *
 * Equivalent to `createTable({ striped: true, ...options })`.
 *
 * @param options - Table configuration (striped is always enabled).
 * @returns A `<table>` or wrapper `<div>`.
 * @category Factory
 *
 * @example
 * ```ts
 * const t = createDetailTable();
 * const thead = t.createTHead();
 * thead.appendChild(createDetailSectionRow('Basic Information'));
 * const body = t.createTBody();
 * body.appendChild(createDetailRow('Title', 'Mr'));
 * body.appendChild(createDetailRow('First Name', 'Anthony'));
 * ```
 */
export function createDetailTable(options: DetailTableOptions = {}): HTMLElement {
  return createTable({ striped: true, ...options });
}

/**
 * Creates a `<tr>` with a `<th scope="row">` label cell and a `<td>` value cell.
 *
 * Use inside a `<tbody>` produced by {@link createDetailTable}.
 *
 * @param label - Bold label text rendered in the `<th>`.
 * @param value - Value text or element rendered in the `<td>`.
 * @returns An `HTMLTableRowElement`.
 * @category Factory
 */
export function createDetailRow(label: string, value: string | HTMLElement): HTMLTableRowElement {
  const tr = createTr();

  const th = createTh(label, { scope: 'row' });
  tr.appendChild(th);

  const td = createTd(typeof value === 'string' ? value : '');
  if (typeof value !== 'string') td.appendChild(value);
  tr.appendChild(td);

  return tr;
}

/**
 * Creates a full-width `<tr>` acting as a section header inside a `<thead>`.
 *
 * The row uses `table-dark` styling and spans `colspan` columns (default 2).
 *
 * @param title - Section title text.
 * @param colspan - Number of columns to span. Defaults to `2`.
 * @returns An `HTMLTableRowElement`.
 * @category Factory
 */
export function createDetailSectionRow(title: string, colspan = 2): HTMLTableRowElement {
  const tr = createTr(undefined, { className: 'table-dark' });

  const th = createTh(title, { scope: 'colgroup' });
  th.setAttribute('colspan', String(colspan));
  tr.appendChild(th);

  return tr;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Table component.
 *
 * @category Constants
 */
export const table = {
  /**
   * Base table class.
   */
  base: 'table',

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * Compact row padding.
     */
    sm: 'table-sm',
  },

  /**
   * Alternate row shading.
   */
  striped: 'table-striped',

  /**
   * Row highlight on hover.
   */
  hover: 'table-hover',

  /**
   * Cell borders on all sides.
   */
  bordered: 'table-bordered',

  /**
   * Remove all cell borders.
   */
  borderless: 'table-borderless',

  /**
   * Horizontal scroll wrapper (Bootstrap).
   */
  responsive: 'table-responsive',

  /**
   * Vertical scroll wrapper with sticky header (Terra).
   */
  scrollable: 'table-scrollable',

  /**
   * Table variant classes.
   */
  variants: {
    /**
     * Subtle secondary background with no border.
     */
    muted: 'table-muted',
  },

  /**
   * Row tone classes (Bootstrap contextual colours).
   */
  rowTones: {
    /**
     * Primary blue tone.
     */
    primary: 'table-primary',

    /**
     * Secondary grey tone.
     */
    secondary: 'table-secondary',

    /**
     * Green success tone.
     */
    success: 'table-success',

    /**
     * Cyan info tone.
     */
    info: 'table-info',

    /**
     * Amber warning tone.
     */
    warning: 'table-warning',

    /**
     * Red danger tone.
     */
    danger: 'table-danger',

    /**
     * Dark tone.
     */
    dark: 'table-dark',
  },

  /**
   * Row selected/active class.
   */
  rowSelected: 'table-active',

  /**
   * Disabled row class (Terra).
   */
  rowDisabled: 'table-row-disabled',

  /**
   * Table section header wrapper class.
   */
  sectionHeader: 'table-section-header',

  /**
   * Table section footer wrapper class.
   */
  sectionFooter: 'table-section-footer',

  /**
   * Metadata text within a section header or footer.
   */
  sectionMeta: 'table-section-meta',

  /**
   * Detail table classes.
   */
  detail: {
    /**
     * Dark background applied to the section header row.
     */
    sectionRow: 'table-dark',
  },
} as const;
