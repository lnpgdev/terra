import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/offcanvas', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({}),
  },
}));

import { createSideNav, sidenav } from '../../src/components/sidenav/index';

describe('sidenav constants', () => {
  it('exports expected class names', () => {
    expect(sidenav.base).toBe('sidenav');
    expect(sidenav.tab).toBe('sidenav-tab');
    expect(sidenav.tabContent).toBe('sidenav-tab-content');
    expect(sidenav.rounded).toBe('sidenav-rounded');
    expect(sidenav.placements.left).toBe('sidenav-left');
    expect(sidenav.placements['right-top']).toBe('sidenav-right-top');
  });
});

describe('createSideNav', () => {
  it('returns element and body', () => {
    const { element, body } = createSideNav({ id: 'callQueue' });
    expect(element).toBeDefined();
    expect(body).toBeDefined();
  });

  it('element has sidenav class', () => {
    const { element } = createSideNav({ id: 'callQueue' });
    expect(element.classList.contains('sidenav')).toBe(true);
  });

  it('element has correct id', () => {
    const { element } = createSideNav({ id: 'callQueue' });
    expect(element.id).toBe('callQueue');
  });

  it('applies placement class (default right)', () => {
    const { element } = createSideNav({ id: 'nav' });
    expect(element.classList.contains('sidenav-right')).toBe(true);
  });

  it('applies custom placement class', () => {
    const { element } = createSideNav({ id: 'nav', placement: 'left-top' });
    expect(element.classList.contains('sidenav-left-top')).toBe(true);
  });

  it('applies rounded class when rounded=true', () => {
    const { element } = createSideNav({ id: 'nav', rounded: true });
    expect(element.classList.contains('sidenav-rounded')).toBe(true);
  });

  it('contains a trigger tab button', () => {
    const { element } = createSideNav({ id: 'nav' });
    expect(element.querySelector('button.sidenav-tab')).not.toBeNull();
  });

  it('renders label text in the tab', () => {
    const { element } = createSideNav({ id: 'nav', label: 'Calls' });
    expect(element.querySelector('.sidenav-tab-label')?.textContent).toBe('Calls');
  });

  it('contains an offcanvas panel', () => {
    const { element } = createSideNav({ id: 'nav' });
    expect(element.querySelector('.offcanvas')).not.toBeNull();
  });

  it('body element is the offcanvas-body div', () => {
    const { body } = createSideNav({ id: 'nav' });
    expect(body.classList.contains('offcanvas-body')).toBe(true);
  });

  it('panel is on the end side for right placements', () => {
    const { element } = createSideNav({ id: 'nav', placement: 'right' });
    expect(element.querySelector('.offcanvas-end')).not.toBeNull();
  });

  it('panel is on the start side for left placements', () => {
    const { element } = createSideNav({ id: 'nav', placement: 'left' });
    expect(element.querySelector('.offcanvas-start')).not.toBeNull();
  });

  it('uses title option for the panel header title', () => {
    const { element } = createSideNav({ id: 'nav', title: 'Call Queue' });
    expect(element.querySelector('.offcanvas-title')?.textContent).toBe('Call Queue');
  });

  it('falls back to label for panel title when title is not provided', () => {
    const { element } = createSideNav({ id: 'nav', label: 'Queue' });
    expect(element.querySelector('.offcanvas-title')?.textContent).toBe('Queue');
  });
});
