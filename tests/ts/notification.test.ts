import { describe, it, expect } from 'vitest';
import { createNotification, notification } from '../../src/components/notification/index';

describe('notification constants', () => {
  it('exports expected class names', () => {
    expect(notification.base).toBe('notification');
    expect(notification.unread).toBe('notification-unread');
    expect(notification.expandable).toBe('notification-expandable');
    expect(notification.header).toBe('notification-header');
    expect(notification.title).toBe('notification-title');
    expect(notification.subtitle).toBe('notification-subtitle');
    expect(notification.time).toBe('notification-time');
    expect(notification.chevron).toBe('notification-chevron');
    expect(notification.body).toBe('notification-body');
  });
});

describe('createNotification -- static', () => {
  it('returns element without body for non-expandable', () => {
    const { element, body } = createNotification({
      id: 'n1',
      title: 'John Smith',
      subtitle: 'Inbound call',
      time: '2:34 PM',
    });
    expect(element).toBeDefined();
    expect(body).toBeUndefined();
  });

  it('element has notification class', () => {
    const { element } = createNotification({ id: 'n1', title: 'T', subtitle: 'S', time: '12:00' });
    expect(element.classList.contains('notification')).toBe(true);
  });

  it('sets the id', () => {
    const { element } = createNotification({ id: 'n1', title: 'T', subtitle: 'S', time: '12:00' });
    expect(element.id).toBe('n1');
  });

  it('header is a div for non-expandable', () => {
    const { element } = createNotification({ id: 'n1', title: 'T', subtitle: 'S', time: '12:00' });
    const header = element.querySelector('.notification-header');
    expect(header?.tagName).toBe('DIV');
  });

  it('renders title, subtitle, and time', () => {
    const { element } = createNotification({
      id: 'n1',
      title: 'John',
      subtitle: 'Call',
      time: '1 PM',
    });
    expect(element.querySelector('.notification-title')?.textContent).toBe('John');
    expect(element.querySelector('.notification-subtitle')?.textContent).toBe('Call');
    expect(element.querySelector('.notification-time')?.textContent).toBe('1 PM');
  });

  it('adds unread class and dot when unread=true', () => {
    const { element } = createNotification({
      id: 'n1',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      unread: true,
    });
    expect(element.classList.contains('notification-unread')).toBe(true);
    expect(element.querySelector('.notification-unread-dot')).not.toBeNull();
  });

  it('no unread class by default', () => {
    const { element } = createNotification({ id: 'n1', title: 'T', subtitle: 'S', time: '12:00' });
    expect(element.classList.contains('notification-unread')).toBe(false);
  });
});

describe('createNotification -- expandable', () => {
  it('returns both element and body', () => {
    const { element, body } = createNotification({
      id: 'n2',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      expandable: true,
    });
    expect(element).toBeDefined();
    expect(body).toBeDefined();
  });

  it('header is a button for expandable', () => {
    const { element } = createNotification({
      id: 'n2',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      expandable: true,
    });
    const header = element.querySelector('.notification-header');
    expect(header?.tagName).toBe('BUTTON');
  });

  it('header has data-bs-toggle=collapse', () => {
    const { element } = createNotification({
      id: 'n2',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      expandable: true,
    });
    const header = element.querySelector('.notification-header');
    expect(header?.getAttribute('data-bs-toggle')).toBe('collapse');
    expect(header?.getAttribute('data-bs-target')).toBe('#n2-body');
  });

  it('adds chevron element', () => {
    const { element } = createNotification({
      id: 'n2',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      expandable: true,
    });
    expect(element.querySelector('.notification-chevron')).not.toBeNull();
  });

  it('body has collapse class and notification-body class', () => {
    const { body } = createNotification({
      id: 'n2',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      expandable: true,
    });
    expect(body?.classList.contains('collapse')).toBe(true);
    expect(body?.classList.contains('notification-body')).toBe(true);
  });

  it('body has show class when open=true', () => {
    const { body } = createNotification({
      id: 'n2',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      expandable: true,
      open: true,
    });
    expect(body?.classList.contains('show')).toBe(true);
  });

  it('body has correct id', () => {
    const { body } = createNotification({
      id: 'n2',
      title: 'T',
      subtitle: 'S',
      time: '12:00',
      expandable: true,
    });
    expect(body?.id).toBe('n2-body');
  });
});
