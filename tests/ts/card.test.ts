import { describe, it, expect } from 'vitest';
import { createCard, createCardAccent, card } from '../../src/components/card/index';

describe('card constants', () => {
  it('exports expected class names', () => {
    expect(card.base).toBe('card');
    expect(card.variants.elevated).toBe('card-elevated');
    expect(card.radius.md).toBe('card-radius-md');
    expect(card.hasAccent).toBe('card-has-accent');
    expect(card.accent.base).toBe('card-accent');
    expect(card.accent.tones.success).toBe('card-accent-success');
    expect(card.accent.positions.left).toBe('card-accent-left');
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
});
