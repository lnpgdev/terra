import { describe, it, expect } from 'vitest';
import { createBadge, badge } from '../../src/components/badge/index';

describe('badge constants', () => {
  it('exports expected class names', () => {
    expect(badge.base).toBe('badge');
    expect(badge.shapes.pill).toBe('rounded-pill');
    expect(badge.shapes.dot).toBe('badge-dot');
    expect(badge.shapes.triangle).toBe('badge-triangle');
    expect(badge.solid.success).toBe('text-bg-success');
    expect(badge.outline.danger).toBe('badge-outline-danger');
  });
});

describe('createBadge', () => {
  it('creates a span by default', () => {
    const el = createBadge();
    expect(el.tagName).toBe('SPAN');
  });

  it('creates an anchor when href is provided', () => {
    const el = createBadge({ href: '/link' });
    expect(el.tagName).toBe('A');
  });

  it('pill shape gets badge and rounded-pill classes', () => {
    const el = createBadge({ shape: 'pill', tone: 'success' });
    expect(el.classList.contains('badge')).toBe(true);
    expect(el.classList.contains('rounded-pill')).toBe(true);
    expect(el.classList.contains('text-bg-success')).toBe(true);
  });

  it('dot shape does not use badge base class', () => {
    const el = createBadge({ shape: 'dot', tone: 'danger' });
    expect(el.classList.contains('badge-dot')).toBe(true);
    expect(el.classList.contains('badge')).toBe(false);
    expect(el.classList.contains('badge-dot-danger')).toBe(true);
  });

  it('triangle shape', () => {
    const el = createBadge({ shape: 'triangle', tone: 'warning' });
    expect(el.classList.contains('badge-triangle')).toBe(true);
    expect(el.classList.contains('badge-triangle-warning')).toBe(true);
  });

  it('outline variant', () => {
    const el = createBadge({ shape: 'pill', variant: 'outline', tone: 'success' });
    expect(el.classList.contains('badge-outline-success')).toBe(true);
  });

  it('caps numeric label at max', () => {
    const el = createBadge({ shape: 'pill', label: '150', max: 99 });
    expect(el.textContent).toBe('99+');
  });

  it('does not cap when label is within max', () => {
    const el = createBadge({ shape: 'pill', label: '50', max: 99 });
    expect(el.textContent).toBe('50');
  });

  it('applies direction class', () => {
    const el = createBadge({ shape: 'dot', direction: 'top-right' });
    expect(el.classList.contains('badge-top-right')).toBe(true);
  });

  it('sets aria-label and role=img for non-pill shapes with ariaLabel', () => {
    const el = createBadge({ shape: 'dot', ariaLabel: 'New messages' });
    expect(el.getAttribute('aria-label')).toBe('New messages');
    expect(el.getAttribute('role')).toBe('img');
  });

  it('sets aria-hidden for non-pill shapes without ariaLabel', () => {
    const el = createBadge({ shape: 'dot' });
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies tooltip data attributes', () => {
    const el = createBadge({ tooltip: 'My tip', tooltipPosition: 'bottom' });
    expect(el.getAttribute('data-bs-toggle')).toBe('tooltip');
    expect(el.getAttribute('data-bs-title')).toBe('My tip');
    expect(el.getAttribute('data-bs-placement')).toBe('bottom');
  });
});
