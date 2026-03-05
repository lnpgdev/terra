import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('search-bar SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/search-bar/_search-bar.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .search-bar as a flex container', () => {
    expect(css).toContain('.search-bar');
    expect(css).toContain('display: flex');
    expect(css).toContain('align-items: center');
    expect(css).toContain('overflow: hidden');
  });

  it('renders focus-within state on .search-bar', () => {
    expect(css).toContain('.search-bar:focus-within');
    expect(css).toContain('border-color: #86b7fe');
  });

  it('renders .search-bar-icon', () => {
    expect(css).toContain('.search-bar-icon');
    expect(css).toContain('pointer-events: none');
  });

  it('renders .search-bar-tokens', () => {
    expect(css).toContain('.search-bar-tokens');
    expect(css).toContain('flex-wrap: wrap');
  });

  it('renders .search-bar-token', () => {
    expect(css).toContain('.search-bar-token');
    expect(css).toContain('white-space: nowrap');
  });

  it('renders .search-bar-token-remove', () => {
    expect(css).toContain('.search-bar-token-remove');
    expect(css).toContain('cursor: pointer');
  });

  it('renders .search-bar-input', () => {
    expect(css).toContain('.search-bar-input');
    expect(css).toContain('flex: 1');
    expect(css).toContain('outline: none');
  });

  it('renders .search-bar-sm size variant', () => {
    expect(css).toContain('.search-bar-sm .search-bar-input');
    expect(css).toContain('font-size: 0.875rem');
  });

  it('renders .search-bar-lg size variant', () => {
    expect(css).toContain('.search-bar-lg .search-bar-input');
    expect(css).toContain('font-size: 1.25rem');
  });

  it('renders .search-bar-rounded with pill border-radius', () => {
    expect(css).toContain('.search-bar-rounded');
    expect(css).toContain('border-radius: 50rem');
  });

  it('renders disabled state', () => {
    expect(css).toContain('opacity: 0.65');
  });
});
