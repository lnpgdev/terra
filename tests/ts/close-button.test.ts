import { describe, it, expect, vi } from 'vitest';
import { createCloseButton, closeButton } from '../../src/components/close-button/index';

describe('closeButton constants', () => {
  it('exports expected class names', () => {
    expect(closeButton.base).toBe('btn-close');
    expect(closeButton.white).toBe('btn-close-white');
  });
});

describe('createCloseButton', () => {
  it('returns a button element with base class', () => {
    const btn = createCloseButton();
    expect(btn.tagName).toBe('BUTTON');
    expect(btn.type).toBe('button');
    expect(btn.classList.contains('btn-close')).toBe(true);
  });

  it('sets default aria-label to Close', () => {
    const btn = createCloseButton();
    expect(btn.getAttribute('aria-label')).toBe('Close');
  });

  it('applies custom label', () => {
    const btn = createCloseButton({ label: 'Dismiss' });
    expect(btn.getAttribute('aria-label')).toBe('Dismiss');
  });

  it('applies white variant class', () => {
    const btn = createCloseButton({ white: true });
    expect(btn.classList.contains('btn-close-white')).toBe(true);
  });

  it('sets disabled attribute', () => {
    const btn = createCloseButton({ disabled: true });
    expect(btn.disabled).toBe(true);
  });

  it('attaches click handler', () => {
    const onClick = vi.fn();
    const btn = createCloseButton({ onClick });
    btn.click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not throw when no onClick is provided', () => {
    expect(() => {
      const btn = createCloseButton();
      btn.click();
    }).not.toThrow();
  });

  it('white=false does not apply white class', () => {
    const btn = createCloseButton({ white: false });
    expect(btn.classList.contains('btn-close-white')).toBe(false);
  });
});
