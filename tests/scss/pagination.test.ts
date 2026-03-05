import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('pagination SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/pagination/_pagination.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('targets .pagination', () => {
    expect(css).toContain('.pagination');
  });

  it('sets --bs-pagination-border-radius to 0', () => {
    expect(css).toContain('--bs-pagination-border-radius: 0');
  });
});
