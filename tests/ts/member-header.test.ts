import { describe, it, expect } from 'vitest';
import {
  createMemberHeader,
  createMemberHeaderLeft,
  createMemberHeaderCenter,
  createMemberHeaderRight,
  memberHeader,
} from '../../src/components/member-header/index';

describe('memberHeader constants', () => {
  it('exports expected class names', () => {
    expect(memberHeader.base).toBe('member-header');
    expect(memberHeader.left).toBe('member-header-left');
    expect(memberHeader.center).toBe('member-header-center');
    expect(memberHeader.right).toBe('member-header-right');
  });
});

describe('createMemberHeader', () => {
  it('returns a div with member-header class', () => {
    const el = createMemberHeader();
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('member-header')).toBe(true);
  });
});

describe('createMemberHeaderLeft', () => {
  it('returns a div with member-header-left class', () => {
    const el = createMemberHeaderLeft();
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('member-header-left')).toBe(true);
  });
});

describe('createMemberHeaderCenter', () => {
  it('returns a div with member-header-center class', () => {
    const el = createMemberHeaderCenter();
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('member-header-center')).toBe(true);
  });
});

describe('createMemberHeaderRight', () => {
  it('returns a div with member-header-right class', () => {
    const el = createMemberHeaderRight();
    expect(el.tagName).toBe('DIV');
    expect(el.classList.contains('member-header-right')).toBe(true);
  });
});

describe('MemberHeader composition', () => {
  it('can accept all three slot elements as children', () => {
    const header = createMemberHeader();
    const left = createMemberHeaderLeft();
    const center = createMemberHeaderCenter();
    const right = createMemberHeaderRight();

    header.appendChild(left);
    header.appendChild(center);
    header.appendChild(right);

    expect(header.querySelector('.member-header-left')).not.toBeNull();
    expect(header.querySelector('.member-header-center')).not.toBeNull();
    expect(header.querySelector('.member-header-right')).not.toBeNull();
  });

  it('slots accept arbitrary child content', () => {
    const center = createMemberHeaderCenter();
    const heading = document.createElement('h1');
    heading.textContent = 'Page Title';
    center.appendChild(heading);
    expect(center.querySelector('h1')?.textContent).toBe('Page Title');
  });
});
