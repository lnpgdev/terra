import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('table SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/table/_table.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .table-muted with secondary background token', () => {
    expect(css).toContain('.table-muted');
    expect(css).toContain('--bs-table-bg');
  });

  it('renders .table-scrollable with fixed max-height and scroll', () => {
    expect(css).toContain('.table-scrollable');
    expect(css).toContain('max-height: 400px');
    expect(css).toContain('overflow-y: auto');
  });

  it('renders sticky thead cells inside .table-scrollable', () => {
    expect(css).toContain('.table-scrollable thead th');
    expect(css).toContain('position: sticky');
    expect(css).toContain('top: 0');
  });

  it('renders .table-row-disabled with reduced opacity', () => {
    expect(css).toContain('.table-row-disabled');
    expect(css).toContain('opacity: 0.5');
    expect(css).toContain('pointer-events: none');
    expect(css).toContain('user-select: none');
  });

  it('renders .table-section-header', () => {
    expect(css).toContain('.table-section-header');
    expect(css).toContain('display: flex');
    expect(css).toContain('align-items: baseline');
  });

  it('renders .table-section-footer', () => {
    expect(css).toContain('.table-section-footer');
  });

  it('renders .table-section-meta with small font', () => {
    expect(css).toContain('.table-section-meta');
    expect(css).toContain('font-size: 0.875em');
  });
});
