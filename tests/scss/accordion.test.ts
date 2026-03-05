import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('accordion SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/accordion/_accordion.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('removes border-radius via custom properties', () => {
    expect(css).toContain('.accordion');
    expect(css).toContain('--bs-accordion-border-radius: 0');
    expect(css).toContain('--bs-accordion-inner-border-radius: 0');
  });

  it('renders .accordion-notification .accordion-item with left accent bar', () => {
    expect(css).toContain('.accordion-notification .accordion-item');
    expect(css).toContain('border-left: 4px solid');
  });

  it('renders tone modifier classes', () => {
    expect(css).toContain('.accordion-item-info');
    expect(css).toContain('.accordion-item-success');
    expect(css).toContain('.accordion-item-warning');
    expect(css).toContain('.accordion-item-danger');
  });

  it('each tone class sets --accordion-accent-color', () => {
    const occurrences = (css.match(/--accordion-accent-color:/g) ?? []).length;
    expect(occurrences).toBeGreaterThanOrEqual(5);
  });
});
