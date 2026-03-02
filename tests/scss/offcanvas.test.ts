import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('offcanvas SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/offcanvas/_offcanvas.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .offcanvas-footer nested inside .offcanvas', () => {
    expect(css).toContain('.offcanvas .offcanvas-footer');
  });

  it('.offcanvas-footer uses offcanvas padding tokens', () => {
    expect(css).toContain('--bs-offcanvas-padding-y');
    expect(css).toContain('--bs-offcanvas-padding-x');
  });

  it('.offcanvas-footer has a top border using offcanvas border tokens', () => {
    expect(css).toContain('border-top:');
    expect(css).toContain('--bs-offcanvas-border-color');
  });
});
