import { describe, it, expect } from 'vitest';
import { createAccordion, accordion } from '../../src/components/accordion/index';

describe('accordion constants', () => {
  it('exports expected class names', () => {
    expect(accordion.base).toBe('accordion');
    expect(accordion.item).toBe('accordion-item');
    expect(accordion.header).toBe('accordion-header');
    expect(accordion.button).toBe('accordion-button');
    expect(accordion.panel).toBe('accordion-collapse');
    expect(accordion.body).toBe('accordion-body');
    expect(accordion.flush).toBe('accordion-flush');
    expect(accordion.variants.notification).toBe('accordion-notification');
    expect(accordion.tones.success).toBe('accordion-item-success');
    expect(accordion.tones.danger).toBe('accordion-item-danger');
    expect(accordion.tones.warning).toBe('accordion-item-warning');
    expect(accordion.tones.info).toBe('accordion-item-info');
  });
});

const items = [
  { id: 'q1', label: 'Question 1', body: 'Answer 1', open: true },
  { id: 'q2', label: 'Question 2', body: 'Answer 2' },
];

describe('createAccordion', () => {
  it('returns a div with accordion class', () => {
    const el = createAccordion({ id: 'faq', items });
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('accordion')).toBe(true);
  });

  it('sets the id', () => {
    const el = createAccordion({ id: 'faq', items });
    expect(el.id).toBe('faq');
  });

  it('renders correct number of accordion items', () => {
    const el = createAccordion({ id: 'faq', items });
    expect(el.querySelectorAll('.accordion-item').length).toBe(2);
  });

  it('open item has button without collapsed class', () => {
    const el = createAccordion({ id: 'faq', items });
    const buttons = el.querySelectorAll('.accordion-button');
    expect(buttons[0].classList.contains('collapsed')).toBe(false);
    expect(buttons[1].classList.contains('collapsed')).toBe(true);
  });

  it('open item panel has show class', () => {
    const el = createAccordion({ id: 'faq', items });
    const panels = el.querySelectorAll('.accordion-collapse');
    expect(panels[0].classList.contains('show')).toBe(true);
    expect(panels[1].classList.contains('show')).toBe(false);
  });

  it('single mode sets data-bs-parent on panels', () => {
    const el = createAccordion({ id: 'faq', items, mode: 'single' });
    el.querySelectorAll('.accordion-collapse').forEach((panel) => {
      expect(panel.getAttribute('data-bs-parent')).toBe('#faq');
    });
  });

  it('multiple mode does not set data-bs-parent', () => {
    const el = createAccordion({ id: 'faq', items, mode: 'multiple' });
    el.querySelectorAll('.accordion-collapse').forEach((panel) => {
      expect(panel.getAttribute('data-bs-parent')).toBeNull();
    });
  });

  it('applies flush class', () => {
    const el = createAccordion({ id: 'faq', items, flush: true });
    expect(el.classList.contains('accordion-flush')).toBe(true);
  });

  it('applies notification variant class', () => {
    const el = createAccordion({ id: 'faq', items, variant: 'notification' });
    expect(el.classList.contains('accordion-notification')).toBe(true);
  });

  it('applies tone class to item', () => {
    const toneItems = [{ id: 'i1', label: 'L', body: 'B', tone: 'success' as const }];
    const el = createAccordion({ id: 'a', items: toneItems });
    expect(el.querySelector('.accordion-item')?.classList.contains('accordion-item-success')).toBe(
      true,
    );
  });

  it('disables button when item is disabled', () => {
    const disabledItems = [{ id: 'd1', label: 'D', body: 'B', disabled: true }];
    const el = createAccordion({ id: 'a', items: disabledItems });
    const btn = el.querySelector('.accordion-button') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('sets aria-expanded=true on open item button', () => {
    const el = createAccordion({ id: 'faq', items });
    const buttons = el.querySelectorAll('.accordion-button');
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false');
  });

  it('sets aria-controls on each button matching panel id', () => {
    const el = createAccordion({ id: 'faq', items });
    const buttons = el.querySelectorAll('.accordion-button');
    expect(buttons[0].getAttribute('aria-controls')).toBe('q1');
    expect(buttons[1].getAttribute('aria-controls')).toBe('q2');
  });

  it('renders body text inside each accordion body', () => {
    const el = createAccordion({ id: 'faq', items });
    const bodies = el.querySelectorAll('.accordion-body');
    expect(bodies[0].textContent).toBe('Answer 1');
    expect(bodies[1].textContent).toBe('Answer 2');
  });

  it('defaults to single mode', () => {
    const el = createAccordion({ id: 'faq', items });
    el.querySelectorAll('.accordion-collapse').forEach((panel) => {
      expect(panel.getAttribute('data-bs-parent')).toBe('#faq');
    });
  });
});
