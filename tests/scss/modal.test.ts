import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('modal SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/modal/_modal.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .modal-page as hidden by default', () => {
    expect(css).toContain('.modal-page');
    expect(css).toContain('display: none');
  });

  it('renders .modal-page.active as visible', () => {
    expect(css).toContain('.modal-page.active');
    expect(css).toContain('display: block');
  });
});
