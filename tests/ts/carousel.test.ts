import { describe, it, expect, vi } from 'vitest';

vi.mock('bootstrap/js/dist/carousel', () => ({
  default: {
    getOrCreateInstance: vi.fn().mockReturnValue({ to: vi.fn() }),
  },
}));

import { createCarousel, createCarouselSlide, carousel } from '../../src/components/carousel/index';

describe('carousel constants', () => {
  it('exports expected class names', () => {
    expect(carousel.base).toBe('carousel');
    expect(carousel.slide).toBe('slide');
    expect(carousel.inner).toBe('carousel-inner');
    expect(carousel.item).toBe('carousel-item');
    expect(carousel.active).toBe('active');
    expect(carousel.controlPrev).toBe('carousel-control-prev');
    expect(carousel.controlNext).toBe('carousel-control-next');
  });
});

describe('createCarouselSlide', () => {
  it('returns a div with carousel-item class', () => {
    const el = createCarouselSlide({ content: 'Slide text' });
    expect(el.classList.contains('carousel-item')).toBe(true);
  });

  it('adds active class when active=true', () => {
    const el = createCarouselSlide({ content: 'Slide', active: true });
    expect(el.classList.contains('active')).toBe(true);
  });

  it('does not add active class by default', () => {
    const el = createCarouselSlide({ content: 'Slide' });
    expect(el.classList.contains('active')).toBe(false);
  });

  it('renders string content as text', () => {
    const el = createCarouselSlide({ content: 'Hello Slide' });
    expect(el.textContent).toBe('Hello Slide');
  });

  it('appends element content', () => {
    const img = document.createElement('img');
    img.alt = 'test';
    const el = createCarouselSlide({ content: img });
    expect(el.querySelector('img')).not.toBeNull();
  });
});

describe('createCarousel', () => {
  it('returns a div with carousel and slide classes', () => {
    const el = createCarousel({ id: 'hero', slides: [{ content: 'A', active: true }] });
    expect(el.classList.contains('carousel')).toBe(true);
    expect(el.classList.contains('slide')).toBe(true);
  });

  it('sets the id attribute', () => {
    const el = createCarousel({ id: 'myCarousel', slides: [{ content: 'A' }] });
    expect(el.id).toBe('myCarousel');
  });

  it('renders inner track', () => {
    const el = createCarousel({ id: 'c', slides: [{ content: 'A' }, { content: 'B' }] });
    expect(el.querySelector('.carousel-inner')).not.toBeNull();
    expect(el.querySelectorAll('.carousel-item').length).toBe(2);
  });

  it('renders prev and next controls by default', () => {
    const el = createCarousel({ id: 'c', slides: [{ content: 'A' }] });
    expect(el.querySelector('.carousel-control-prev')).not.toBeNull();
    expect(el.querySelector('.carousel-control-next')).not.toBeNull();
  });

  it('omits controls when controls=false', () => {
    const el = createCarousel({ id: 'c', slides: [{ content: 'A' }], controls: false });
    expect(el.querySelector('.carousel-control-prev')).toBeNull();
    expect(el.querySelector('.carousel-control-next')).toBeNull();
  });

  it('sets data-lnpg-autoplay when autoplay=true', () => {
    const el = createCarousel({ id: 'c', slides: [{ content: 'A' }], autoplay: true });
    expect(el.getAttribute('data-lnpg-autoplay')).toBe('true');
  });

  it('does not set data-lnpg-autoplay when autoplay is not specified', () => {
    const el = createCarousel({ id: 'c', slides: [{ content: 'A' }] });
    expect(el.getAttribute('data-lnpg-autoplay')).toBeNull();
  });

  it('renders correct number of slides', () => {
    const el = createCarousel({
      id: 'c',
      slides: [{ content: 'A', active: true }, { content: 'B' }, { content: 'C' }],
    });
    expect(el.querySelectorAll('.carousel-item').length).toBe(3);
  });
});
