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
    expect(toast.header).toBe('toast-header');
    expect(toast.body).toBe('toast-body');
    expect(toast.title).toBe('toast-title');
    expect(toast.meta).toBe('toast-meta');
    expect(toast.container).toBe('toast-container');
    expect(toast.variants.success).toBe('toast-success');
    expect(toast.variants.danger).toBe('toast-danger');
    expect(toast.variants.warning).toBe('toast-warning');
    expect(toast.variants.info).toBe('toast-info');
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

  it('sets aria-atomic=true', () => {
    const el = createToast({ body: 'B' });
    expect(el.getAttribute('aria-atomic')).toBe('true');
  });

  it('applies no variant class when variant is omitted', () => {
    const el = createToast({ body: 'B' });
    expect(el.className).toBe('toast');
  });

  it('renders meta text when provided', () => {
    const el = createToast({ body: 'B', title: 'T', meta: 'Just now' });
    const meta = el.querySelector('.toast-meta');
    expect(meta?.textContent).toBe('Just now');
  });

  it('renders no header when no title and dismissible=false', () => {
    const el = createToast({ body: 'B', dismissible: false });
    expect(el.querySelector('.toast-header')).toBeNull();
  });

  it('does not set lnpg-autohide when autohide=true (default)', () => {
    const el = createToast({ body: 'B' });
    expect(el.dataset.lnpgAutohide).toBeUndefined();
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

  it('applies top-center placement classes', () => {
    const el = createToastContainer({ placement: 'top-center' });
    expect(el.classList.contains('top-0')).toBe(true);
    expect(el.classList.contains('start-50')).toBe(true);
    expect(el.classList.contains('translate-middle-x')).toBe(true);
  });

  it('sets data-lnpg-placement attribute', () => {
    const el = createToastContainer({ placement: 'bottom-end' });
    expect(el.getAttribute('data-lnpg-placement')).toBe('bottom-end');
  });
});
