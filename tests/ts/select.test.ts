import { describe, it, expect, vi } from 'vitest';
import { createSelect, select } from '../../src/components/select/index';

describe('select constants', () => {
  it('exports expected class names', () => {
    expect(select.base).toBe('form-select');
    expect(select.sizes.sm).toBe('form-select-sm');
    expect(select.sizes.lg).toBe('form-select-lg');
  });
});

const opts = [
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'billing', label: 'Billing', disabled: true },
];

describe('createSelect', () => {
  it('returns a select element with form-select class', () => {
    const el = createSelect({ options: opts });
    expect(el.tagName).toBe('SELECT');
    expect(el.classList.contains('form-select')).toBe(true);
  });

  it('renders correct number of options', () => {
    const el = createSelect({ options: opts }) as HTMLSelectElement;
    expect(el.querySelectorAll('option').length).toBe(3);
  });

  it('pre-selects the value option', () => {
    const el = createSelect({ options: opts, value: 'support' }) as HTMLSelectElement;
    expect(el.value).toBe('support');
  });

  it('disables specified option', () => {
    const el = createSelect({ options: opts });
    const options = el.querySelectorAll('option');
    expect((options[2] as HTMLOptionElement).disabled).toBe(true);
  });

  it('applies sm size class', () => {
    const el = createSelect({ options: opts, size: 'sm' });
    expect(el.classList.contains('form-select-sm')).toBe(true);
  });

  it('sets multiple attribute', () => {
    const el = createSelect({ options: opts, multiple: true }) as HTMLSelectElement;
    expect(el.multiple).toBe(true);
  });

  it('disables the select', () => {
    const el = createSelect({ options: opts, disabled: true }) as HTMLSelectElement;
    expect(el.disabled).toBe(true);
  });

  it('sets aria-label when provided without label', () => {
    const el = createSelect({ options: opts, ariaLabel: 'Queue' });
    expect(el.getAttribute('aria-label')).toBe('Queue');
  });

  it('wraps in div with label when label is provided', () => {
    const el = createSelect({ options: opts, label: 'Queue' });
    expect(el.tagName).toBe('DIV');
    expect(el.querySelector('label')?.textContent).toBe('Queue');
    expect(el.querySelector('select')).not.toBeNull();
  });

  it('calls onChange when selection changes', () => {
    const onChange = vi.fn();
    const el = createSelect({ options: opts, onChange }) as HTMLSelectElement;
    el.value = 'billing';
    el.dispatchEvent(new Event('change'));
    expect(onChange).toHaveBeenCalledWith('billing');
  });
});
