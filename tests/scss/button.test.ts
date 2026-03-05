import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('button SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/button/_button.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('targets .btn', () => {
    expect(css).toContain('.btn');
  });

  it('sets --bs-btn-border-radius to 0', () => {
    expect(css).toContain('--bs-btn-border-radius: 0');
  });
});
