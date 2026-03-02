import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('navbar SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/navbar/_navbar.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .navbar .navbar-item with no list-style', () => {
    expect(css).toContain('.navbar .navbar-item');
    expect(css).toContain('list-style: none');
  });

  it('renders .navbar .navbar-link as a block', () => {
    expect(css).toContain('.navbar .navbar-link');
    expect(css).toContain('display: block');
    expect(css).toContain('text-decoration: none');
  });

  it('.navbar-link uses navbar colour tokens', () => {
    expect(css).toContain('--bs-navbar-color');
    expect(css).toContain('--bs-navbar-hover-color');
    expect(css).toContain('--bs-navbar-active-color');
    expect(css).toContain('--bs-navbar-disabled-color');
  });

  it('renders .navbar .navbar-actions as a flex row', () => {
    expect(css).toContain('.navbar .navbar-actions');
    expect(css).toContain('display: flex');
    expect(css).toContain('margin-left: auto');
  });
});
