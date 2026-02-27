import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/alert', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({ close: vi.fn() }),
  },
}));

import { createAlert, alert } from '../../src/components/alert/index';

describe('alert constants', () => {
  it('exports expected class names', () => {
    expect(alert.base).toBe('alert');
    expect(alert.variants.success).toBe('alert-success');
    expect(alert.variants.danger).toBe('alert-danger');
    expect(alert.dismissible).toBe('alert-dismissible');
    expect(alert.bordered).toBe('alert-bordered');
  });
});

describe('createAlert', () => {
  it('returns a div with base and variant class', () => {
    const el = createAlert({ variant: 'success', message: 'OK', href: '#' });
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('alert')).toBe(true);
    expect(el.classList.contains('alert-success')).toBe(true);
  });

  it('sets role=alert', () => {
    const el = createAlert({ variant: 'info', message: 'Note', href: '#' });
    expect(el.getAttribute('role')).toBe('alert');
  });

  it('includes message text', () => {
    const el = createAlert({ variant: 'warning', message: 'Be careful', href: '#' });
    expect(el.textContent).toContain('Be careful');
  });

  it('includes a Read more link with the provided href', () => {
    const el = createAlert({ variant: 'danger', message: 'Err', href: '#modal' });
    const link = el.querySelector('a.alert-link') as HTMLAnchorElement;
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('#modal');
    expect(link.textContent).toBe('Read more.');
  });

  it('adds dismissible class and close button', () => {
    const el = createAlert({ variant: 'primary', message: 'Hi', href: '#', dismissible: true });
    expect(el.classList.contains('alert-dismissible')).toBe(true);
    expect(el.querySelector('button.btn-close')).not.toBeNull();
  });

  it('adds bordered class', () => {
    const el = createAlert({ variant: 'secondary', message: 'Hi', href: '#', bordered: true });
    expect(el.classList.contains('alert-bordered')).toBe(true);
  });
});
