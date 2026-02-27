import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('bootstrap/js/dist/tab', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({}),
  },
}));

import BsTab from 'bootstrap/js/dist/tab';
import { createTabs, createTabContent, initTabs, tab } from '../../src/components/tab/index';

describe('tab constants', () => {
  it('exports expected class names', () => {
    expect(tab.nav).toBe('nav');
    expect(tab.variants.tabs).toBe('nav-tabs');
    expect(tab.variants.pills).toBe('nav-pills');
    expect(tab.variants.underline).toBe('nav-underline');
    expect(tab.item).toBe('nav-item');
    expect(tab.link).toBe('nav-link');
    expect(tab.sizes.sm).toBe('nav-sm');
    expect(tab.sizes.lg).toBe('nav-lg');
    expect(tab.align.centre).toBe('justify-content-center');
    expect(tab.align.end).toBe('justify-content-end');
    expect(tab.align.spread).toBe('nav-fill');
    expect(tab.scroll).toBe('nav-scroll');
    expect(tab.content).toBe('tab-content');
    expect(tab.pane).toBe('tab-pane');
  });
});

const sampleTabs = [
  { id: 'tab-a', label: 'One', active: true },
  { id: 'tab-b', label: 'Two' },
];

describe('createTabs', () => {
  it('returns a ul with nav and variant class', () => {
    const el = createTabs({ tabs: sampleTabs });
    expect(el.tagName).toBe('UL');
    expect(el.classList.contains('nav')).toBe(true);
    expect(el.classList.contains('nav-tabs')).toBe(true);
  });

  it('renders correct number of tab items', () => {
    const el = createTabs({ tabs: sampleTabs });
    expect(el.querySelectorAll('li.nav-item').length).toBe(2);
  });

  it('applies pills variant', () => {
    const el = createTabs({ tabs: sampleTabs, variant: 'pills' });
    expect(el.classList.contains('nav-pills')).toBe(true);
  });

  it('marks the active tab with active class', () => {
    const el = createTabs({ tabs: sampleTabs });
    const buttons = el.querySelectorAll('button.nav-link');
    expect(buttons[0].classList.contains('active')).toBe(true);
    expect(buttons[1].classList.contains('active')).toBe(false);
  });

  it('sets data-bs-toggle=tab on buttons in panels mode', () => {
    const el = createTabs({ tabs: sampleTabs, mode: 'panels' });
    el.querySelectorAll('button').forEach((btn) => {
      expect(btn.getAttribute('data-bs-toggle')).toBe('tab');
    });
  });

  it('wraps in nav-scroll div when scroll=true', () => {
    const el = createTabs({ tabs: sampleTabs, scroll: true });
    expect(el.classList.contains('nav-scroll')).toBe(true);
    expect(el.querySelector('ul')).not.toBeNull();
  });

  it('renders anchor elements in links mode', () => {
    const linkTabs = [{ id: 'l1', label: 'Home', href: '/home' }];
    const el = createTabs({ tabs: linkTabs, mode: 'links' });
    expect(el.querySelector('a.nav-link')).not.toBeNull();
  });

  it('applies centre alignment', () => {
    const el = createTabs({ tabs: sampleTabs, align: 'centre' });
    expect(el.classList.contains('justify-content-center')).toBe(true);
  });

  it('applies end alignment', () => {
    const el = createTabs({ tabs: sampleTabs, align: 'end' });
    expect(el.classList.contains('justify-content-end')).toBe(true);
  });

  it('applies spread alignment', () => {
    const el = createTabs({ tabs: sampleTabs, align: 'spread' });
    expect(el.classList.contains('nav-fill')).toBe(true);
  });

  it('applies sm size class', () => {
    const el = createTabs({ tabs: sampleTabs, size: 'sm' });
    expect(el.classList.contains('nav-sm')).toBe(true);
  });

  it('applies lg size class', () => {
    const el = createTabs({ tabs: sampleTabs, size: 'lg' });
    expect(el.classList.contains('nav-lg')).toBe(true);
  });

  it('applies underline variant', () => {
    const el = createTabs({ tabs: sampleTabs, variant: 'underline' });
    expect(el.classList.contains('nav-underline')).toBe(true);
  });

  it('does not set data-bs-toggle on buttons in links mode', () => {
    const linkTabs = [{ id: 'l1', label: 'Home', href: '/home' }];
    const el = createTabs({ tabs: linkTabs, mode: 'links' });
    const anchor = el.querySelector('a.nav-link');
    expect(anchor?.getAttribute('data-bs-toggle')).toBeNull();
  });
});

describe('initTabs', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.mocked(BsTab.getOrCreateInstance).mockClear();
  });

  it('calls BsTab.getOrCreateInstance for each [data-bs-toggle="tab"] element', () => {
    const btn = document.createElement('button');
    btn.setAttribute('data-bs-toggle', 'tab');
    document.body.appendChild(btn);

    initTabs();
    expect(BsTab.getOrCreateInstance).toHaveBeenCalledWith(btn);
  });

  it('does not throw when no tab elements are present', () => {
    expect(() => initTabs()).not.toThrow();
  });
});

describe('createTabContent', () => {
  it('returns a div with tab-content class', () => {
    const el = createTabContent(sampleTabs);
    expect(el.classList.contains('tab-content')).toBe(true);
  });

  it('renders one pane per tab', () => {
    const el = createTabContent(sampleTabs);
    expect(el.querySelectorAll('.tab-pane').length).toBe(2);
  });

  it('active tab pane has show and active classes', () => {
    const el = createTabContent(sampleTabs);
    const panes = el.querySelectorAll('.tab-pane');
    expect(panes[0].classList.contains('active')).toBe(true);
    expect(panes[0].classList.contains('show')).toBe(true);
  });

  it('sets correct id on each pane', () => {
    const el = createTabContent(sampleTabs);
    expect(el.querySelector('#tab-a')).not.toBeNull();
    expect(el.querySelector('#tab-b')).not.toBeNull();
  });
});
