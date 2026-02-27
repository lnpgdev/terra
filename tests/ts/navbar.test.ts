import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/collapse', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({}),
  },
}));

import {
  createNavbar,
  createNavbarBrand,
  createNavbarToggler,
  createNavbarCollapse,
  createNavbarNav,
  createNavbarItem,
  createNavbarLink,
  createNavbarActions,
  navbar,
} from '../../src/components/navbar/index';

describe('navbar constants', () => {
  it('exports expected class names', () => {
    expect(navbar.base).toBe('navbar');
    expect(navbar.brand).toBe('navbar-brand');
    expect(navbar.toggler).toBe('navbar-toggler');
    expect(navbar.collapse).toBe('navbar-collapse');
    expect(navbar.nav).toBe('navbar-nav');
    expect(navbar.item).toBe('navbar-item');
    expect(navbar.link).toBe('navbar-link');
    expect(navbar.actions).toBe('navbar-actions');
    expect(navbar.expand.lg).toBe('navbar-expand-lg');
    expect(navbar.variants.dark).toBe('navbar-dark');
  });
});

describe('createNavbar', () => {
  it('returns a nav element with navbar class', () => {
    const el = createNavbar();
    expect(el.tagName).toBe('NAV');
    expect(el.classList.contains('navbar')).toBe(true);
  });

  it('applies expand-lg by default', () => {
    const el = createNavbar();
    expect(el.classList.contains('navbar-expand-lg')).toBe(true);
  });

  it('applies dark variant', () => {
    const el = createNavbar({ variant: 'dark' });
    expect(el.classList.contains('navbar-dark')).toBe(true);
  });

  it('applies sticky-top class', () => {
    const el = createNavbar({ sticky: 'top' });
    expect(el.classList.contains('sticky-top')).toBe(true);
  });

  it('does not apply expand class when expand=false', () => {
    const el = createNavbar({ expand: false });
    expect(el.className).not.toContain('navbar-expand');
  });
});

describe('createNavbarBrand', () => {
  it('returns an anchor with navbar-brand class', () => {
    const el = createNavbarBrand();
    expect(el.tagName).toBe('A');
    expect(el.classList.contains('navbar-brand')).toBe(true);
  });

  it('defaults href to /', () => {
    const el = createNavbarBrand();
    expect(el.getAttribute('href')).toBe('/');
  });
});

describe('createNavbarToggler', () => {
  it('returns a button with navbar-toggler class', () => {
    const el = createNavbarToggler({ target: 'mainNav' });
    expect(el.tagName).toBe('BUTTON');
    expect(el.classList.contains('navbar-toggler')).toBe(true);
  });

  it('sets data-lnpg-toggle and data-lnpg-target', () => {
    const el = createNavbarToggler({ target: 'mainNav' });
    expect(el.getAttribute('data-lnpg-toggle')).toBe('collapse');
    expect(el.getAttribute('data-lnpg-target')).toBe('mainNav');
  });
});

describe('createNavbarCollapse', () => {
  it('returns a div with navbar-collapse and collapse classes', () => {
    const el = createNavbarCollapse({ id: 'mainNav' });
    expect(el.classList.contains('navbar-collapse')).toBe(true);
    expect(el.classList.contains('collapse')).toBe(true);
  });

  it('sets the id', () => {
    const el = createNavbarCollapse({ id: 'mainNav' });
    expect(el.id).toBe('mainNav');
  });
});

describe('createNavbarNav', () => {
  it('returns a ul with navbar-nav class', () => {
    const el = createNavbarNav();
    expect(el.tagName).toBe('UL');
    expect(el.classList.contains('navbar-nav')).toBe(true);
  });
});

describe('createNavbarItem', () => {
  it('returns an li with navbar-item class', () => {
    const el = createNavbarItem();
    expect(el.tagName).toBe('LI');
    expect(el.classList.contains('navbar-item')).toBe(true);
  });
});

describe('createNavbarLink', () => {
  it('returns an anchor with navbar-link class', () => {
    const el = createNavbarLink({ label: 'Dashboard' });
    expect(el.tagName).toBe('A');
    expect(el.classList.contains('navbar-link')).toBe(true);
  });

  it('sets active class and aria-current', () => {
    const el = createNavbarLink({ label: 'Dashboard', active: true });
    expect(el.classList.contains('active')).toBe(true);
    expect(el.getAttribute('aria-current')).toBe('page');
  });

  it('sets disabled class and aria-disabled', () => {
    const el = createNavbarLink({ label: 'Off', disabled: true });
    expect(el.classList.contains('disabled')).toBe(true);
    expect(el.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('createNavbarActions', () => {
  it('returns a div with navbar-actions class', () => {
    const el = createNavbarActions();
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('navbar-actions')).toBe(true);
  });
});
