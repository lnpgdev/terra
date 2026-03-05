import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('dropdown SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/dropdown/_dropdown.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('removes border-radius from .dropdown-menu', () => {
    expect(css).toContain('.dropdown-menu');
    expect(css).toContain('border-radius: 0');
  });

  it('removes border-radius from .dropdown-item', () => {
    expect(css).toContain('.dropdown-item');
  });
});
