import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/tooltip', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({}),
  },
}));

import { addTooltip, tooltip } from '../../src/components/tooltip/index';

describe('tooltip constants', () => {
  it('exports expected values', () => {
    expect(tooltip.toggle).toBe('tooltip');
    expect(tooltip.selector).toBe('[data-bs-toggle="tooltip"]');
  });
});

describe('addTooltip', () => {
  it('sets data-bs-toggle="tooltip" on the element', () => {
    const el = document.createElement('button');
    addTooltip(el, { title: 'Help text' });
    expect(el.getAttribute('data-bs-toggle')).toBe('tooltip');
  });

  it('sets data-bs-title', () => {
    const el = document.createElement('button');
    addTooltip(el, { title: 'My tip' });
    expect(el.getAttribute('data-bs-title')).toBe('My tip');
  });

  it('sets data-bs-placement when provided', () => {
    const el = document.createElement('button');
    addTooltip(el, { title: 'Tip', placement: 'bottom' });
    expect(el.getAttribute('data-bs-placement')).toBe('bottom');
  });

  it('does not set data-bs-placement when omitted', () => {
    const el = document.createElement('button');
    addTooltip(el, { title: 'Tip' });
    expect(el.getAttribute('data-bs-placement')).toBeNull();
  });
});
