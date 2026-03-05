import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/offcanvas', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({}),
  },
}));

import {
  createOffcanvas,
  createOffcanvasHeader,
  createOffcanvasBody,
  createOffcanvasFooter,
  createOffcanvasTrigger,
  offcanvas,
} from '../../src/components/offcanvas/index';

describe('offcanvas constants', () => {
  it('exports expected class names', () => {
    expect(offcanvas.base).toBe('offcanvas');
    expect(offcanvas.header).toBe('offcanvas-header');
    expect(offcanvas.body).toBe('offcanvas-body');
    expect(offcanvas.footer).toBe('offcanvas-footer');
    expect(offcanvas.placements.start).toBe('offcanvas-start');
    expect(offcanvas.placements.end).toBe('offcanvas-end');
    expect(offcanvas.placements.top).toBe('offcanvas-top');
    expect(offcanvas.placements.bottom).toBe('offcanvas-bottom');
  });
});

describe('createOffcanvasTrigger', () => {
  it('returns a button by default', () => {
    const el = createOffcanvasTrigger({ target: 'myPanel', label: 'Open' });
    expect(el.tagName).toBe('BUTTON');
  });

  it('sets data-bs-toggle and data-bs-target', () => {
    const el = createOffcanvasTrigger({ target: 'myPanel', label: 'Open' });
    expect(el.getAttribute('data-bs-toggle')).toBe('offcanvas');
    expect(el.getAttribute('data-bs-target')).toBe('#myPanel');
  });

  it('returns an anchor when variant=anchor', () => {
    const el = createOffcanvasTrigger({ target: 'myPanel', label: 'Open', variant: 'anchor' });
    expect(el.tagName).toBe('A');
  });
});

describe('createOffcanvas', () => {
  it('returns a div with offcanvas and placement class', () => {
    const el = createOffcanvas({ id: 'panel1', placement: 'end' });
    expect(el.classList.contains('offcanvas')).toBe(true);
    expect(el.classList.contains('offcanvas-end')).toBe(true);
  });

  it('sets the id', () => {
    const el = createOffcanvas({ id: 'panel1' });
    expect(el.id).toBe('panel1');
  });

  it('sets tabIndex=-1', () => {
    const el = createOffcanvas({ id: 'panel1' });
    expect(el.tabIndex).toBe(-1);
  });

  it('sets aria-labelledby when provided', () => {
    const el = createOffcanvas({ id: 'p', labelledBy: 'pTitle' });
    expect(el.getAttribute('aria-labelledby')).toBe('pTitle');
  });

  it('does not set aria-labelledby when not provided', () => {
    const el = createOffcanvas({ id: 'p' });
    expect(el.getAttribute('aria-labelledby')).toBeNull();
  });

  it('defaults to start placement', () => {
    const el = createOffcanvas({ id: 'p' });
    expect(el.classList.contains('offcanvas-start')).toBe(true);
  });
});

describe('createOffcanvasHeader', () => {
  it('returns a div with offcanvas-header class', () => {
    const el = createOffcanvasHeader({ title: 'My Panel' });
    expect(el.classList.contains('offcanvas-header')).toBe(true);
  });

  it('renders the title text', () => {
    const el = createOffcanvasHeader({ title: 'Settings' });
    expect(el.querySelector('.offcanvas-title')?.textContent).toBe('Settings');
  });

  it('sets titleId on the title element', () => {
    const el = createOffcanvasHeader({ title: 'Settings', titleId: 'settingsTitle' });
    expect(el.querySelector('#settingsTitle')).not.toBeNull();
  });

  it('renders a close button', () => {
    const el = createOffcanvasHeader({ title: 'T' });
    expect(el.querySelector('button.btn-close')).not.toBeNull();
  });
});

describe('createOffcanvasBody', () => {
  it('returns a div with offcanvas-body class', () => {
    const el = createOffcanvasBody();
    expect(el.classList.contains('offcanvas-body')).toBe(true);
  });
});

describe('createOffcanvasFooter', () => {
  it('returns a div with offcanvas-footer class', () => {
    const el = createOffcanvasFooter();
    expect(el.classList.contains('offcanvas-footer')).toBe(true);
  });
});
