/**
 * Terra UI Kit: Search Bar
 *
 * @remarks
 * Custom search input component with two modes:
 *
 * - `'single'` - the entire input value is submitted as a string on Enter or
 *   submit button click.
 * - `'multi'` - pressing Enter commits the current term as a removable token
 *   chip. Submitting sends the full array of tokens.
 *
 * Usage:
 * ```html
 * <!-- Single mode -->
 * <div class="search-bar search-bar-rounded">
 *   <span class="search-bar-icon"><!-- SVG --></span>
 *   <input class="search-bar-input" type="search" placeholder="Search..." />
 * </div>
 *
 * <!-- Multi mode -->
 * <div class="search-bar">
 *   <div class="search-bar-tokens">
 *     <span class="search-bar-token">
 *       call centre
 *       <button class="search-bar-token-remove" aria-label="Remove call centre">×</button>
 *     </span>
 *   </div>
 *   <input class="search-bar-input" type="text" placeholder="Add term..." />
 * </div>
 * ```
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createSpan } from '@lnpg/sol/elements/container/span';
import { createButton } from '@lnpg/sol/elements/form/button';
import { createInput } from '@lnpg/sol/elements/form/input';
import { createLabel } from '@lnpg/sol/elements/form/label';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Submit behaviour: whole query (`'single'`) or tokenised terms (`'multi'`). */
export type SearchBarMode = 'single' | 'multi';

/** Size variant. */
export type SearchBarSize = 'sm' | 'md' | 'lg';

/** Options for {@link createSearchBar}. */
export interface SearchBarOptions {
  /** Initial input value. Defaults to `''`. */
  value?: string;
  /** Placeholder text. Defaults to `'Search...'`. */
  placeholder?: string;
  /**
   * Visible label text. Rendered as a `<label>` element above the search bar
   * when provided. Either `label` or `ariaLabel` must be set.
   */
  label?: string;
  /**
   * Accessible label applied via `aria-label` on the input when no visible
   * label is shown. Required when `label` is omitted.
   */
  ariaLabel?: string;
  /** Submit behaviour. Defaults to `'multi'`. */
  mode?: SearchBarMode;
  /** Pill-shaped border. Defaults to `false`. */
  rounded?: boolean;
  /**
   * Raw SVG string for the leading icon. Defaults to a magnifying-glass icon.
   * Pass `null` to suppress the icon entirely.
   */
  icon?: string | null;
  /** Size of the input. Defaults to `'md'`. */
  size?: SearchBarSize;
  /** Disables the input. Defaults to `false`. */
  disabled?: boolean;
  /** Focus the input on mount. Defaults to `false`. */
  autofocus?: boolean;
  /**
   * Called when the search is submitted.
   * - `'single'` mode: receives the query string.
   * - `'multi'` mode: receives the current array of tokens.
   */
  onSubmit?: (payload: string | string[]) => void;
  /** Called on every keystroke in the input. */
  onChange?: (value: string) => void;
  /** Called when a token is added in `'multi'` mode. */
  onTokenAdd?: (token: string) => void;
  /** Called when a token is removed in `'multi'` mode. */
  onTokenRemove?: (token: string) => void;
}

// ---------------------------------------------------------------------------
// Default icon
// ---------------------------------------------------------------------------

const DEFAULT_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>';

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates an interactive search bar element with optional tokenisation.
 *
 * @param options - Search bar configuration.
 * @returns The outermost wrapper element (or a `<div>` containing a `<label>`
 *   and the bar when a visible `label` is provided).
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createSearchBar({
 *     placeholder: 'Search members...',
 *     mode: 'multi',
 *     onSubmit: (tokens) => console.log(tokens),
 *     onTokenAdd: (t) => console.log('Added', t),
 *   })
 * );
 * ```
 */
export function createSearchBar(options: SearchBarOptions = {}): HTMLElement {
  const {
    value = '',
    placeholder = 'Search\u2026',
    label,
    ariaLabel,
    mode = 'multi',
    rounded = false,
    icon = DEFAULT_ICON,
    size = 'md',
    disabled = false,
    autofocus = false,
    onSubmit,
    onChange,
    onTokenAdd,
    onTokenRemove,
  } = options;

  // Active token list for multi mode
  const tokens: string[] = [];

  // -------------------------------------------------------------------------
  // Build wrapper
  // -------------------------------------------------------------------------

  const barClasses: string[] = [searchBar.base];
  if (rounded) barClasses.push(searchBar.rounded);
  if (size !== 'md') barClasses.push(searchBar.sizes[size]);

  const bar = createDiv(undefined, { className: barClasses.join(' ') });

  // -------------------------------------------------------------------------
  // Leading icon
  // -------------------------------------------------------------------------

  if (icon !== null) {
    const iconEl = createSpan(undefined, { className: searchBar.icon });
    iconEl.innerHTML = icon;
    bar.appendChild(iconEl);
  }

  // -------------------------------------------------------------------------
  // Token container (multi mode only)
  // -------------------------------------------------------------------------

  let tokensContainer: HTMLElement | null = null;
  if (mode === 'multi') {
    tokensContainer = createDiv(undefined, { className: searchBar.tokens });
    bar.appendChild(tokensContainer);
  }

  // -------------------------------------------------------------------------
  // Input
  // -------------------------------------------------------------------------

  const inputId = label ? `search-bar-${Math.random().toString(36).slice(2, 9)}` : undefined;

  const input = createInput({
    type: mode === 'single' ? 'search' : 'text',
    className: searchBar.input,
    placeholder,
    value,
    disabled: disabled || undefined,
    autofocus: autofocus || undefined,
    id: inputId,
    aria: ariaLabel && !label ? { label: ariaLabel } : undefined,
  });

  // -------------------------------------------------------------------------
  // Event: input change
  // -------------------------------------------------------------------------

  input.addEventListener('input', () => {
    onChange?.(input.value);
  });

  // -------------------------------------------------------------------------
  // Event: Enter key
  // -------------------------------------------------------------------------

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    if (mode === 'single') {
      onSubmit?.(input.value);
      return;
    }

    // Multi mode - commit the current term as a token
    const term = input.value.trim();
    if (!term || tokens.includes(term)) {
      // Empty or duplicate - submit the existing token list instead
      if (!term && tokens.length) onSubmit?.(tokens.slice());
      return;
    }

    addToken(term);
    input.value = '';
    onChange?.('');
  });

  bar.appendChild(input);

  // -------------------------------------------------------------------------
  // Token helpers
  // -------------------------------------------------------------------------

  function addToken(term: string): void {
    tokens.push(term);

    const chip = createSpan(term, { className: searchBar.token });

    const removeBtn = createButton('\u00d7', {
      type: 'button',
      className: searchBar.tokenRemove,
      aria: { label: `Remove ${term}` },
    });
    removeBtn.addEventListener('click', () => {
      removeToken(term, chip);
    });

    chip.appendChild(removeBtn);
    tokensContainer!.appendChild(chip);
    onTokenAdd?.(term);
  }

  function removeToken(term: string, chip: HTMLElement): void {
    const idx = tokens.indexOf(term);
    if (idx === -1) return;
    tokens.splice(idx, 1);
    chip.remove();
    onTokenRemove?.(term);
  }

  // -------------------------------------------------------------------------
  // Outer wrapper (includes visible label if provided)
  // -------------------------------------------------------------------------

  if (label) {
    const wrapper = createDiv();

    const labelEl = createLabel(label, {
      htmlFor: input.id,
      className: 'form-label',
    });

    wrapper.appendChild(labelEl);
    wrapper.appendChild(bar);
    return wrapper;
  }

  return bar;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Search Bar component. @category Constants */
export const searchBar = {
  /** Outermost search bar wrapper. */
  base: 'search-bar',
  /** Pill-shaped border modifier. */
  rounded: 'search-bar-rounded',
  /** Size modifier classes. */
  sizes: {
    sm: 'search-bar-sm',
    lg: 'search-bar-lg',
  },
  /** Leading icon container. */
  icon: 'search-bar-icon',
  /** Token chip container (multi mode). */
  tokens: 'search-bar-tokens',
  /** Individual token chip. */
  token: 'search-bar-token',
  /** Remove button inside a token chip. */
  tokenRemove: 'search-bar-token-remove',
  /** Text input element. */
  input: 'search-bar-input',
} as const;
