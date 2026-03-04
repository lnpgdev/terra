# Terra UI Kit

A TypeScript UI component library for LNPG internal applications, built on top of [Bootstrap 5](https://getbootstrap.com/docs/5.3/) and the [Sol](https://github.com/lnpgdev/sol) design system.

## Overview

Terra provides two things for each component:

1. **TypeScript factory functions** — programmatic element creation with typed options (e.g. `createButton(...)`, `createModal(...)`)
2. **SCSS overrides** — Bootstrap customisation via Sol design tokens, compiled into a single `terra.css` stylesheet

Components that need no visual overrides (e.g. Breadcrumb, Carousel, Scrollspy) still export their CSS class constants and factory functions — only the SCSS file is a thin Bootstrap pass-through.

## Installation

```sh
npm install @lnpg/terra
```

> **Note:** `@lnpg/sol` is a peer dependency and must be accessible in your project.

## Usage

### Stylesheet

Import the compiled stylesheet once at your application entry point:

```ts
import '@lnpg/terra/styles';
```

Or in SCSS:

```scss
@use '@lnpg/terra/src/scss/terra';
```

### Components

Import the full component bundle:

```ts
import { createButton, createModal, createAlert } from '@lnpg/terra';
```

Or import individual components for better tree-shaking:

```ts
import { createButton } from '@lnpg/terra/components/button';
import { createModal, initModals } from '@lnpg/terra/components/modal';
import { createAlert } from '@lnpg/terra/components/alert';
```

### Example

```ts
import { createButton } from '@lnpg/terra/components/button';
import { createBadge } from '@lnpg/terra/components/badge';

// Solid success button
const btn = createButton({ variant: 'solid', tone: 'success', label: 'Save' });
document.body.appendChild(btn);

// Notification dot overlaid on a button
const wrapper = document.createElement('div');
wrapper.className = 'position-relative d-inline-block';
wrapper.appendChild(createButton({ variant: 'solid', tone: 'success', label: 'Inbox' }));
wrapper.appendChild(
  createBadge({ shape: 'dot', tone: 'danger', direction: 'top', ariaLabel: 'New messages' }),
);
document.body.appendChild(wrapper);
```

## Components

| Component | Factory Function(s) | Notes |
|---|---|---|
| Accordion | `createAccordion` | |
| Alert | `createAlert` | Auto-dismiss and manual close support |
| Badge | `createBadge` | Pill, dot, square, and triangle shapes; overlay positioning |
| Breadcrumb | `createBreadcrumb` | Configurable divider character |
| Button | `createButton` | Solid, outline, and link variants |
| Button Group | `createButtonGroup` | Horizontal and vertical orientations |
| Card | `createCard` | |
| Carousel | `createCarousel` | |
| Close Button | `createCloseButton` | White variant for dark backgrounds |
| Collapse | `createCollapse` | |
| Dropdown | `createDropdown` | |
| Horizontal Rule | `createHorizontalRule` | |
| Label | `createLabel` | |
| List Group | `createListGroup` | |
| Logo | `createLogo` | |
| Member Header | `createMemberHeader` | |
| Modal | `createModal`, `createModalTrigger`, `initModals` | Multi-step switchable pages extension |
| Navbar | `createNavbar` | |
| Notification | `createNotification` | |
| Offcanvas | `createOffcanvas` | |
| Pagination | `createPagination` | |
| Placeholder | `createPlaceholder` | Loading skeleton |
| Scrollspy | — | CSS class constants only |
| Search Bar | `createSearchBar` | |
| Select | `createSelect` | |
| Sidenav | `createSidenav` | |
| Spinner | `createSpinner` | Border and grow variants |
| Subnav | `createSubnav` | |
| Tab | `createTab` | |
| Table | `createTable` | |
| Toast | `createToast` | |
| Tooltip | `createTooltip`, `initTooltips` | |

## CSS Class Constants

Every component also exports a typed constants object, useful when working directly with HTML markup:

```ts
import { button } from '@lnpg/terra/components/button';
import { badge } from '@lnpg/terra/components/badge';

// button.base       → 'btn'
// button.solid      → { success: 'btn-success', warning: 'btn-warning', danger: 'btn-danger' }
// badge.shapes.dot  → 'badge-dot'
```

## Development

```sh
npm install

# Type-check
npm run typecheck

# Lint TypeScript
npm run lint

# Lint SCSS
npm run lint:styles

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build
npm run build
```

## Architecture

- **Build:** [Vite](https://vitejs.dev/) — outputs ESM and CJS bundles. New components are auto-discovered from `src/components/` with no build config changes required.
- **Styling:** [Sass](https://sass-lang.com/) — each component has a partial (`_component.scss`) compiled into a single `terra.css` via `src/scss/terra.scss`.
- **Testing:** [Vitest](https://vitest.dev/) with [happy-dom](https://github.com/capricorn86/happy-dom) — TypeScript tests in `tests/ts/` and SCSS compilation tests in `tests/scss/`.
- **Design tokens:** Provided by `@lnpg/sol` and forwarded through `src/tokens/index.scss`.
