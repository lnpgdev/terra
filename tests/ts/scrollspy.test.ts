import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/scrollspy', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({ dispose: vi.fn() }),
  },
}));

import BsScrollSpy from 'bootstrap/js/dist/scrollspy';
import { initScrollspy, scrollspy } from '../../src/components/scrollspy/index';

describe('scrollspy constants', () => {
  it('exports expected attribute references', () => {
    expect(scrollspy.spy).toBe('scroll');
    expect(scrollspy.attrTarget).toBe('data-bs-target');
    expect(scrollspy.attrSmoothScroll).toBe('data-bs-smooth-scroll');
    expect(scrollspy.attrRootMargin).toBe('data-bs-root-margin');
  });
});

describe('initScrollspy', () => {
  it('calls BsScrollSpy.getOrCreateInstance with the element', () => {
    const el = document.createElement('div');
    initScrollspy(el, { target: '#nav' });
    expect(BsScrollSpy.getOrCreateInstance).toHaveBeenCalledWith(
      el,
      expect.objectContaining({ target: '#nav' }),
    );
  });

  it('defaults rootMargin to 0px 0px -25%', () => {
    const el = document.createElement('div');
    initScrollspy(el, { target: '#nav' });
    expect(BsScrollSpy.getOrCreateInstance).toHaveBeenCalledWith(
      el,
      expect.objectContaining({ rootMargin: '0px 0px -25%' }),
    );
  });

  it('uses custom rootMargin when provided', () => {
    const el = document.createElement('div');
    initScrollspy(el, { target: '#nav', rootMargin: '0px 0px -50%' });
    expect(BsScrollSpy.getOrCreateInstance).toHaveBeenCalledWith(
      el,
      expect.objectContaining({ rootMargin: '0px 0px -50%' }),
    );
  });

  it('returns the Bootstrap ScrollSpy instance', () => {
    const el = document.createElement('div');
    const instance = initScrollspy(el, { target: '#nav' });
    expect(instance).toBeDefined();
  });
});
