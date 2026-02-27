import { describe, it, expect } from 'vitest';
import { createPagination, pagination } from '../../src/components/pagination/index';

describe('pagination constants', () => {
  it('exports expected class names', () => {
    expect(pagination.base).toBe('pagination');
    expect(pagination.item).toBe('page-item');
    expect(pagination.link).toBe('page-link');
    expect(pagination.active).toBe('active');
    expect(pagination.disabled).toBe('disabled');
    expect(pagination.sizes.sm).toBe('pagination-sm');
    expect(pagination.sizes.lg).toBe('pagination-lg');
  });
});

const items = [
  { label: 'Previous', href: '#', disabled: true, rel: 'prev' as const },
  { label: '1', href: '#', active: true },
  { label: '2', href: '#' },
  { label: 'Next', href: '#', rel: 'next' as const },
];

describe('createPagination', () => {
  it('returns a nav element', () => {
    const el = createPagination({ items });
    expect(el.tagName).toBe('NAV');
  });

  it('renders a ul with pagination class inside nav', () => {
    const el = createPagination({ items });
    expect(el.querySelector('ul.pagination')).not.toBeNull();
  });

  it('renders correct number of page items', () => {
    const el = createPagination({ items });
    expect(el.querySelectorAll('.page-item').length).toBe(4);
  });

  it('active item gets active class and aria-current', () => {
    const el = createPagination({ items });
    const activeItem = el.querySelector('.page-item.active');
    expect(activeItem).not.toBeNull();
    expect(activeItem?.getAttribute('aria-current')).toBe('page');
  });

  it('disabled item gets disabled class', () => {
    const el = createPagination({ items });
    expect(el.querySelector('.page-item.disabled')).not.toBeNull();
  });

  it('applies sm size class', () => {
    const el = createPagination({ items, size: 'sm' });
    expect(el.querySelector('ul')?.classList.contains('pagination-sm')).toBe(true);
  });

  it('applies center alignment class', () => {
    const el = createPagination({ items, align: 'center' });
    expect(el.querySelector('ul')?.classList.contains('justify-content-center')).toBe(true);
  });

  it('sets rel attribute on links', () => {
    const el = createPagination({ items });
    const prevLink = el.querySelector('a[rel="prev"]');
    const nextLink = el.querySelector('a[rel="next"]');
    expect(prevLink).not.toBeNull();
    expect(nextLink).not.toBeNull();
  });

  it('renders a span instead of anchor for items without href', () => {
    const el = createPagination({ items: [{ label: '...' }] });
    expect(el.querySelector('span.page-link')).not.toBeNull();
  });
});
