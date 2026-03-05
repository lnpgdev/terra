import { describe, it, expect } from 'vitest';
import { createHr, hr } from '../../src/components/horizontal-rule/index';

describe('hr constants', () => {
  it('exports tone class names', () => {
    expect(hr.tones.success).toBe('hr-success');
    expect(hr.tones.danger).toBe('hr-danger');
    expect(hr.tones.warning).toBe('hr-warning');
    expect(hr.tones.dark).toBe('hr-dark');
  });

  it('exports size class names', () => {
    expect(hr.sizes.sm).toBe('hr-sm');
    expect(hr.sizes.md).toBe('hr-md');
    expect(hr.sizes.lg).toBe('hr-lg');
  });
});

describe('createHr', () => {
  it('returns an hr element', () => {
    const el = createHr();
    expect(el.tagName).toBe('HR');
  });

  it('has no className by default', () => {
    const el = createHr();
    expect(el.className).toBe('');
  });

  it('applies tone class', () => {
    const el = createHr({ tone: 'success' });
    expect(el.classList.contains('hr-success')).toBe(true);
  });

  it('applies size class', () => {
    const el = createHr({ size: 'lg' });
    expect(el.classList.contains('hr-lg')).toBe(true);
  });

  it('applies both tone and size', () => {
    const el = createHr({ tone: 'danger', size: 'md' });
    expect(el.classList.contains('hr-danger')).toBe(true);
    expect(el.classList.contains('hr-md')).toBe(true);
  });

  it('applies sm size class', () => {
    const el = createHr({ size: 'sm' });
    expect(el.classList.contains('hr-sm')).toBe(true);
  });

  it('applies warning tone', () => {
    const el = createHr({ tone: 'warning' });
    expect(el.classList.contains('hr-warning')).toBe(true);
  });

  it('applies dark tone', () => {
    const el = createHr({ tone: 'dark' });
    expect(el.classList.contains('hr-dark')).toBe(true);
  });
});
