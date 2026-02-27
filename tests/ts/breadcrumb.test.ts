import { describe, it, expect } from 'vitest';
import { createBreadcrumb, breadcrumb } from '../../src/components/breadcrumb/index';

describe('breadcrumb constants', () => {
  it('exports expected class names', () => {
    expect(breadcrumb.base).toBe('breadcrumb');
    expect(breadcrumb.item).toBe('breadcrumb-item');
    expect(breadcrumb.active).toBe('active');
    expect(breadcrumb.disabled).toBe('disabled');
  });
});

describe('createBreadcrumb', () => {
  it('returns a nav element', () => {
    const el = createBreadcrumb({ items: [{ label: 'Home', href: '/' }] });
    expect(el.tagName).toBe('NAV');
  });

  it('sets default aria-label', () => {
    const el = createBreadcrumb({ items: [{ label: 'Home', href: '/' }] });
    expect(el.getAttribute('aria-label')).toBe('breadcrumb');
  });

  it('sets custom aria-label', () => {
    const el = createBreadcrumb({ items: [], label: 'Site path' });
    expect(el.getAttribute('aria-label')).toBe('Site path');
  });

  it('renders an ol with breadcrumb class inside nav', () => {
    const el = createBreadcrumb({ items: [{ label: 'Home', href: '/' }] });
    expect(el.querySelector('ol.breadcrumb')).not.toBeNull();
  });

  it('renders correct number of items', () => {
    const el = createBreadcrumb({
      items: [{ label: 'Home', href: '/' }, { label: 'Members', href: '/m' }, { label: 'Em', active: true }],
    });
    expect(el.querySelectorAll('li.breadcrumb-item').length).toBe(3);
  });

  it('active item gets active class and aria-current', () => {
    const el = createBreadcrumb({ items: [{ label: 'Page', active: true }] });
    const li = el.querySelector('li.breadcrumb-item');
    expect(li?.classList.contains('active')).toBe(true);
    expect(li?.getAttribute('aria-current')).toBe('page');
  });

  it('link item renders an anchor', () => {
    const el = createBreadcrumb({ items: [{ label: 'Home', href: '/home' }] });
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/home');
  });

  it('sets custom divider via CSS property', () => {
    const el = createBreadcrumb({ items: [], divider: '>' });
    expect((el as HTMLElement).style.getPropertyValue('--bs-breadcrumb-divider')).toBe("'>'");
  });

  it('disabled link gets disabled class and aria-disabled', () => {
    const el = createBreadcrumb({ items: [{ label: 'Old', href: '/old', disabled: true }] });
    const a = el.querySelector('a');
    expect(a?.classList.contains('disabled')).toBe(true);
    expect(a?.getAttribute('aria-disabled')).toBe('true');
  });
});
