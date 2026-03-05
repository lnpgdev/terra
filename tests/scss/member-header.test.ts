import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('member-header SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/member-header/_member-header.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .member-header as a relative flex container', () => {
    expect(css).toContain('.member-header');
    expect(css).toContain('display: flex');
    expect(css).toContain('align-items: center');
    expect(css).toContain('position: relative');
  });

  it('renders .member-header-right with auto left margin', () => {
    expect(css).toContain('.member-header .member-header-right');
    expect(css).toContain('margin-left: auto');
  });

  it('renders .member-header-center as absolutely centered', () => {
    expect(css).toContain('.member-header .member-header-center');
    expect(css).toContain('position: absolute');
    expect(css).toContain('left: 50%');
    expect(css).toContain('transform: translateX(-50%)');
  });
});
