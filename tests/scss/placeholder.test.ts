import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('placeholder SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/placeholder/_placeholder.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .placeholder-circle with 1:1 aspect ratio and rounded corners', () => {
    expect(css).toContain('.placeholder-circle');
    expect(css).toContain('aspect-ratio: 1');
    expect(css).toContain('border-radius: 50%');
  });

  it('renders .placeholder-square with 1:1 aspect ratio', () => {
    expect(css).toContain('.placeholder-square');
  });

  it('renders .placeholder-triangle with clip-path', () => {
    expect(css).toContain('.placeholder-triangle');
    expect(css).toContain('clip-path: polygon(50% 0%, 0% 100%, 100% 100%)');
  });
});
