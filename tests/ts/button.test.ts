import { describe, it, expect, vi } from 'vitest';
import { createButton, button } from '../../src/components/button/index';

describe('button constants', () => {
  it('exports expected class names', () => {
    expect(button.base).toBe('btn');
    expect(button.solid.success).toBe('btn-success');
    expect(button.outline.danger).toBe('btn-outline-danger');
    expect(button.link).toBe('btn-link');
    expect(button.sizes.sm).toBe('btn-sm');
    expect(button.sizes.lg).toBe('btn-lg');
  });
});

describe('createButton', () => {
  it('returns a button element with base class', () => {
    const el = createButton();
    expect(el.tagName).toBe('BUTTON');
    expect(el.classList.contains('btn')).toBe(true);
  });

  it('defaults to type=button', () => {
    expect(createButton().type).toBe('button');
  });

  it('defaults to label Button', () => {
    expect(createButton().textContent).toBe('Button');
  });

  it('applies solid tone class', () => {
    const el = createButton({ variant: 'solid', tone: 'success' });
    expect(el.classList.contains('btn-success')).toBe(true);
  });

  it('applies outline tone class', () => {
    const el = createButton({ variant: 'outline', tone: 'warning' });
    expect(el.classList.contains('btn-outline-warning')).toBe(true);
  });

  it('applies link class', () => {
    const el = createButton({ variant: 'link' });
    expect(el.classList.contains('btn-link')).toBe(true);
  });

  it('applies sm size class', () => {
    const el = createButton({ size: 'sm' });
    expect(el.classList.contains('btn-sm')).toBe(true);
  });

  it('applies lg size class', () => {
    const el = createButton({ size: 'lg' });
    expect(el.classList.contains('btn-lg')).toBe(true);
  });

  it('sets disabled attribute', () => {
    const el = createButton({ disabled: true });
    expect(el.disabled).toBe(true);
  });

  it('sets submit type', () => {
    const el = createButton({ type: 'submit' });
    expect(el.type).toBe('submit');
  });

  it('attaches click handler', () => {
    const onClick = vi.fn();
    const el = createButton({ onClick });
    el.click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
