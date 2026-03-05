import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('tooltip SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/tooltip/_tooltip.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('targets .tooltip', () => {
    expect(css).toContain('.tooltip');
  });

  it('sets --bs-tooltip-border-radius to 0', () => {
    expect(css).toContain('--bs-tooltip-border-radius: 0');
  });
});
