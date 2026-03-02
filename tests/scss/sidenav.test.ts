import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('sidenav SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/sidenav/_sidenav.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .sidenav .sidenav-tab as a fixed element', () => {
    expect(css).toContain('.sidenav .sidenav-tab');
    expect(css).toContain('position: fixed');
  });

  it('.sidenav-tab has z-index for stacking above navbar', () => {
    expect(css).toContain('z-index: 1030');
  });

  it('renders .sidenav .sidenav-tab-content', () => {
    expect(css).toContain('.sidenav .sidenav-tab-content');
    expect(css).toContain('flex-direction: column');
  });

  it('renders .sidenav-tab-label with uppercase text', () => {
    expect(css).toContain('.sidenav .sidenav-tab-label');
    expect(css).toContain('text-transform: uppercase');
    expect(css).toContain('letter-spacing: 0.08em');
  });

  it('anchors left-side tab to left: 0', () => {
    expect(css).toContain('left: 0');
  });

  it('anchors right-side tab to right: 0', () => {
    expect(css).toContain('right: 0');
  });

  it('centers middle tab vertically', () => {
    expect(css).toContain('top: 50%');
    expect(css).toContain('transform: translateY(-50%)');
  });

  it('renders .sidenav-rounded modifier', () => {
    expect(css).toContain('.sidenav-rounded');
    expect(css).toContain('--bs-border-radius');
  });
});
