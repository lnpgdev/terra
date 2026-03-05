/**
 * Terra UI Kit: Carousel
 *
 * @remarks
 * Built on Bootstrap's Carousel plugin. Supports autoplay, configurable
 * interval, and pause-on-hover via `data-lnpg-*` attributes (converted to
 * Bootstrap config by {@link initCarousels}).
 *
 * The factory builds the full carousel structure including the inner track,
 * slides, and optional prev/next controls.
 *
 * Usage:
 * ```html
 * <div id="heroCarousel" class="carousel slide"
 *      data-lnpg-autoplay="true"
 *      data-lnpg-interval="4000"
 *      data-lnpg-pause-on-hover="true">
 *   <div class="carousel-inner">
 *     <div class="carousel-item active">
 *       <img src="slide1.jpg" class="d-block w-100" alt="Slide 1" />
 *     </div>
 *     <div class="carousel-item">
 *       <img src="slide2.jpg" class="d-block w-100" alt="Slide 2" />
 *     </div>
 *   </div>
 *   <button class="carousel-control-prev" data-bs-target="#heroCarousel" data-bs-slide="prev">
 *     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
 *     <span class="visually-hidden">Previous</span>
 *   </button>
 *   <button class="carousel-control-next" data-bs-target="#heroCarousel" data-bs-slide="next">
 *     <span class="carousel-control-next-icon" aria-hidden="true"></span>
 *     <span class="visually-hidden">Next</span>
 *   </button>
 * </div>
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/carousel/
 *
 * @module
 * @category Components
 */

import { createDiv } from '@lnpg/sol/elements/container/div';
import { createSpan } from '@lnpg/sol/elements/container/span';
import { createButton } from '@lnpg/sol/elements/form/button';
import BsCarousel from 'bootstrap/js/dist/carousel';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Options for a single carousel slide.
 *
 * @category Interfaces
 */
export interface CarouselSlideOptions {
  /**
   * Marks this slide as the initially visible one. Defaults to `false`.
   */
  active?: boolean;

  /**
   * Content to place inside the slide. Pass an `HTMLElement` for rich content
   * or a string for plain text.
   */
  content: HTMLElement | string;
}

/**
 * Options for {@link createCarousel}.
 *
 * @category Interfaces
 */
export interface CarouselOptions {
  /**
   * Unique ID for the carousel container. Required for control wiring.
   */
  id: string;

  /**
   * Slide descriptors.
   */
  slides: CarouselSlideOptions[];

  /**
   * Automatically cycle through slides. Defaults to `false`.
   */
  autoplay?: boolean;

  /**
   * Time in milliseconds between slide transitions. Defaults to `5000`.
   */
  interval?: number;

  /**
   * Pause cycling when the pointer is over the carousel. Defaults to `true`.
   */
  pauseOnHover?: boolean;

  /**
   * Render prev/next control buttons. Defaults to `true`.
   */
  controls?: boolean;
}

// Re-export Bootstrap Carousel class for consumers who need programmatic control.
export { BsCarousel };

// ---------------------------------------------------------------------------
// Initialiser
// ---------------------------------------------------------------------------

/**
 * Initialises Bootstrap Carousel instances on all `.carousel` elements that
 * carry `data-lnpg-autoplay`, `data-lnpg-interval`, or
 * `data-lnpg-pause-on-hover` attributes.
 *
 * Runs automatically on `DOMContentLoaded`.
 *
 * @category Initialiser
 */
export function initCarousels(): void {
  document.querySelectorAll<HTMLElement>(carousel.selector).forEach((el) => {
    const autoplay =
      el.getAttribute('data-lnpg-autoplay') !== 'false' && el.hasAttribute('data-lnpg-autoplay');
    const interval = el.hasAttribute('data-lnpg-interval')
      ? parseInt(el.getAttribute('data-lnpg-interval')!, 10)
      : 5000;
    const pauseOnHover = el.getAttribute('data-lnpg-pause-on-hover') !== 'false';

    BsCarousel.getOrCreateInstance(el, {
      ride: autoplay ? 'carousel' : false,
      interval,
      pause: pauseOnHover ? 'hover' : false,
    });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => initCarousels());
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

/**
 * Creates a fully structured carousel element.
 *
 * @param options - Carousel configuration.
 * @returns A `<div class="carousel slide">` containing the inner track and
 *   optional prev/next controls.
 * @category Factory
 *
 * @example
 * ```ts
 * const slide1 = document.createElement('img');
 * slide1.src = '/images/slide1.jpg';
 * slide1.className = 'd-block w-100';
 * slide1.alt = 'Slide 1';
 *
 * document.body.appendChild(
 *   createCarousel({
 *     id: 'heroCarousel',
 *     autoplay: true,
 *     interval: 4000,
 *     slides: [
 *       { active: true, content: slide1 },
 *       { content: 'Plain text slide' },
 *     ],
 *   })
 * );
 * ```
 */
export function createCarousel(options: CarouselOptions): HTMLElement {
  const {
    id,
    slides,
    autoplay = false,
    interval = 5000,
    pauseOnHover = true,
    controls = true,
  } = options;

  const wrapper = createDiv(undefined, {
    id,
    className: `${carousel.base} ${carousel.slide}`,
  });
  if (autoplay) wrapper.dataset.lnpgAutoplay = 'true';
  if (interval !== 5000) wrapper.dataset.lnpgInterval = String(interval);
  if (!pauseOnHover) wrapper.dataset.lnpgPauseOnHover = 'false';

  // Inner track
  const inner = createDiv(undefined, { className: carousel.inner });

  for (const slide of slides) {
    inner.appendChild(createCarouselSlide(slide));
  }

  wrapper.appendChild(inner);

  // Prev/next controls
  if (controls) {
    wrapper.appendChild(_createControl(id, 'prev', 'Previous'));
    wrapper.appendChild(_createControl(id, 'next', 'Next'));
  }

  // Initialise Bootstrap Carousel
  BsCarousel.getOrCreateInstance(wrapper, {
    ride: autoplay ? 'carousel' : false,
    interval,
    pause: pauseOnHover ? 'hover' : false,
  });

  return wrapper;
}

/**
 * Creates a single carousel slide element.
 *
 * @param options - Slide configuration.
 * @returns A `<div class="carousel-item">`.
 * @category Factory
 */
export function createCarouselSlide(options: CarouselSlideOptions): HTMLElement {
  const { active = false, content } = options;

  const item = createDiv(undefined, {
    className: active ? `${carousel.item} ${carousel.active}` : carousel.item,
  });

  if (typeof content === 'string') {
    item.textContent = content;
  } else {
    item.appendChild(content);
  }

  return item;
}

function _createControl(targetId: string, direction: 'prev' | 'next', label: string): HTMLElement {
  const btn = createButton(undefined, {
    type: 'button',
    className: direction === 'prev' ? carousel.controlPrev : carousel.controlNext,
    dataset: { bsTarget: `#${targetId}`, bsSlide: direction },
  });

  const icon = createSpan(undefined, {
    className: direction === 'prev' ? carousel.controlPrevIcon : carousel.controlNextIcon,
    aria: { hidden: true },
  });

  const srText = createSpan(label, { className: 'visually-hidden' });

  btn.appendChild(icon);
  btn.appendChild(srText);
  return btn;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * CSS class references for the Carousel component.
 *
 * @category Constants
 */
export const carousel = {
  /**
   * Base carousel class.
   */
  base: 'carousel',

  /**
   * Enables slide transitions.
   */
  slide: 'slide',

  /**
   * Inner track containing all slides.
   */
  inner: 'carousel-inner',

  /**
   * Individual slide item.
   */
  item: 'carousel-item',

  /**
   * Active (visible) slide.
   */
  active: 'active',

  /**
   * Previous control button.
   */
  controlPrev: 'carousel-control-prev',

  /**
   * Next control button.
   */
  controlNext: 'carousel-control-next',

  /**
   * Icon inside the previous control.
   */
  controlPrevIcon: 'carousel-control-prev-icon',

  /**
   * Icon inside the next control.
   */
  controlNextIcon: 'carousel-control-next-icon',

  /**
   * Selector used by {@link initCarousels} to find carousel containers.
   */
  selector:
    '.carousel[data-lnpg-autoplay], .carousel[data-lnpg-interval], .carousel[data-lnpg-pause-on-hover]',
} as const;
