import { describe, it, expect, beforeAll } from 'vitest';
import { compileSass } from '../utils/compileSass';

describe('notification SCSS', () => {
  let css: string;

  beforeAll(() => {
    css = compileSass('src/components/notification/_notification.scss');
  });

  it('compiles without error', () => {
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('renders .notification with a bottom border', () => {
    expect(css).toContain('.notification');
    expect(css).toContain('border-bottom: 1px solid');
  });

  it('renders .notification-header as a flex row', () => {
    expect(css).toContain('.notification-header');
    expect(css).toContain('display: flex');
    expect(css).toContain('align-items: center');
    expect(css).toContain('text-align: left');
  });

  it('renders hover state for expandable notification header', () => {
    expect(css).toContain('.notification-expandable .notification-header');
    expect(css).toContain('cursor: pointer');
  });

  it('renders .notification-unread-dot as a small circle', () => {
    expect(css).toContain('.notification-unread-dot');
    expect(css).toContain('border-radius: 50%');
    expect(css).toContain('width: 0.5rem');
    expect(css).toContain('height: 0.5rem');
  });

  it('renders .notification-content as a flex-grow area', () => {
    expect(css).toContain('.notification-content');
    expect(css).toContain('flex: 1');
  });

  it('renders .notification-title with ellipsis overflow', () => {
    expect(css).toContain('.notification-title');
    expect(css).toContain('text-overflow: ellipsis');
    expect(css).toContain('white-space: nowrap');
  });

  it('renders .notification-subtitle with small font', () => {
    expect(css).toContain('.notification-subtitle');
    expect(css).toContain('font-size: 0.75rem');
  });

  it('renders .notification-time', () => {
    expect(css).toContain('.notification-time');
  });

  it('renders .notification-chevron', () => {
    expect(css).toContain('.notification-chevron');
    expect(css).toContain('border-right: 1.5px solid');
    expect(css).toContain('border-bottom: 1.5px solid');
  });

  it('rotates chevron when header is expanded', () => {
    expect(css).toContain('.notification-header[aria-expanded');
    expect(css).toContain('.notification-chevron');
    expect(css).toContain('rotate(-135deg)');
  });

  it('bolds title when notification is unread', () => {
    expect(css).toContain('.notification-unread .notification-title');
    expect(css).toContain('font-weight: 600');
  });

  it('renders .notification-body', () => {
    expect(css).toContain('.notification-body');
  });
});
