import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('card SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/card/_card.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('removes border-radius via custom properties', () => {
    expect(css).toContain('.card');
    expect(css).toContain('--bs-card-border-radius: 0');
    expect(css).toContain('--bs-card-inner-border-radius: 0');
  });

  it('renders .card-outlined', () => {
    expect(css).toContain('.card-outlined');
  });

  it('renders .card-elevated with box-shadow', () => {
    expect(css).toContain('.card-elevated');
    expect(css).toContain('box-shadow:');
  });

  it('renders .card-muted with secondary background', () => {
    expect(css).toContain('.card-muted');
    expect(css).toContain('--bs-secondary-bg');
  });

  it('renders radius modifier classes', () => {
    expect(css).toContain('.card-radius-sm');
    expect(css).toContain('.card-radius-md');
    expect(css).toContain('.card-radius-lg');
  });

  it('renders size modifier classes', () => {
    expect(css).toContain('.card-sm');
    expect(css).toContain('.card-lg');
  });

  it('renders .card-has-accent with overflow hidden', () => {
    expect(css).toContain('.card-has-accent');
    expect(css).toContain('overflow: hidden');
  });

  it('renders .card-accent with absolute positioning', () => {
    expect(css).toContain('.card-accent');
    expect(css).toContain('position: absolute');
  });

  it('renders accent edge position classes', () => {
    expect(css).toContain('.card-accent-top');
    expect(css).toContain('.card-accent-bottom');
    expect(css).toContain('.card-accent-left');
    expect(css).toContain('.card-accent-right');
  });

  it('renders accent thickness classes', () => {
    expect(css).toContain('.card-accent-xs');
    expect(css).toContain('.card-accent-sm');
    expect(css).toContain('.card-accent-md');
  });

  it('renders accent tone classes', () => {
    expect(css).toContain('.card-accent-info');
    expect(css).toContain('.card-accent-success');
    expect(css).toContain('.card-accent-warning');
    expect(css).toContain('.card-accent-danger');
    expect(css).toContain('.card-accent-neutral');
  });
});
