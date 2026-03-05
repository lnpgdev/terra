import { describe, it, expect } from 'vitest';
import { createListGroup, listGroup } from '../../src/components/list-group/index';

describe('listGroup constants', () => {
  it('exports expected class names', () => {
    expect(listGroup.base).toBe('list-group');
    expect(listGroup.item).toBe('list-group-item');
    expect(listGroup.action).toBe('list-group-item-action');
    expect(listGroup.active).toBe('active');
    expect(listGroup.flush).toBe('list-group-flush');
    expect(listGroup.horizontal).toBe('list-group-horizontal');
  });
});

describe('createListGroup', () => {
  const listItems = [
    { label: 'Dashboard' },
    { label: 'Members', active: true },
    { label: 'Reports', disabled: true },
  ];

  it('returns a ul when no items have href', () => {
    const el = createListGroup({ items: listItems });
    expect(el.tagName).toBe('UL');
  });

  it('returns a div when any item has href', () => {
    const el = createListGroup({ items: [{ label: 'Link', href: '/link' }] });
    expect(el.tagName).toBe('DIV');
  });

  it('applies list-group class', () => {
    const el = createListGroup({ items: listItems });
    expect(el.classList.contains('list-group')).toBe(true);
  });

  it('renders correct number of items', () => {
    const el = createListGroup({ items: listItems });
    expect(el.querySelectorAll('.list-group-item').length).toBe(3);
  });

  it('active item gets active class and aria-current', () => {
    const el = createListGroup({ items: listItems });
    const activeItem = el.querySelector('.list-group-item.active');
    expect(activeItem).not.toBeNull();
    expect(activeItem?.getAttribute('aria-current')).toBe('true');
  });

  it('disabled item gets disabled class and aria-disabled', () => {
    const el = createListGroup({ items: listItems });
    const disabledItem = el.querySelector('.list-group-item.disabled');
    expect(disabledItem).not.toBeNull();
    expect(disabledItem?.getAttribute('aria-disabled')).toBe('true');
  });

  it('link item renders as anchor with action class', () => {
    const el = createListGroup({ items: [{ label: 'Go', href: '/go' }] });
    const a = el.querySelector('a.list-group-item');
    expect(a).not.toBeNull();
    expect(a?.classList.contains('list-group-item-action')).toBe(true);
  });

  it('applies flush class', () => {
    const el = createListGroup({ items: listItems, flush: true });
    expect(el.classList.contains('list-group-flush')).toBe(true);
  });

  it('applies horizontal class', () => {
    const el = createListGroup({ items: listItems, horizontal: true });
    expect(el.classList.contains('list-group-horizontal')).toBe(true);
  });
});
