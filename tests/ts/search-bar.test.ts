import { describe, it, expect, vi } from 'vitest';
import { createSearchBar, searchBar } from '../../src/components/search-bar/index';

describe('searchBar constants', () => {
  it('exports expected class names', () => {
    expect(searchBar.base).toBe('search-bar');
    expect(searchBar.rounded).toBe('search-bar-rounded');
    expect(searchBar.input).toBe('search-bar-input');
    expect(searchBar.tokens).toBe('search-bar-tokens');
  });
});

describe('createSearchBar', () => {
  it('returns an element with search-bar class', () => {
    const el = createSearchBar();
    expect(el.classList.contains('search-bar')).toBe(true);
  });

  it('applies rounded class when rounded=true', () => {
    const el = createSearchBar({ rounded: true });
    expect(el.classList.contains('search-bar-rounded')).toBe(true);
  });

  it('single mode renders an input[type=search]', () => {
    const el = createSearchBar({ mode: 'single' });
    const input = el.querySelector('input');
    expect(input?.type).toBe('search');
  });

  it('multi mode renders an input[type=text]', () => {
    const el = createSearchBar({ mode: 'multi' });
    const input = el.querySelector('input');
    expect(input?.type).toBe('text');
  });

  it('multi mode renders a tokens container', () => {
    const el = createSearchBar({ mode: 'multi' });
    expect(el.querySelector('.search-bar-tokens')).not.toBeNull();
  });

  it('single mode has no tokens container', () => {
    const el = createSearchBar({ mode: 'single' });
    expect(el.querySelector('.search-bar-tokens')).toBeNull();
  });

  it('sets placeholder text', () => {
    const el = createSearchBar({ placeholder: 'Find members...' });
    expect(el.querySelector('input')?.placeholder).toBe('Find members...');
  });

  it('sets initial value', () => {
    const el = createSearchBar({ value: 'initial' });
    expect((el.querySelector('input') as HTMLInputElement).value).toBe('initial');
  });

  it('disables input when disabled=true', () => {
    const el = createSearchBar({ disabled: true });
    expect((el.querySelector('input') as HTMLInputElement).disabled).toBe(true);
  });

  it('sets aria-label on input when ariaLabel is provided', () => {
    const el = createSearchBar({ ariaLabel: 'Search members' });
    expect(el.querySelector('input')?.getAttribute('aria-label')).toBe('Search members');
  });

  it('wraps in div with label element when label is provided', () => {
    const el = createSearchBar({ label: 'Search' });
    expect(el.querySelector('label')).not.toBeNull();
    expect(el.querySelector('label')?.textContent).toBe('Search');
    expect(el.querySelector('.search-bar')).not.toBeNull();
  });

  it('applies sm size class', () => {
    const el = createSearchBar({ size: 'sm' });
    expect(el.classList.contains('search-bar-sm')).toBe(true);
  });

  it('includes leading icon by default', () => {
    const el = createSearchBar();
    expect(el.querySelector('.search-bar-icon')).not.toBeNull();
  });

  it('omits icon when icon=null', () => {
    const el = createSearchBar({ icon: null });
    expect(el.querySelector('.search-bar-icon')).toBeNull();
  });

  it('calls onChange on input event', () => {
    const onChange = vi.fn();
    const el = createSearchBar({ onChange, mode: 'single' });
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('hello');
  });
});
