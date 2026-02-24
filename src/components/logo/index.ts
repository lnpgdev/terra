/**
 * Terra UI Kit: Logo
 *
 * @remarks
 * LNPG icon asset exported in colour, white, and black variants. Use on an
 * `<img>` element with Terra's size modifier classes. To use a custom logo,
 * replace the `src` attribute with your own image — the sizing classes apply
 * regardless of which image is used.
 *
 * Usage:
 * ```html
 * <img src="..." class="logo logo-md" alt="LNPG" />
 * ```
 *
 * ```ts
 * import { logoAssets, logo } from '@lnpg/terra/components/logo';
 *
 * // <img :src="logoAssets.colour" class="logo logo-md" alt="LNPG" />
 * ```
 *
 * References:
 * - MDN: `<img>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
 *
 * @module
 * @category Components
 */

import logoBlack from '../../assets/logo-black.png';
import logoColour from '../../assets/logo-colour.png';
import logoWhite from '../../assets/logo-white.png';

/** Bundled logo image URLs. Use as the `src` of an `<img>` element. @category Assets */
export const logoAssets = {
  /** Full-colour variant. */
  colour: logoColour,
  /** White variant — for use on dark backgrounds. */
  white: logoWhite,
  /** Black variant. */
  black: logoBlack,
} as const;

/** CSS class references for the Logo component. @category Constants */
export const logo = {
  /** Base logo class. Apply to the `<img>` element. */
  base: 'logo',
  sizes: {
    /** 2rem (32px). */
    sm: 'logo-sm',
    /** 4rem (64px). */
    md: 'logo-md',
    /** 8rem (128px). */
    lg: 'logo-lg',
  },
} as const;
