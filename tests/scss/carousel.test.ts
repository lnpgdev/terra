import { describe, it, expect } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('carousel SCSS', () => {
  it('compiles without error', () => {
    const css = compileSass('src/components/carousel/_carousel.scss');
    expect(typeof css).toBe('string');
  });

  it('produces no CSS rules (Bootstrap owns all styling)', () => {
    const css = compileSass('src/components/carousel/_carousel.scss');
    expect(css).not.toMatch(/\{[\s\S]*?\}/);
  });
});
