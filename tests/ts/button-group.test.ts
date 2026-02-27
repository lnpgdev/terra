import { describe, it, expect } from 'vitest';
import { createButtonGroup, buttonGroup } from '../../src/components/button-group/index';

describe('buttonGroup constants', () => {
  it('exports expected class names', () => {
    expect(buttonGroup.base).toBe('btn-group');
    expect(buttonGroup.vertical).toBe('btn-group-vertical');
    expect(buttonGroup.sizes.sm).toBe('btn-group-sm');
    expect(buttonGroup.sizes.lg).toBe('btn-group-lg');
  });
});

describe('createButtonGroup', () => {
  const twoButtons = [{ label: 'Save' }, { label: 'Delete' }];

  it('returns a div with role=group', () => {
    const el = createButtonGroup({ buttons: twoButtons });
    expect(el.tagName).toBe('DIV');
    expect(el.getAttribute('role')).toBe('group');
  });

  it('applies horizontal base class by default', () => {
    const el = createButtonGroup({ buttons: twoButtons });
    expect(el.classList.contains('btn-group')).toBe(true);
  });

  it('applies vertical class', () => {
    const el = createButtonGroup({ buttons: twoButtons, direction: 'vertical' });
    expect(el.classList.contains('btn-group-vertical')).toBe(true);
  });

  it('renders correct number of buttons', () => {
    const el = createButtonGroup({ buttons: twoButtons });
    expect(el.querySelectorAll('button').length).toBe(2);
  });

  it('applies solid tone to buttons', () => {
    const el = createButtonGroup({ buttons: twoButtons, variant: 'solid', tone: 'success' });
    const btns = el.querySelectorAll('button');
    btns.forEach((btn) => expect(btn.classList.contains('btn-success')).toBe(true));
  });

  it('applies outline tone to buttons', () => {
    const el = createButtonGroup({ buttons: twoButtons, variant: 'outline', tone: 'danger' });
    const btns = el.querySelectorAll('button');
    btns.forEach((btn) => expect(btn.classList.contains('btn-outline-danger')).toBe(true));
  });

  it('applies sm size to group and buttons', () => {
    const el = createButtonGroup({ buttons: twoButtons, size: 'sm' });
    expect(el.classList.contains('btn-group-sm')).toBe(true);
    el.querySelectorAll('button').forEach((btn) => expect(btn.classList.contains('btn-sm')).toBe(true));
  });

  it('disables individual buttons', () => {
    const el = createButtonGroup({ buttons: [{ label: 'A', disabled: true }, { label: 'B' }] });
    const btns = el.querySelectorAll('button');
    expect((btns[0] as HTMLButtonElement).disabled).toBe(true);
    expect((btns[1] as HTMLButtonElement).disabled).toBe(false);
  });

  it('sets aria-label on group', () => {
    const el = createButtonGroup({ buttons: twoButtons, ariaLabel: 'Actions' });
    expect(el.getAttribute('aria-label')).toBe('Actions');
  });
});
