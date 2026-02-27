/**
 * Terra UI Kit: Notification
 *
 * @remarks
 * A single notification row displaying a title, subtitle, and time. Supports
 * an unread state (bold title + indicator dot) and an optional expandable
 * details panel powered by Bootstrap Collapse.
 *
 * When `expandable` is `true`, the factory returns a `body` element for
 * appending timeline or detail content. The panel open/close is handled by
 * Bootstrap's Collapse plugin via `data-bs-toggle`.
 *
 * Usage:
 * ```ts
 * // Simple row
 * const { element } = createNotification({
 *   id: 'notif1',
 *   title: 'John Smith',
 *   subtitle: 'Inbound call · 3 min',
 *   time: '2:34 PM',
 *   unread: true,
 * });
 *
 * // Expandable row
 * const { element, body } = createNotification({
 *   id: 'notif2',
 *   title: 'Jane Doe',
 *   subtitle: 'Missed call',
 *   time: '1:15 PM',
 *   expandable: true,
 *   open: false,
 * });
 * body!.appendChild(myTimelineElement);
 * ```
 *
 * References:
 * - Bootstrap: https://getbootstrap.com/docs/5.3/components/collapse/
 *
 * @module
 * @category Components
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for {@link createNotification}. */
export interface NotificationOptions {
  /**
   * Unique ID for this notification. Used to wire the collapse toggle when
   * `expandable` is `true` (panel ID becomes `${id}-body`).
   */
  id: string;
  /** Primary text — the caller name, event title, etc. */
  title: string;
  /** Secondary text — call type, duration, description, etc. */
  subtitle: string;
  /** Timestamp or relative time string displayed on the right. */
  time: string;
  /**
   * Marks the notification as unread — renders an indicator dot and bolds
   * the title. Defaults to `false`.
   */
  unread?: boolean;
  /**
   * When `true`, renders a chevron and a collapsible body panel.
   * The returned `body` element can be populated with detail content.
   * Defaults to `false`.
   */
  expandable?: boolean;
  /**
   * Initial expanded state when `expandable` is `true`. Defaults to `false`.
   */
  open?: boolean;
}

/** Elements returned by {@link createNotification}. */
export interface NotificationElements {
  /** The notification row wrapper element. */
  element: HTMLElement;
  /**
   * The collapsible body element — only present when `expandable` is `true`.
   * Append your timeline or detail content here.
   */
  body?: HTMLElement;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Creates a notification row.
 *
 * @param options - Configuration for the notification.
 * @returns `{ element, body? }` — the row and the optional collapse panel.
 * @category Factory
 */
export function createNotification(options: NotificationOptions): NotificationElements {
  const {
    id,
    title,
    subtitle,
    time,
    unread = false,
    expandable = false,
    open = false,
  } = options;

  const bodyId = `${id}-body`;

  // -------------------------------------------------------------------------
  // Wrapper
  // -------------------------------------------------------------------------

  const wrapper = document.createElement('div');
  wrapper.id = id;
  const wrapperClasses: string[] = [notification.base];
  if (unread) wrapperClasses.push(notification.unread);
  if (expandable) wrapperClasses.push(notification.expandable);
  wrapper.className = wrapperClasses.join(' ');

  // -------------------------------------------------------------------------
  // Header (div for static, button for expandable)
  // -------------------------------------------------------------------------

  const header = document.createElement(expandable ? 'button' : 'div');
  header.className = notification.header;

  if (expandable) {
    (header as HTMLButtonElement).type = 'button';
    header.setAttribute('data-bs-toggle', 'collapse');
    header.setAttribute('data-bs-target', `#${bodyId}`);
    header.setAttribute('aria-expanded', String(open));
    header.setAttribute('aria-controls', bodyId);
  }

  // Unread dot
  if (unread) {
    const dot = document.createElement('span');
    dot.className = notification.unreadDot;
    header.appendChild(dot);
  }

  // Content block (title + subtitle)
  const content = document.createElement('div');
  content.className = notification.content;

  const titleEl = document.createElement('span');
  titleEl.className = notification.title;
  titleEl.textContent = title;

  const subtitleEl = document.createElement('span');
  subtitleEl.className = notification.subtitle;
  subtitleEl.textContent = subtitle;

  content.appendChild(titleEl);
  content.appendChild(subtitleEl);

  // Time
  const timeEl = document.createElement('span');
  timeEl.className = notification.time;
  timeEl.textContent = time;

  header.appendChild(content);
  header.appendChild(timeEl);

  // Chevron (expandable only)
  if (expandable) {
    const chevron = document.createElement('span');
    chevron.className = notification.chevron;
    chevron.setAttribute('aria-hidden', 'true');
    header.appendChild(chevron);
  }

  wrapper.appendChild(header);

  // -------------------------------------------------------------------------
  // Collapsible body (expandable only)
  // -------------------------------------------------------------------------

  if (!expandable) return { element: wrapper };

  const collapsePanel = document.createElement('div');
  collapsePanel.id = bodyId;
  collapsePanel.className = open
    ? `collapse show ${notification.body}`
    : `collapse ${notification.body}`;

  wrapper.appendChild(collapsePanel);

  return { element: wrapper, body: collapsePanel };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CSS class references for the Notification component. @category Constants */
export const notification = {
  /** Row wrapper class. */
  base: 'notification',
  /** Modifier added when the notification is unread. */
  unread: 'notification-unread',
  /** Modifier added when the notification is expandable. */
  expandable: 'notification-expandable',
  /** Header element class (div or button). */
  header: 'notification-header',
  /** Unread indicator dot class. */
  unreadDot: 'notification-unread-dot',
  /** Content block class (wraps title + subtitle). */
  content: 'notification-content',
  /** Title element class. */
  title: 'notification-title',
  /** Subtitle element class. */
  subtitle: 'notification-subtitle',
  /** Time element class. */
  time: 'notification-time',
  /** Chevron icon class (visible only when expandable). */
  chevron: 'notification-chevron',
  /** Collapsible body panel class. */
  body: 'notification-body',
} as const;
