import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/tab', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({}),
  },
}));

import { createTabs, createTabContent, tab } from '../../src/components/tab/index';

describe('tab constants', () => {
  it('exports expected class names', () => {
    expect(tab.nav).toBe('nav');
    expect(tab.variants.tabs).toBe('nav-tabs');
    expect(tab.variants.pills).toBe('nav-pills');
    expect(tab.item).toBe('nav-item');
    expect(tab.link).toBe('nav-link');
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
