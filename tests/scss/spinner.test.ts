import { describe, it, expect } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('spinner SCSS', () => {
  it('compiles without error', () => {
    const css = compileSass('src/components/spinner/_spinner.scss');
    expect(typeof css).toBe('string');
  });

  it('produces no CSS rules (Bootstrap owns all styling)', () => {
    const css = compileSass('src/components/spinner/_spinner.scss');
    expect(css).not.toMatch(/\{[\s\S]*?\}/);
  });
});
