import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('toast SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/toast/_toast.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('removes border-radius via custom property', () => {
    expect(css).toContain('.toast');
    expect(css).toContain('--bs-toast-border-radius: 0');
  });

  it('renders .toast-info variant', () => {
    expect(css).toContain('.toast-info');
  });

  it('renders .toast-success variant', () => {
    expect(css).toContain('.toast-success');
  });

  it('renders .toast-warning variant', () => {
    expect(css).toContain('.toast-warning');
  });

  it('renders .toast-danger variant', () => {
    expect(css).toContain('.toast-danger');
  });

  it('each variant sets --bs-toast-bg', () => {
    const occurrences = (css.match(/--bs-toast-bg:/g) ?? []).length;
    expect(occurrences).toBeGreaterThanOrEqual(4);
  });

  it('each variant sets --bs-toast-color', () => {
    const occurrences = (css.match(/--bs-toast-color:/g) ?? []).length;
    expect(occurrences).toBeGreaterThanOrEqual(4);
  });

  it('renders container spacing rule', () => {
    expect(css).toContain('.toast-container');
    expect(css).toContain('margin-bottom: 0');
  });
});
