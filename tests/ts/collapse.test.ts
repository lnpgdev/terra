import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('bootstrap/js/dist/collapse', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({}),
  },
}));

import BsCollapse from 'bootstrap/js/dist/collapse';
import {
  createCollapseToggle,
  createCollapse,
  collapse,
  initCollapses,
} from '../../src/components/collapse/index';

describe('collapse constants', () => {
  it('exports expected class names', () => {
    expect(collapse.base).toBe('collapse');
    expect(collapse.show).toBe('show');
    expect(collapse.collapsing).toBe('collapsing');
    expect(collapse.toggle).toBe('collapse');
    expect(collapse.selector).toBe('[data-bs-toggle="collapse"]');
  });
});

describe('createCollapseToggle', () => {
  it('defaults to button variant', () => {
    const el = createCollapseToggle({ target: 'panel1', label: 'Toggle' });
    expect(el.tagName).toBe('BUTTON');
  });

  it('button has data-bs-toggle=collapse and data-bs-target', () => {
    const el = createCollapseToggle({ target: 'panel1', label: 'Toggle' });
    expect(el.getAttribute('data-bs-toggle')).toBe('collapse');
    expect(el.getAttribute('data-bs-target')).toBe('#panel1');
  });

  it('button sets aria-expanded=false by default', () => {
    const el = createCollapseToggle({ target: 'panel1', label: 'Toggle' });
    expect(el.getAttribute('aria-expanded')).toBe('false');
  });

  it('button sets aria-expanded=true when expanded', () => {
    const el = createCollapseToggle({ target: 'panel1', label: 'Toggle', expanded: true });
    expect(el.getAttribute('aria-expanded')).toBe('true');
  });

  it('anchor variant creates an a element', () => {
    const el = createCollapseToggle({ target: 'panel1', label: 'Toggle', variant: 'anchor' });
    expect(el.tagName).toBe('A');
    expect((el as HTMLAnchorElement).href).toContain('#panel1');
  });

  it('renders label text', () => {
    const el = createCollapseToggle({ target: 'panel1', label: 'Show more' });
    expect(el.textContent).toBe('Show more');
  });
});

describe('createCollapse', () => {
  it('returns a div with collapse class', () => {
    const el = createCollapse({ id: 'myPanel' });
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('collapse')).toBe(true);
  });

  it('sets the id attribute', () => {
    const el = createCollapse({ id: 'myPanel' });
    expect(el.id).toBe('myPanel');
  });

  it('does not have show class by default', () => {
    const el = createCollapse({ id: 'myPanel' });
    expect(el.classList.contains('show')).toBe(false);
  });

  it('adds show class when open=true', () => {
    const el = createCollapse({ id: 'myPanel', open: true });
    expect(el.classList.contains('show')).toBe(true);
  });
});

describe('initCollapses', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.mocked(BsCollapse.getOrCreateInstance).mockClear();
  });

  it('calls BsCollapse.getOrCreateInstance for each target panel', () => {
    const panel = document.createElement('div');
    panel.id = 'testPanel';
    document.body.appendChild(panel);

    const toggle = document.createElement('button');
    toggle.setAttribute('data-bs-toggle', 'collapse');
    toggle.setAttribute('data-bs-target', '#testPanel');
    document.body.appendChild(toggle);

    initCollapses();
    expect(BsCollapse.getOrCreateInstance).toHaveBeenCalledWith(panel, { toggle: false });
  });

  it('ignores toggles with no target', () => {
    const toggle = document.createElement('button');
    toggle.setAttribute('data-bs-toggle', 'collapse');
    document.body.appendChild(toggle);

    expect(() => initCollapses()).not.toThrow();
  });
});
