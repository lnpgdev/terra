import { describe, it, expect } from 'vitest';
import { createPlaceholder, placeholder } from '../../src/components/placeholder/index';

describe('placeholder constants', () => {
  it('exports expected class names', () => {
    expect(placeholder.base).toBe('placeholder');
    expect(placeholder.glow).toBe('placeholder-glow');
    expect(placeholder.wave).toBe('placeholder-wave');
    expect(placeholder.circle).toBe('placeholder-circle');
    expect(placeholder.square).toBe('placeholder-square');
    expect(placeholder.triangle).toBe('placeholder-triangle');
  });
});

describe('createPlaceholder', () => {
  it('returns a span with base class', () => {
    const el = createPlaceholder();
    expect(el.tagName).toBe('SPAN');
    expect(el.classList.contains('placeholder')).toBe(true);
  });

  it('applies column width class', () => {
    const el = createPlaceholder({ cols: 6 });
    expect(el.classList.contains('col-6')).toBe(true);
  });

  it('wraps in glow container when animation is glow', () => {
    const el = createPlaceholder({ animation: 'glow' });
    expect(el.classList.contains('placeholder-glow')).toBe(true);
    expect(el.querySelector('.placeholder')).not.toBeNull();
  });

  it('wraps in wave container when animation is wave', () => {
    const el = createPlaceholder({ animation: 'wave' });
    expect(el.classList.contains('placeholder-wave')).toBe(true);
  });

  it('applies circle shape class', () => {
    const el = createPlaceholder({ shape: 'circle' });
    expect(el.classList.contains('placeholder-circle')).toBe(true);
  });

  it('applies square shape class', () => {
    const el = createPlaceholder({ shape: 'square' });
    expect(el.classList.contains('placeholder-square')).toBe(true);
  });

  it('applies triangle shape class', () => {
    const el = createPlaceholder({ shape: 'triangle' });
    expect(el.classList.contains('placeholder-triangle')).toBe(true);
  });

  it('sets inline width style', () => {
    const el = createPlaceholder({ width: '3rem' });
    expect(el.style.width).toBe('3rem');
  });

  it('does not apply col class when cols is not specified', () => {
    const el = createPlaceholder();
    const colClass = Array.from(el.classList).find((c) => c.startsWith('col-'));
    expect(colClass).toBeUndefined();
  });

  it('does not apply shape class when shape is not specified', () => {
    const el = createPlaceholder();
    expect(el.classList.contains('placeholder-circle')).toBe(false);
    expect(el.classList.contains('placeholder-square')).toBe(false);
  });

  it('applies col-12 for full-width columns', () => {
    const el = createPlaceholder({ cols: 12 });
    expect(el.classList.contains('col-12')).toBe(true);
  });
});
