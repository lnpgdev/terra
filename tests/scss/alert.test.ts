import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('alert SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/alert/_alert.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('targets .alert', () => {
    expect(css).toContain('.alert');
  });

  it('removes border-radius via custom property', () => {
    expect(css).toContain('--bs-alert-border-radius: 0');
  });

  it('removes border via custom property', () => {
    expect(css).toContain('--bs-alert-border: 0');
  });

  it('sets font-weight to bold', () => {
    expect(css).toContain('font-weight: bold');
  });

  it('sets text-align to center', () => {
    expect(css).toContain('text-align: center');
  });

  it('sets text-transform to uppercase', () => {
    expect(css).toContain('text-transform: uppercase');
  });

  it('adds text-shadow', () => {
    expect(css).toContain('text-shadow:');
  });

  it('renders .alert .alert-link as block', () => {
    expect(css).toContain('.alert .alert-link');
    expect(css).toContain('display: block');
  });

  it('renders .alert-bordered with a border', () => {
    expect(css).toContain('.alert-bordered');
    expect(css).toContain('border:');
  });
});
