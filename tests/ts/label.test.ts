import { describe, it, expect } from 'vitest';
import { createLabel, labelComponent } from '../../src/components/label/index';

describe('labelComponent constants', () => {
  it('exports expected class names', () => {
    expect(labelComponent.base).toBe('label');
    expect(labelComponent.shapes.square).toBe('label-square');
    expect(labelComponent.shapes.rounded).toBe('label-rounded');
    expect(labelComponent.shapes.pill).toBe('label-pill');
    expect(labelComponent.sizes.sm).toBe('label-sm');
    expect(labelComponent.sizes.lg).toBe('label-lg');
    expect(labelComponent.solid.success).toBe('label-solid-success');
    expect(labelComponent.solid.info).toBe('label-solid-info');
    expect(labelComponent.solid.warning).toBe('label-solid-warning');
    expect(labelComponent.solid.danger).toBe('label-solid-danger');
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

  it('applies lg size', () => {
    const el = createLabel({ label: 'Test', size: 'lg' });
    expect(el.classList.contains('label-lg')).toBe(true);
  });

  it('applies no size class for md', () => {
    const el = createLabel({ label: 'Test', size: 'md' });
    expect(el.classList.contains('label-sm')).toBe(false);
    expect(el.classList.contains('label-lg')).toBe(false);
  });

  it('applies solid info tone', () => {
    const el = createLabel({ label: 'Test', tone: 'info', variant: 'solid' });
    expect(el.classList.contains('label-solid-info')).toBe(true);
  });

  it('applies solid warning tone', () => {
    const el = createLabel({ label: 'Test', tone: 'warning', variant: 'solid' });
    expect(el.classList.contains('label-solid-warning')).toBe(true);
  });

  it('applies solid danger tone', () => {
    const el = createLabel({ label: 'Test', tone: 'danger', variant: 'solid' });
    expect(el.classList.contains('label-solid-danger')).toBe(true);
  });

  it('does not set data-bs-placement when tooltipPosition is omitted', () => {
    const el = createLabel({ label: 'Test', tooltip: 'Hint' });
    expect(el.getAttribute('data-bs-placement')).toBeNull();
  });

  it('renders no icon element when icon is not provided', () => {
    const el = createLabel({ label: 'Test' });
    expect(el.querySelector('i')).toBeNull();
  });
});
