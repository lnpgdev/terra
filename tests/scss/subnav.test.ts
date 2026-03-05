import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('subnav SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/subnav/_subnav.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .subnav as a space-between flex row', () => {
    expect(css).toContain('.subnav');
    expect(css).toContain('display: flex');
    expect(css).toContain('justify-content: space-between');
    expect(css).toContain('align-items: center');
  });

  it('.subnav has no top margin', () => {
    expect(css).toContain('margin-top: 0');
  });

  it('renders .subnav-link with no text decoration', () => {
    expect(css).toContain('.subnav-link');
    expect(css).toContain('text-decoration: none');
    expect(css).toContain('display: inline-flex');
  });

  it('.subnav-link shows underline on hover', () => {
    expect(css).toContain('.subnav-link:hover');
    expect(css).toContain('text-decoration: underline');
  });
});
