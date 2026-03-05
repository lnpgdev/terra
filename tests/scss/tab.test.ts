import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('tab SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/tab/_tab.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('removes border-radius from nav-tabs nav links', () => {
    expect(css).toContain('.nav-tabs .nav-link');
    expect(css).toContain('border-radius: 0');
  });

  it('removes border-radius from nav-pills nav links', () => {
    expect(css).toContain('.nav-pills .nav-link');
  });

  it('renders .nav-sm with reduced font-size', () => {
    expect(css).toContain('.nav-sm .nav-link');
    expect(css).toContain('font-size: 0.8rem');
  });

  it('renders .nav-lg with increased font-size', () => {
    expect(css).toContain('.nav-lg .nav-link');
    expect(css).toContain('font-size: 1rem');
  });

  it('renders .nav-scroll with horizontal overflow', () => {
    expect(css).toContain('.nav-scroll');
    expect(css).toContain('overflow-x: auto');
    expect(css).toContain('flex-wrap: nowrap');
  });
});
