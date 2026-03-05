import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('badge SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/badge/_badge.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .badge-square with no border-radius', () => {
    expect(css).toContain('.badge-square');
    expect(css).toContain('border-radius: 0');
  });

  it('renders outline variants', () => {
    expect(css).toContain('.badge-outline-success');
    expect(css).toContain('.badge-outline-warning');
    expect(css).toContain('.badge-outline-danger');
  });

  it('renders link variants', () => {
    expect(css).toContain('.badge-link-success');
    expect(css).toContain('.badge-link-warning');
    expect(css).toContain('.badge-link-danger');
  });

  it('renders size modifiers', () => {
    expect(css).toContain('.badge-sm');
    expect(css).toContain('.badge-lg');
  });

  it('sets font-size for sm and lg', () => {
    expect(css).toContain('font-size: 0.6em');
    expect(css).toContain('font-size: 0.9em');
  });

  it('renders .badge-dot as a circle', () => {
    expect(css).toContain('.badge-dot');
    expect(css).toContain('border-radius: 50%');
    expect(css).toContain('width: 0.75rem');
    expect(css).toContain('height: 0.75rem');
  });

  it('renders dot tone variants', () => {
    expect(css).toContain('.badge-dot-success');
    expect(css).toContain('.badge-dot-warning');
    expect(css).toContain('.badge-dot-danger');
  });

  it('renders dot outline variants', () => {
    expect(css).toContain('.badge-dot-outline-success');
    expect(css).toContain('.badge-dot-outline-warning');
    expect(css).toContain('.badge-dot-outline-danger');
  });

  it('renders .badge-triangle', () => {
    expect(css).toContain('.badge-triangle');
  });

  it('renders triangle tone variants', () => {
    expect(css).toContain('.badge-triangle-success');
    expect(css).toContain('.badge-triangle-warning');
    expect(css).toContain('.badge-triangle-danger');
  });

  it('renders edge placement helpers', () => {
    expect(css).toContain('.badge-top');
    expect(css).toContain('.badge-right');
    expect(css).toContain('.badge-bottom');
    expect(css).toContain('.badge-left');
  });

  it('renders corner placement helpers', () => {
    expect(css).toContain('.badge-top-right');
    expect(css).toContain('.badge-top-left');
    expect(css).toContain('.badge-bottom-right');
    expect(css).toContain('.badge-bottom-left');
  });
});
