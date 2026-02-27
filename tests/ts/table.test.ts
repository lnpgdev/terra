import { describe, it, expect } from 'vitest';
import {
  createTable,
  createTableRow,
  createTableCell,
  createTableHeadCell,
  createTableHeader,
  createTableFooter,
  table,
} from '../../src/components/table/index';

describe('table constants', () => {
  it('exports expected class names', () => {
    expect(table.base).toBe('table');
    expect(table.hover).toBe('table-hover');
    expect(table.striped).toBe('table-striped');
    expect(table.responsive).toBe('table-responsive');
    expect(table.rowTones.success).toBe('table-success');
  });
});

describe('createTable', () => {
  it('returns a table element by default', () => {
    const el = createTable();
    expect(el.tagName).toBe('TABLE');
    expect(el.classList.contains('table')).toBe(true);
  });

  it('applies hover class', () => {
    const el = createTable({ hover: true });
    expect(el.classList.contains('table-hover')).toBe(true);
  });

  it('applies striped class', () => {
    const el = createTable({ striped: true });
    expect(el.classList.contains('table-striped')).toBe(true);
  });

  it('applies sm size', () => {
    const el = createTable({ size: 'sm' });
    expect(el.classList.contains('table-sm')).toBe(true);
  });

  it('wraps in div when responsive=true', () => {
    const el = createTable({ responsive: true });
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('table-responsive')).toBe(true);
    expect(el.querySelector('table.table')).not.toBeNull();
  });

  it('wraps in scrollable div when stickyHeader=true', () => {
    const el = createTable({ stickyHeader: true });
    expect(el.classList.contains('table-scrollable')).toBe(true);
  });
});

describe('createTableRow', () => {
  it('returns a tr element', () => {
    const el = createTableRow();
    expect(el.tagName).toBe('TR');
  });

  it('applies tone class', () => {
    const el = createTableRow({ tone: 'success' });
    expect(el.classList.contains('table-success')).toBe(true);
  });

  it('applies selected class', () => {
    const el = createTableRow({ selected: true });
    expect(el.classList.contains('table-active')).toBe(true);
  });

  it('applies disabled class', () => {
    const el = createTableRow({ disabled: true });
    expect(el.classList.contains('table-row-disabled')).toBe(true);
  });
});

describe('createTableCell', () => {
  it('returns a td with content', () => {
    const el = createTableCell('Value');
    expect(el.tagName).toBe('TD');
    expect(el.textContent).toBe('Value');
  });

  it('applies text-end for right align', () => {
    const el = createTableCell('42', { align: 'right' });
    expect(el.classList.contains('text-end')).toBe(true);
  });

  it('applies text-end for numeric', () => {
    const el = createTableCell('42', { numeric: true });
    expect(el.classList.contains('text-end')).toBe(true);
  });

  it('sets contenteditable when isEditable', () => {
    const el = createTableCell('Edit me', { isEditable: true });
    expect(el.getAttribute('contenteditable')).toBe('true');
  });
});

describe('createTableHeadCell', () => {
  it('returns a th with scope=col', () => {
    const el = createTableHeadCell('Name');
    expect(el.tagName).toBe('TH');
    expect(el.scope).toBe('col');
    expect(el.textContent).toBe('Name');
  });
});

describe('createTableHeader', () => {
  it('returns a div with table-section-header class', () => {
    const el = createTableHeader({ title: 'Results' });
    expect(el.classList.contains('table-section-header')).toBe(true);
    expect(el.querySelector('strong')?.textContent).toBe('Results');
  });

  it('renders meta text when provided', () => {
    const el = createTableHeader({ title: 'Results', meta: '42 rows' });
    expect(el.querySelector('.table-section-meta')?.textContent).toBe('42 rows');
  });
});

describe('createTableFooter', () => {
  it('returns a div with table-section-footer class', () => {
    const el = createTableFooter({ title: 'Summary' });
    expect(el.classList.contains('table-section-footer')).toBe(true);
  });
});
