import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('select SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/select/_select.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('targets .form-select', () => {
    expect(css).toContain('.form-select');
  });

  it('sets --bs-form-select-border-radius to 0', () => {
    expect(css).toContain('--bs-form-select-border-radius: 0');
  });
});
