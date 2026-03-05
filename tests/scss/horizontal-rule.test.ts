import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('horizontal-rule SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/horizontal-rule/_horizontal-rule.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders tone variants', () => {
    expect(css).toContain('.hr-success');
    expect(css).toContain('.hr-danger');
    expect(css).toContain('.hr-warning');
    expect(css).toContain('.hr-dark');
  });

  it('each tone sets opacity: 1', () => {
    const occurrences = (css.match(/opacity: 1/g) ?? []).length;
    expect(occurrences).toBeGreaterThanOrEqual(4);
  });

  it('renders .hr-sm at 1px', () => {
    expect(css).toContain('.hr-sm');
    expect(css).toContain('border-top-width: 1px');
  });

  it('renders .hr-md at 2px', () => {
    expect(css).toContain('.hr-md');
    expect(css).toContain('border-top-width: 2px');
  });

  it('renders .hr-lg at 4px', () => {
    expect(css).toContain('.hr-lg');
    expect(css).toContain('border-top-width: 4px');
  });
});
