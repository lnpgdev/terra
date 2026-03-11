/**
 * Terra UI Kit: Shared Primitive Types
 *
 * @remarks
 * Central source of truth for types and defaults shared across Terra
 * components. All component-specific `*Tone` and `*Size` types are aliases
 * of these, so any future additions (e.g. a new tone) propagate automatically.
 *
 * @module
 * @category Types
 */

// ---------------------------------------------------------------------------
// Tone
// ---------------------------------------------------------------------------

/**
 * Standard colour tones mapped to Sol / Bootstrap theme-color tokens.
 *
 * @remarks
 * - `'primary'`: brand blue.
 * - `'secondary'`: brand indigo.
 * - `'success'`: green.
 * - `'info'`: cyan.
 * - `'warning'`: amber.
 * - `'danger'`: red.
 * - `'dark'`: dark neutral.
 *
 * @category Types
 */
export type Tone = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

/**
 * Standard size modifier used across Terra components.
 *
 * @remarks
 * `'md'` is the default - no extra class is applied.
 *
 * @category Types
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

/**
 * Central default values for shared component props.
 *
 * @remarks
 * Factory functions reference these rather than inlining literals, so
 * changing a default here propagates to every component automatically.
 *
 * @category Constants
 */
export const componentDefaults = {
  /** Default tone applied when none is specified. */
  tone: 'primary' as Tone,

  /** Default size applied when none is specified. */
  size: 'md' as ComponentSize,
} as const;
