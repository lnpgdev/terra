import { describe, it, expect } from 'vitest';
import { createCard, createCardAccent, card } from '../../src/components/card/index';

describe('card constants', () => {
  it('exports expected class names', () => {
    expect(card.base).toBe('card');
    expect(card.variants.outlined).toBe('card-outlined');
    expect(card.variants.elevated).toBe('card-elevated');
    expect(card.variants.muted).toBe('card-muted');
    expect(card.sizes.sm).toBe('card-sm');
    expect(card.sizes.lg).toBe('card-lg');
    expect(card.radius.sm).toBe('card-radius-sm');
    expect(card.radius.md).toBe('card-radius-md');
    expect(card.radius.lg).toBe('card-radius-lg');
    expect(card.hasAccent).toBe('card-has-accent');
    expect(card.accent.base).toBe('card-accent');
    expect(card.accent.tones.success).toBe('card-accent-success');
    expect(card.accent.tones.neutral).toBe('card-accent-neutral');
    expect(card.accent.positions.left).toBe('card-accent-left');
    expect(card.accent.positions.bottom).toBe('card-accent-bottom');
    expect(card.accent.thickness.xs).toBe('card-accent-xs');
    expect(card.accent.thickness.sm).toBe('card-accent-sm');
    expect(card.accent.thickness.md).toBe('card-accent-md');
  });
});

describe('createCardAccent', () => {
  it('returns a div with accent classes', () => {
    const el = createCardAccent({ position: 'left', tone: 'success' });
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('card-accent')).toBe(true);
    expect(el.classList.contains('card-accent-left')).toBe(true);
    expect(el.classList.contains('card-accent-success')).toBe(true);
  });

  it('applies default thickness sm', () => {
    const el = createCardAccent({ position: 'top', tone: 'danger' });
    expect(el.classList.contains('card-accent-sm')).toBe(true);
  });

  it('applies custom thickness', () => {
    const el = createCardAccent({ position: 'top', tone: 'info', thickness: 'md' });
    expect(el.classList.contains('card-accent-md')).toBe(true);
  });

  it('sets aria-hidden by default', () => {
    const el = createCardAccent({ position: 'top', tone: 'success' });
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets aria-label when provided', () => {
    const el = createCardAccent({ position: 'top', tone: 'danger', ariaLabel: 'Danger state' });
    expect(el.getAttribute('aria-label')).toBe('Danger state');
    expect(el.getAttribute('aria-hidden')).toBeNull();
  });

  it('applies xs thickness', () => {
    const el = createCardAccent({ position: 'top', tone: 'info', thickness: 'xs' });
    expect(el.classList.contains('card-accent-xs')).toBe(true);
  });

  it('applies bottom position', () => {
    const el = createCardAccent({ position: 'bottom', tone: 'warning' });
    expect(el.classList.contains('card-accent-bottom')).toBe(true);
  });
});

describe('createCard', () => {
  it('returns a div with card class', () => {
    const el = createCard();
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('card')).toBe(true);
  });

  it('default variant does not add extra class', () => {
    const el = createCard({ variant: 'default' });
    expect(el.classList.contains('card-outlined')).toBe(false);
    expect(el.classList.contains('card-elevated')).toBe(false);
  });

  it('applies elevated variant class', () => {
    const el = createCard({ variant: 'elevated' });
    expect(el.classList.contains('card-elevated')).toBe(true);
  });

  it('applies radius class', () => {
    const el = createCard({ radius: 'lg' });
    expect(el.classList.contains('card-radius-lg')).toBe(true);
  });

  it('does not apply radius class for none', () => {
    const el = createCard({ radius: 'none' });
    expect(el.classList.contains('card-radius-none')).toBe(false);
  });

  it('applies card-has-accent and prepends accent element', () => {
    const el = createCard({ accent: { position: 'left', tone: 'success' } });
    expect(el.classList.contains('card-has-accent')).toBe(true);
    expect(el.querySelector('.card-accent')).not.toBeNull();
  });

  it('applies sm size', () => {
    const el = createCard({ size: 'sm' });
    expect(el.classList.contains('card-sm')).toBe(true);
  });

  it('applies lg size', () => {
    const el = createCard({ size: 'lg' });
    expect(el.classList.contains('card-lg')).toBe(true);
  });

  it('applies outlined variant class', () => {
    const el = createCard({ variant: 'outlined' });
    expect(el.classList.contains('card-outlined')).toBe(true);
  });

  it('applies muted variant class', () => {
    const el = createCard({ variant: 'muted' });
    expect(el.classList.contains('card-muted')).toBe(true);
  });

  it('applies sm radius class', () => {
    const el = createCard({ radius: 'sm' });
    expect(el.classList.contains('card-radius-sm')).toBe(true);
  });
});
