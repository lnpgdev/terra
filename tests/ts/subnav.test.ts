import { describe, it, expect } from 'vitest';
import { createSubNav, createSubNavLink, subnav } from '../../src/components/subnav/index';

describe('subnav constants', () => {
  it('exports expected class names', () => {
    expect(subnav.base).toBe('subnav');
    expect(subnav.link).toBe('subnav-link');
  });
});

describe('createSubNav', () => {
  it('returns a div with subnav class', () => {
    const el = createSubNav();
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('subnav')).toBe(true);
  });

  it('renders no links when empty', () => {
    const el = createSubNav();
    expect(el.querySelectorAll('a').length).toBe(0);
  });

  it('renders left link when provided', () => {
    const el = createSubNav({ left: { label: 'Back', href: '/search' } });
    expect(el.querySelectorAll('a').length).toBe(1);
  });

  it('renders both links when both provided', () => {
    const el = createSubNav({
      left: { label: 'Back', href: '/search' },
      right: { label: 'All members', href: '/members' },
    });
    expect(el.querySelectorAll('a.subnav-link').length).toBe(2);
  });
});

describe('createSubNavLink', () => {
  it('returns an anchor with subnav-link class', () => {
    const el = createSubNavLink({ label: 'Back', href: '/search' }, 'left');
    expect(el.tagName).toBe('A');
    expect(el.classList.contains('subnav-link')).toBe(true);
  });

  it('sets the href', () => {
    const el = createSubNavLink({ label: 'Back', href: '/search' }, 'left');
    expect(el.getAttribute('href')).toBe('/search');
  });

  it('renders label text', () => {
    const el = createSubNavLink({ label: 'Back', href: '/search' }, 'left');
    expect(el.textContent).toContain('Back');
  });

  it('left link renders icon before label', () => {
    const icon = 'chevron-left';
    const el = createSubNavLink({ label: 'Back', href: '/', icon }, 'left');
    const spans = el.querySelectorAll('span');
    expect(spans[0].innerHTML).toBe(icon);
    expect(spans[1].textContent).toBe('Back');
  });

  it('right link renders icon after label', () => {
    const icon = 'chevron-right';
    const el = createSubNavLink({ label: 'All', href: '/', icon }, 'right');
    const spans = el.querySelectorAll('span');
    expect(spans[0].textContent).toBe('All');
    expect(spans[1].innerHTML).toBe(icon);
  });
});
