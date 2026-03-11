/**
 * Terra UI Kit: Logo
 *
 * @remarks
 * LNPG logo component. Defaults to the official LNPG asset but accepts a
 * custom `src` override. Can be rendered as a static image or a link.
 *
 * Usage:
 * ```ts
 * import { createLogo } from '@lnpg/terra/components/logo';
 *
 * // Static logo
 * const el = createLogo({ size: 'md' });
 *
 * // Logo as a link
 * const el = createLogo({ href: '/', size: 'md' });
 *
 * // Custom asset
 * const el = createLogo({ src: '/my-logo.png', alt: 'My Company' });
 *
 * document.body.appendChild(el);
 * ```
 *
 * References:
 * - MDN: `<img>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
 *
 * @module
 * @category Components
 */

import { createA } from '@lnpg/sol/elements/inline/a';
import { createImg } from '@lnpg/sol/elements/media/img';

import logoBlack from '../../assets/logo-black.png';
import logoColour from '../../assets/logo-colour.png';
import logoWhite from '../../assets/logo-white.png';
import type { ComponentSize } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Background context the logo will be placed on.
 * Determines which bundled asset is used when `src` is not provided.
 *
 * @remarks
 * `'light'`: colour logo for light backgrounds.
 * `'dark'`: white logo for dark backgrounds.
 * `'transparent'`: black logo for transparent backgrounds.
 *
 * @category Attributes
 */
export type LogoVariant = 'light' | 'dark' | 'transparent';

/**
 * Size of the logo.
 *
 * @remarks
 * `'sm'`: small.
 * `'md'`: medium (default).
 * `'lg'`: large.
 *
 * @category Attributes
 */
export type LogoSize = ComponentSize;

/**
 * Options for {@link createLogo}.
 *
 * @category Interfaces
 */
export interface LogoOptions {
  /**
   * Alt text for the image. Defaults to `'LNPG Logo'`.
   */
  alt?: string;

  /**
   * Renders the logo inside an `<a>` element.
   * Must not be used together with `to`.
   */
  href?: string;

  /**
   * Route target for client-side navigation.
   * Rendered as `href` in the factory - framework-specific routing should be
   * handled by the consuming framework.
   * Must not be used together with `href`.
   */
  to?: string;

  /**
   * Custom image source. Overrides the bundled asset.
   */
  src?: string;

  /**
   * Background context. Determines the bundled asset used. Defaults to `'light'`.
   */
  variant?: LogoVariant;

  /**
   * Size of the logo. Defaults to `'md'`.
   */
  size?: LogoSize;
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

const VARIANT_ASSETS: Record<LogoVariant, string> = {
  light: logoColour,
  dark: logoWhite,
  transparent: logoBlack,
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a Logo element.
 *
 * @param options - Configuration for the logo.
 * @returns An `<img>` element, or an `<a>` wrapping an `<img>` when `href` or `to` is provided.
 * @throws If both `href` and `to` are provided.
 * @category Factory
 *
 * @example
 * ```ts
 * document.body.appendChild(
 *   createLogo({ href: '/', variant: 'dark', size: 'md' })
 * );
 * ```
 */
export function createLogo(options: LogoOptions = {}): HTMLElement {
  const { alt = 'LNPG Logo', href, to, src, variant = 'light', size = 'md' } = options;

  if (href && to) {
    throw new Error('[Terra] Logo: `href` and `to` must not be used together.');
  }

  const img = createImg({
    src: src ?? VARIANT_ASSETS[variant],
    alt,
    className: [logo.base, logo.sizes[size]].join(' '),
  });

  const linkTarget = href ?? to;
  if (linkTarget) {
    const anchor = createA(undefined, { href: linkTarget });
    anchor.appendChild(img);
    return anchor;
  }

  return img;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Bundled logo image URLs. Use as the `src` of an `<img>` element.
 *
 * @category Assets
 */
export const logoAssets = {
  /**
   * Full-colour variant.
   */
  colour: logoColour,

  /**
   * White variant - for use on dark backgrounds.
   */
  white: logoWhite,

  /**
   * Black variant.
   */
  black: logoBlack,
} as const;

/**
 * CSS class references for the Logo component.
 *
 * @category Constants
 */
export const logo = {
  /**
   * Base logo class. Apply to the `<img>` element.
   */
  base: 'logo',

  /**
   * Size modifier classes.
   */
  sizes: {
    /**
     * 2rem (32px).
     */
    sm: 'logo-sm',

    /**
     * 4rem (64px).
     */
    md: 'logo-md',

    /**
     * 8rem (128px).
     */
    lg: 'logo-lg',
  },
} as const;
