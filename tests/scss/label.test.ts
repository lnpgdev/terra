import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('label SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/label/_label.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .label base styles', () => {
    expect(css).toContain('.label');
    expect(css).toContain('display: inline-flex');
    expect(css).toContain('align-items: center');
    expect(css).toContain('white-space: nowrap');
  });

  it('renders shape variants', () => {
    expect(css).toContain('.label-square');
    expect(css).toContain('.label-rounded');
    expect(css).toContain('.label-pill');
  });

  it('.label-square sets border-radius: 0', () => {
    expect(css).toContain('border-radius: 0');
  });

  it('.label-pill sets border-radius: 50rem', () => {
    expect(css).toContain('border-radius: 50rem');
  });

  it('renders size variants', () => {
    expect(css).toContain('.label-sm');
    expect(css).toContain('.label-lg');
  });

  it('renders solid colour variants', () => {
    expect(css).toContain('.label-solid-info');
    expect(css).toContain('.label-solid-success');
    expect(css).toContain('.label-solid-warning');
    expect(css).toContain('.label-solid-danger');
  });

  it('renders outline colour variants', () => {
    expect(css).toContain('.label-outline-info');
    expect(css).toContain('.label-outline-success');
    expect(css).toContain('.label-outline-warning');
    expect(css).toContain('.label-outline-danger');
  });

  it('renders ghost colour variants', () => {
    expect(css).toContain('.label-ghost-info');
    expect(css).toContain('.label-ghost-success');
    expect(css).toContain('.label-ghost-warning');
    expect(css).toContain('.label-ghost-danger');
  });

  it('solid variants use --bs-* colour tokens', () => {
    expect(css).toContain('--bs-info');
    expect(css).toContain('--bs-success');
  });

  it('outline variants use transparent background', () => {
    const occurrences = (css.match(/background-color: transparent/g) ?? []).length;
    expect(occurrences).toBeGreaterThanOrEqual(4);
  });
});
