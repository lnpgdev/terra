import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/toast', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({ show: vi.fn(), hide: vi.fn() }),
  },
}));

import { createToast, createToastContainer, toast } from '../../src/components/toast/index';

describe('toast constants', () => {
  it('exports expected class names', () => {
    expect(toast.base).toBe('toast');
    expect(toast.variants.success).toBe('toast-success');
    expect(toast.variants.danger).toBe('toast-danger');
    expect(toast.container).toBe('toast-container');
  });
});

describe('createToast', () => {
  it('returns a div with toast class', () => {
    const el = createToast({ body: 'Message' });
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('toast')).toBe(true);
  });

  it('applies variant class', () => {
    const el = createToast({ body: 'Hello', variant: 'success' });
    expect(el.classList.contains('toast-success')).toBe(true);
  });

  it('renders body text', () => {
    const el = createToast({ body: 'Something happened' });
    const body = el.querySelector('.toast-body');
    expect(body?.textContent).toBe('Something happened');
  });

  it('renders header with title', () => {
    const el = createToast({ body: 'B', title: 'Alert' });
    const title = el.querySelector('.toast-title');
    expect(title?.textContent).toBe('Alert');
  });

  it('renders close button when dismissible=true (default)', () => {
    const el = createToast({ body: 'B', title: 'T' });
    expect(el.querySelector('.btn-close')).not.toBeNull();
  });

  it('omits close button when dismissible=false', () => {
    const el = createToast({ body: 'B', title: 'T', dismissible: false });
    expect(el.querySelector('.btn-close')).toBeNull();
  });

  it('sets lnpg-autohide=false when autohide=false', () => {
    const el = createToast({ body: 'B', autohide: false });
    expect(el.dataset.lnpgAutohide).toBe('false');
  });

  it('sets role=status and aria-live=polite', () => {
    const el = createToast({ body: 'B' });
    expect(el.getAttribute('role')).toBe('status');
    expect(el.getAttribute('aria-live')).toBe('polite');
  });
});

describe('createToastContainer', () => {
  it('returns a div with toast-container class', () => {
    const el = createToastContainer();
    expect(el.classList.contains('toast-container')).toBe(true);
  });

  it('applies top-end placement classes by default', () => {
    const el = createToastContainer();
    expect(el.classList.contains('position-fixed')).toBe(true);
    expect(el.classList.contains('top-0')).toBe(true);
    expect(el.classList.contains('end-0')).toBe(true);
  });

  it('applies bottom-start placement classes', () => {
    const el = createToastContainer({ placement: 'bottom-start' });
    expect(el.classList.contains('bottom-0')).toBe(true);
    expect(el.classList.contains('start-0')).toBe(true);
  });
});
