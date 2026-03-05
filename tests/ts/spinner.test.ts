import { describe, it, expect } from 'vitest';
import { createSpinner, spinner } from '../../src/components/spinner/index';

describe('spinner constants', () => {
  it('exports expected class names', () => {
    expect(spinner.border).toBe('spinner-border');
    expect(spinner.grow).toBe('spinner-grow');
    expect(spinner.borderSm).toBe('spinner-border-sm');
    expect(spinner.growSm).toBe('spinner-grow-sm');
  });
});

describe('createSpinner', () => {
  it('defaults to border variant with role=status', () => {
    const el = createSpinner();
    expect(el.classList.contains('spinner-border')).toBe(true);
    expect(el.getAttribute('role')).toBe('status');
  });

  it('applies grow variant', () => {
    const el = createSpinner({ variant: 'grow' });
    expect(el.classList.contains('spinner-grow')).toBe(true);
    expect(el.classList.contains('spinner-border')).toBe(false);
  });

  it('applies sm size modifier for border', () => {
    const el = createSpinner({ variant: 'border', size: 'sm' });
    expect(el.classList.contains('spinner-border-sm')).toBe(true);
  });

  it('applies sm size modifier for grow', () => {
    const el = createSpinner({ variant: 'grow', size: 'sm' });
    expect(el.classList.contains('spinner-grow-sm')).toBe(true);
  });

  it('applies color class', () => {
    const el = createSpinner({ color: 'text-primary' });
    expect(el.classList.contains('text-primary')).toBe(true);
  });

  it('renders visually-hidden label with default text', () => {
    const el = createSpinner();
    const hidden = el.querySelector('.visually-hidden');
    expect(hidden?.textContent).toBe('Loading...');
  });

  it('renders custom label text', () => {
    const el = createSpinner({ label: 'Processing...' });
    const hidden = el.querySelector('.visually-hidden');
    expect(hidden?.textContent).toBe('Processing...');
  });

  it('grow variant does not apply border class', () => {
    const el = createSpinner({ variant: 'grow' });
    expect(el.classList.contains('spinner-border')).toBe(false);
    expect(el.classList.contains('spinner-grow')).toBe(true);
  });

  it('applies color class for grow variant too', () => {
    const el = createSpinner({ variant: 'grow', color: 'text-success' });
    expect(el.classList.contains('text-success')).toBe(true);
  });
});
