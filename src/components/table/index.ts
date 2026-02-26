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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Compact or standard row height. */
export type TableSize = 'sm' | 'md';

/** Background tone of the table. */
export type TableVariant = 'default' | 'muted';

/** Contextual row tone. */
export type TableRowTone = 'info' | 'success' | 'danger';

/** Cell text alignment. */
export type TableAlign = 'left' | 'center' | 'right';

/** Options for {@link createTable}. */
export interface TableOptions {
  /** Compact row padding. Defaults to `'md'`. */
  size?: TableSize;
  /** Alternate row background shading. */
  striped?: boolean;
  /** Row highlight on hover. */
  hover?: boolean;
  /** Cell borders on all sides. */
  bordered?: boolean;
  /** Remove all cell borders. */
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
  /** Visual style of the table. Defaults to `'default'`. */
  variant?: TableVariant;
}

/** Options for {@link createTableRow}. */
export interface TableRowOptions {
  /** Contextual background tone for the row. */
  tone?: TableRowTone;
  /** Highlights the row as the selected/active row. */
  selected?: boolean;
  /** Fades and blocks interaction on the row. */
  disabled?: boolean;
}

/** Options for {@link createTableCell}. */
export interface TableCellOptions {
  /** Text alignment within the cell. Defaults to `'left'`. */
  align?: TableAlign;
  /** Truncates overflowing text with an ellipsis. */
  truncate?: boolean;
  /** Right-aligns content (conventional for numeric columns). */
  numeric?: boolean;
  /** Prevents text wrapping. */
  nowrap?: boolean;
  /** Makes the cell content editable. */
  isEditable?: boolean;
}

/** Options for {@link createTableHeadCell}. */
export interface TableHeadCellOptions {
  /** Text alignment within the header cell. Defaults to `'left'`. */
  align?: TableAlign;
  /** Truncates overflowing text with an ellipsis. */
  truncate?: boolean;
  /** Right-aligns content (conventional for numeric columns). */
  numeric?: boolean;
  /** Prevents text wrapping. */
  nowrap?: boolean;
}

/** Options for {@link createTableHeader} and {@link createTableFooter}. */
export interface TableSectionOptions {
  /** Primary title text displayed in the section. */
  title: string;
  /** Secondary metadata text (e.g. row count, last updated). */
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

  const tableEl = document.createElement('table');
  tableEl.className = tableClasses.join(' ');

  if (stickyHeader || responsive) {
    const wrapper = document.createElement('div');
    wrapper.className = stickyHeader ? table.scrollable : table.responsive;
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

  const tr = document.createElement('tr');
  const classes: string[] = [];
  if (tone) classes.push(table.rowTones[tone]);
  if (selected) classes.push(table.rowSelected);
  if (disabled) classes.push(table.rowDisabled);
  if (classes.length) tr.className = classes.join(' ');

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

  const td = document.createElement('td');
  const classes: string[] = [];

  const effectiveAlign = numeric ? 'right' : align;
  if (effectiveAlign === 'center') classes.push('text-center');
  if (effectiveAlign === 'right') classes.push('text-end');
  if (effectiveAlign === 'left') classes.push('text-start');
  if (truncate) classes.push('text-truncate');
  if (nowrap) classes.push('text-nowrap');
  if (classes.length) td.className = classes.join(' ');

  if (isEditable) td.setAttribute('contenteditable', 'true');
  td.textContent = content;

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

  const th = document.createElement('th');
  th.scope = 'col';
  const classes: string[] = [];

  const effectiveAlign = numeric ? 'right' : align;
  if (effectiveAlign === 'center') classes.push('text-center');
  if (effectiveAlign === 'right') classes.push('text-end');
  if (effectiveAlign === 'left') classes.push('text-start');
  if (truncate) classes.push('text-truncate');
  if (nowrap) classes.push('text-nowrap');
  if (classes.length) th.className = classes.join(' ');

  th.textContent = content;
  return th;
}

/**
 * Creates a section header element rendered above a table — shows a title
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
 * Creates a section footer element rendered below a table — shows a title
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

  const el = document.createElement('div');
  el.className = className;

  const titleEl = document.createElement('strong');
  titleEl.textContent = title;
  el.appendChild(titleEl);

  if (meta !== undefined) {
    const metaEl = document.createElement('span');
    metaEl.className = table.sectionMeta;
    metaEl.textContent = meta;
    el.appendChild(metaEl);
  }

  return el;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Table component. @category Constants */
export const table = {
  /** Base table class. */
  base: 'table',
  /** Compact row padding. */
  sizes: {
    sm: 'table-sm',
  },
  /** Alternate row shading. */
  striped: 'table-striped',
  /** Row highlight on hover. */
  hover: 'table-hover',
  /** Cell borders on all sides. */
  bordered: 'table-bordered',
  /** Remove all cell borders. */
  borderless: 'table-borderless',
  /** Horizontal scroll wrapper (Bootstrap). */
  responsive: 'table-responsive',
  /** Vertical scroll wrapper with sticky header (Terra). */
  scrollable: 'table-scrollable',
  /** Table variant classes. */
  variants: {
    muted: 'table-muted',
  },
  /** Row tone classes (Bootstrap contextual colours). */
  rowTones: {
    info: 'table-info',
    success: 'table-success',
    danger: 'table-danger',
  },
  /** Row selected/active class. */
  rowSelected: 'table-active',
  /** Disabled row class (Terra). */
  rowDisabled: 'table-row-disabled',
  /** Table section header wrapper class. */
  sectionHeader: 'table-section-header',
  /** Table section footer wrapper class. */
  sectionFooter: 'table-section-footer',
  /** Metadata text within a section header or footer. */
  sectionMeta: 'table-section-meta',
} as const;
