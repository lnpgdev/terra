import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('logo SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/logo/_logo.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .logo as a block element', () => {
    expect(css).toContain('.logo');
    expect(css).toContain('display: block');
    expect(css).toContain('height: auto');
  });

  it('renders .logo-sm at 2rem', () => {
    expect(css).toContain('.logo-sm');
    expect(css).toContain('width: 2rem');
  });

  it('renders .logo-md at 4rem', () => {
    expect(css).toContain('.logo-md');
    expect(css).toContain('width: 4rem');
  });

  it('renders .logo-lg at 8rem', () => {
    expect(css).toContain('.logo-lg');
    expect(css).toContain('width: 8rem');
  });
});
