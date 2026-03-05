import { describe, it, expect } from 'vitest';
import { createLogo, logo } from '../../src/components/logo/index';

describe('logo constants', () => {
  it('exports expected class names', () => {
    expect(logo.base).toBe('logo');
    expect(logo.sizes.sm).toBe('logo-sm');
    expect(logo.sizes.md).toBe('logo-md');
    expect(logo.sizes.lg).toBe('logo-lg');
  });
});

describe('createLogo', () => {
  it('returns an img element by default', () => {
    const el = createLogo();
    expect(el.tagName).toBe('IMG');
  });

  it('applies base and default size class', () => {
    const el = createLogo();
    expect(el.classList.contains('logo')).toBe(true);
    expect(el.classList.contains('logo-md')).toBe(true);
  });

  it('applies sm size class', () => {
    const el = createLogo({ size: 'sm' });
    expect(el.classList.contains('logo-sm')).toBe(true);
  });

  it('applies lg size class', () => {
    const el = createLogo({ size: 'lg' });
    expect(el.classList.contains('logo-lg')).toBe(true);
  });

  it('sets default alt text', () => {
    const el = createLogo() as HTMLImageElement;
    expect(el.alt).toBe('LNPG Logo');
  });

  it('sets custom alt text', () => {
    const el = createLogo({ alt: 'My Logo' }) as HTMLImageElement;
    expect(el.alt).toBe('My Logo');
  });

  it('wraps in anchor when href is provided', () => {
    const el = createLogo({ href: '/home' });
    expect(el.tagName).toBe('A');
    expect((el as HTMLAnchorElement).href).toContain('/home');
    expect(el.querySelector('img')).not.toBeNull();
  });

  it('wraps in anchor when to is provided', () => {
    const el = createLogo({ to: '/dashboard' });
    expect(el.tagName).toBe('A');
  });

  it('throws when both href and to are provided', () => {
    expect(() => createLogo({ href: '/a', to: '/b' })).toThrow();
  });

  it('uses custom src when provided', () => {
    const el = createLogo({ src: '/custom.png' }) as HTMLImageElement;
    expect(el.src).toContain('custom.png');
  });
});
