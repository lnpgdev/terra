import { describe, it, expect } from 'vitest';
import { createLabel, labelComponent } from '../../src/components/label/index';

describe('labelComponent constants', () => {
  it('exports expected class names', () => {
    expect(labelComponent.base).toBe('label');
    expect(labelComponent.shapes.square).toBe('label-square');
    expect(labelComponent.shapes.pill).toBe('label-pill');
    expect(labelComponent.solid.success).toBe('label-solid-success');
    expect(labelComponent.outline.danger).toBe('label-outline-danger');
    expect(labelComponent.ghost.info).toBe('label-ghost-info');
  });
});

describe('createLabel', () => {
  it('returns a span with base class', () => {
    const el = createLabel({ label: 'Active' });
    expect(el.tagName).toBe('SPAN');
    expect(el.classList.contains('label')).toBe(true);
  });

  it('defaults to square shape', () => {
    const el = createLabel({ label: 'Test' });
    expect(el.classList.contains('label-square')).toBe(true);
  });

  it('applies pill shape', () => {
    const el = createLabel({ label: 'Test', shape: 'pill' });
    expect(el.classList.contains('label-pill')).toBe(true);
  });

  it('applies rounded shape', () => {
    const el = createLabel({ label: 'Test', shape: 'rounded' });
    expect(el.classList.contains('label-rounded')).toBe(true);
  });

  it('applies solid tone', () => {
    const el = createLabel({ label: 'Test', tone: 'success', variant: 'solid' });
    expect(el.classList.contains('label-solid-success')).toBe(true);
  });

  it('applies outline tone', () => {
    const el = createLabel({ label: 'Test', tone: 'danger', variant: 'outline' });
    expect(el.classList.contains('label-outline-danger')).toBe(true);
  });

  it('applies ghost tone', () => {
    const el = createLabel({ label: 'Test', tone: 'warning', variant: 'ghost' });
    expect(el.classList.contains('label-ghost-warning')).toBe(true);
  });

  it('applies sm size', () => {
    const el = createLabel({ label: 'Test', size: 'sm' });
    expect(el.classList.contains('label-sm')).toBe(true);
  });

  it('renders label text', () => {
    const el = createLabel({ label: 'My Label' });
    expect(el.textContent).toContain('My Label');
  });

  it('renders icon element before text', () => {
    const el = createLabel({ label: 'Active', icon: 'bi bi-check' });
    const icon = el.querySelector('i');
    expect(icon).not.toBeNull();
    expect(icon?.className).toBe('bi bi-check');
  });

  it('applies tooltip data attributes', () => {
    const el = createLabel({ label: 'Test', tooltip: 'Info', tooltipPosition: 'top' });
    expect(el.getAttribute('data-bs-toggle')).toBe('tooltip');
    expect(el.getAttribute('data-bs-title')).toBe('Info');
    expect(el.getAttribute('data-bs-placement')).toBe('top');
  });
});
