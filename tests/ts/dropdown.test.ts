import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/dropdown', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({ show: vi.fn(), hide: vi.fn() }),
  },
}));

import { createDropdown, dropdown } from '../../src/components/dropdown/index';

describe('dropdown constants', () => {
  it('exports expected class names', () => {
    expect(dropdown.base).toBe('dropdown');
    expect(dropdown.directions.up).toBe('dropup');
    expect(dropdown.toggle).toBe('dropdown-toggle');
    expect(dropdown.menu).toBe('dropdown-menu');
    expect(dropdown.item).toBe('dropdown-item');
    expect(dropdown.divider).toBe('dropdown-divider');
  });
});

const items = [
  { label: 'Edit' },
  { label: 'Delete', dividerBefore: true },
];

describe('createDropdown', () => {
  it('returns wrapper with dropdown class by default', () => {
    const el = createDropdown({ items });
    expect(el.classList.contains('dropdown')).toBe(true);
  });

  it('applies dropup class for up direction', () => {
    const el = createDropdown({ items, direction: 'up' });
    expect(el.classList.contains('dropup')).toBe(true);
  });

  it('renders a toggle button', () => {
    const el = createDropdown({ items, label: 'Actions' });
    const btn = el.querySelector('button.dropdown-toggle');
    expect(btn).not.toBeNull();
    expect(btn?.textContent).toContain('Actions');
  });

  it('applies solid tone class to toggle', () => {
    const el = createDropdown({ items, variant: 'solid', tone: 'success', label: 'Go' });
    const btn = el.querySelector('button');
    expect(btn?.classList.contains('btn-success')).toBe(true);
  });

  it('renders a dropdown-menu', () => {
    const el = createDropdown({ items });
    expect(el.querySelector('ul.dropdown-menu')).not.toBeNull();
  });

  it('renders correct number of items', () => {
    const el = createDropdown({ items });
    expect(el.querySelectorAll('.dropdown-item').length).toBe(2);
  });

  it('inserts a divider before items with dividerBefore=true', () => {
    const el = createDropdown({ items });
    expect(el.querySelector('.dropdown-divider')).not.toBeNull();
  });

  it('renders anchor item when type=anchor', () => {
    const el = createDropdown({ items: [{ label: 'Go', type: 'anchor', href: '/path' }] });
    expect(el.querySelector('a.dropdown-item')).not.toBeNull();
  });

  it('marks active item', () => {
    const el = createDropdown({ items: [{ label: 'Active', active: true }] });
    expect(el.querySelector('.dropdown-item.active')).not.toBeNull();
  });

  it('marks disabled item', () => {
    const el = createDropdown({ items: [{ label: 'Off', disabled: true }] });
    const item = el.querySelector('.dropdown-item.disabled');
    expect(item).not.toBeNull();
    expect(item?.getAttribute('aria-disabled')).toBe('true');
  });

  it('sets aria-label on toggle when no label or icon', () => {
    const el = createDropdown({ items });
    expect(el.querySelector('button')?.getAttribute('aria-label')).toBe('Open menu');
  });
});
