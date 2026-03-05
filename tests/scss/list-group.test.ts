import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('list-group SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/list-group/_list-group.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('targets .list-group', () => {
    expect(css).toContain('.list-group');
  });

  it('sets --bs-list-group-border-radius to 0', () => {
    expect(css).toContain('--bs-list-group-border-radius: 0');
  });

  it('sets --bs-list-group-item-border-radius to 0', () => {
    expect(css).toContain('--bs-list-group-item-border-radius: 0');
  });
});
