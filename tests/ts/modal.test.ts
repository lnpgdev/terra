import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('bootstrap/js/dist/modal', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({ show: vi.fn(), hide: vi.fn() }),
  },
}));

import {
  createModal,
  createModalDialog,
  createModalContent,
  createModalHeader,
  createModalBody,
  createModalFooter,
  createModalPages,
  createModalPage,
  createModalTrigger,
  switchModalPage,
  modal,
  modalPageAttrs,
} from '../../src/components/modal/index';

describe('modal constants', () => {
  it('exports expected class names', () => {
    expect(modal.base).toBe('modal');
    expect(modal.dialog).toBe('modal-dialog');
    expect(modal.centered).toBe('modal-dialog-centered');
    expect(modal.scrollable).toBe('modal-dialog-scrollable');
    expect(modal.content).toBe('modal-content');
    expect(modal.header).toBe('modal-header');
    expect(modal.body).toBe('modal-body');
    expect(modal.footer).toBe('modal-footer');
    expect(modal.pages).toBe('modal-pages');
    expect(modal.page).toBe('modal-page');
    expect(modal.sizes.lg).toBe('modal-lg');
  });

  it('exports modalPageAttrs', () => {
    expect(modalPageAttrs.page).toBe('data-lnpg-modal-page');
    expect(modalPageAttrs.prev).toBe('data-lnpg-modal-prev');
    expect(modalPageAttrs.next).toBe('data-lnpg-modal-next');
    expect(modalPageAttrs.last).toBe('data-lnpg-modal-last');
  });
});

describe('createModalTrigger', () => {
  it('returns a button with data-bs-toggle=modal', () => {
    const el = createModalTrigger({ target: 'myModal', label: 'Open' });
    expect(el.tagName).toBe('BUTTON');
    expect(el.getAttribute('data-bs-toggle')).toBe('modal');
    expect(el.getAttribute('data-bs-target')).toBe('#myModal');
  });

  it('returns an anchor in anchor variant', () => {
    const el = createModalTrigger({ target: 'myModal', label: 'Open', variant: 'anchor' });
    expect(el.tagName).toBe('A');
  });
});

describe('createModal', () => {
  it('returns a div with modal class', () => {
    const el = createModal({ id: 'myModal' });
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('modal')).toBe(true);
  });

  it('sets the id and tabIndex', () => {
    const el = createModal({ id: 'myModal' });
    expect(el.id).toBe('myModal');
    expect(el.tabIndex).toBe(-1);
  });

  it('adds fade class when fade=true', () => {
    const el = createModal({ id: 'myModal', fade: true });
    expect(el.classList.contains('fade')).toBe(true);
  });

  it('sets aria-labelledby when provided', () => {
    const el = createModal({ id: 'myModal', labelledBy: 'myTitle' });
    expect(el.getAttribute('aria-labelledby')).toBe('myTitle');
  });
});

describe('createModalDialog', () => {
  it('returns a div with modal-dialog class', () => {
    const el = createModalDialog();
    expect(el.classList.contains('modal-dialog')).toBe(true);
  });

  it('applies centered and scrollable by default', () => {
    const el = createModalDialog();
    expect(el.classList.contains('modal-dialog-centered')).toBe(true);
    expect(el.classList.contains('modal-dialog-scrollable')).toBe(true);
  });

  it('applies size class', () => {
    const el = createModalDialog({ size: 'lg' });
    expect(el.classList.contains('modal-lg')).toBe(true);
  });
});

describe('createModalContent', () => {
  it('returns a div with modal-content class', () => {
    const el = createModalContent();
    expect(el.classList.contains('modal-content')).toBe(true);
  });
});

describe('createModalHeader', () => {
  it('returns a div with modal-header class', () => {
    const el = createModalHeader({ title: 'My Modal' });
    expect(el.classList.contains('modal-header')).toBe(true);
  });

  it('renders the title', () => {
    const el = createModalHeader({ title: 'My Modal' });
    expect(el.querySelector('.modal-title')?.textContent).toBe('My Modal');
  });

  it('sets titleId on title element', () => {
    const el = createModalHeader({ title: 'T', titleId: 'modalTitle' });
    expect(el.querySelector('#modalTitle')).not.toBeNull();
  });

  it('renders a close button', () => {
    const el = createModalHeader({ title: 'T' });
    expect(el.querySelector('button.btn-close')).not.toBeNull();
  });
});

describe('createModalBody', () => {
  it('returns a div with modal-body class', () => {
    const el = createModalBody();
    expect(el.classList.contains('modal-body')).toBe(true);
  });
});

describe('createModalFooter', () => {
  it('returns a div with modal-footer class', () => {
    const el = createModalFooter();
    expect(el.classList.contains('modal-footer')).toBe(true);
  });
});

describe('createModalPages', () => {
  it('returns a div with modal-pages class', () => {
    const el = createModalPages();
    expect(el.classList.contains('modal-pages')).toBe(true);
  });
});

describe('createModalPage', () => {
  it('returns a div with modal-page class', () => {
    const el = createModalPage({ id: 'page1' });
    expect(el.classList.contains('modal-page')).toBe(true);
  });

  it('sets the id', () => {
    const el = createModalPage({ id: 'page1' });
    expect(el.id).toBe('page1');
  });

  it('adds active class when active=true', () => {
    const el = createModalPage({ id: 'page1', active: true });
    expect(el.classList.contains('active')).toBe(true);
  });

  it('does not add active class by default', () => {
    const el = createModalPage({ id: 'page1' });
    expect(el.classList.contains('active')).toBe(false);
  });
});

describe('switchModalPage', () => {
  function buildPagedModal(): HTMLElement {
    const modalEl = createModal({ id: 'testModal' });
    const body = createModalBody();
    const pages = createModalPages();

    const page1 = createModalPage({ id: 'p1', active: true });
    const page2 = createModalPage({ id: 'p2' });
    const page3 = createModalPage({ id: 'p3' });
    pages.appendChild(page1);
    pages.appendChild(page2);
    pages.appendChild(page3);
    body.appendChild(pages);
    modalEl.appendChild(body);
    document.body.appendChild(modalEl);
    return modalEl;
  }

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('activates the target page and deactivates others', () => {
    buildPagedModal();
    switchModalPage('p2');
    expect(document.getElementById('p1')?.classList.contains('active')).toBe(false);
    expect(document.getElementById('p2')?.classList.contains('active')).toBe(true);
    expect(document.getElementById('p3')?.classList.contains('active')).toBe(false);
  });

  it('does nothing when target page id does not exist', () => {
    buildPagedModal();
    expect(() => switchModalPage('nonexistent')).not.toThrow();
  });

  it('hides prev button on first page', () => {
    const modalEl = buildPagedModal();
    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('data-lnpg-modal-prev', '');
    modalEl.appendChild(prevBtn);

    switchModalPage('p1');
    expect(prevBtn.classList.contains('d-none')).toBe(true);
  });

  it('shows prev button on second page', () => {
    const modalEl = buildPagedModal();
    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('data-lnpg-modal-prev', '');
    modalEl.appendChild(prevBtn);

    switchModalPage('p2');
    expect(prevBtn.classList.contains('d-none')).toBe(false);
  });

  it('hides next button on last page', () => {
    const modalEl = buildPagedModal();
    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('data-lnpg-modal-next', '');
    modalEl.appendChild(nextBtn);

    switchModalPage('p3');
    expect(nextBtn.classList.contains('d-none')).toBe(true);
  });

  it('shows last button only on last page', () => {
    const modalEl = buildPagedModal();
    const lastBtn = document.createElement('button');
    lastBtn.setAttribute('data-lnpg-modal-last', '');
    lastBtn.classList.add('d-none');
    modalEl.appendChild(lastBtn);

    switchModalPage('p2');
    expect(lastBtn.classList.contains('d-none')).toBe(true);

    switchModalPage('p3');
    expect(lastBtn.classList.contains('d-none')).toBe(false);
  });
});
