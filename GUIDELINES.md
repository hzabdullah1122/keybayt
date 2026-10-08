# Project Guidelines — Keybayt Dashboard

Rules every page/component in this project must follow. Check this list before
marking any task done.

## Core Rules

### 1. Image loader
Every image shows a loader (spinner/shimmer) until it loads, and a fallback icon if it fails.
Never render a bare `<img>`; use the shared `ImageWithLoader` component.

### 2. Never lose input data
Data typed in a form must survive accidental close/navigation.
- Keep create/edit panels **mounted**; only toggle the inner UI on `isOpen`.
- On close with unsaved changes → show `DiscardChangesModal` (Discard / Keep).
- Form state lives in the panel (or a context), not in something that unmounts on close.

### 3. Modal backdrop click = shake, not close
Clicking the empty area (backdrop) must **not** close a modal. It shakes the modal.
Use the shared `ShakeModal` / `useShake` for every modal. Closing happens only via
the X button or explicit action buttons.

### 4. Empty state for every API list
Wherever data comes from an API, handle **all** states:
`loading` (shimmer) → `error` (message + retry) → `empty` (EmptyState) → `data`.
Empty state differs for "no data yet" vs "no results for search/filter".

### 5. Search in every dropdown
All select/dropdown inputs have a search box inside (use the shared `SearchableSelect`).

### 6. Image preview
Every image can be opened in a preview (lightbox) on click, including uploaded
images before submit. Use the shared `ImagePreviewModal`.

### 7. Colors are declared once
All colors are tokens in `src/app/globals.css` under `@theme`. To change a color, change it
there only. Use Tailwind classes. **No hardcoded hex values** in components.

| Token | Value | Use |
|---|---|---|
| `primary` | `#0065FD` | Brand color: links, focus rings, active states (`text-primary`, `border-primary`) |
| `primary-hover` / `primary-light` | `#0057D6` / `#E6F0FF` | Hover and light tint backgrounds |
| `button` | `#006AFF` | **All buttons** (`bg-button`), via the shared `Button` |
| `button-hover` / `-active` / `-disabled` | `#005CE0` / `#004FC2` / `#99C3FF` | Button states |
| `foreground` / `muted` / `placeholder` | | Text colors |
| `background` / `surface` / `border` | | Page, card and border colors |
| `success` / `warning` / `danger` (+ `-light`) | | Status colors |

Buttons: never style a raw `<button>` with colors; always use `<Button>` from `@/components/ui`.

### 8. Digit-only inputs
Numeric fields (phone, OTP, age, amount, etc.) accept digits only: block letters on
keypress **and** sanitize on paste/change (`value.replace(/\D/g, '')`).
Use the shared `NumberInput`.

### 9. Icons, not raw SVG
Use icon libraries (`lucide-react`, `react-icons`). No inline `<svg>` markup in components.
(Logo/illustration files in `public/` are the only exception.)

## Code Structure Rules

- **Small, single-purpose components.** If a file grows large or does two things, split it.
  Page files (`page.jsx`) only compose components; logic goes to hooks, API calls to `services/`.
- **JSX only** (`.jsx` for components, `.js` for non-component code). No TypeScript.
- **One component per file**, PascalCase file name matching the component name.
- **Reusable first:** before writing UI, check `components/ui/` and `components/common/`.
  If it will be used twice, make it shared.
- **Route-specific components** live next to their route in a `components/` folder;
  shared ones live in `src/components/`.
- **API layer:** one file per domain in `src/services/` (e.g. `clientsService.js`) built on a single
  `apiClient`. Components never call `fetch` directly.
- **Constants** (labels, options, enums) go in `src/constants/`, not inline.
- **Imports** use the `@/` alias, never long `../../..` paths.
- **Styling:** Tailwind classes; use `cn()` from `@/lib/utils` for conditional classes.
- Add a short `.md` next to complex shared components documenting props (like `DiscardChangesModal.md` in the reference project).

## Folder Structure

```
src/
  app/                    routes, layouts, globals.css (color tokens)
    (auth)/ (dashboard)/  route groups
      <route>/components/ route-specific components
  components/
    ui/                   primitives: Button, Input, NumberInput, SearchableSelect, ...
    common/               ImageWithLoader, ImagePreviewModal, ShakeModal, EmptyState,
                          DiscardChangesModal, Shimmer, ...
    layout/               Sidebar, Navbar, ...
  constants/              static config & options
  context/                providers
  hooks/                  useShake, custom hooks
  lib/                    utils (cn, formatters)
  services/               API calls per domain
  store/                  global state (if/when needed)
```

## Shared components (already built — import, don't rewrite)

```js
import { Button, Input, NumberInput, SearchableSelect, Spinner } from "@/components/ui";
import { ImageWithLoader, ImagePreviewModal, ShakeModal, DiscardChangesModal,
         EmptyState, DataState, Shimmer, ListShimmer } from "@/components/common";
import { useShake } from "@/hooks/useShake";
import { cn, onlyDigits } from "@/lib/utils";
```

| Component | Covers rule | Notes |
|---|---|---|
| `ImageWithLoader` | 1, 6 | Loader + error fallback + click-to-preview. Use for every image |
| `ImagePreviewModal` | 6 | Close via X / Esc, backdrop click shakes |
| `ShakeModal` + `useShake` | 3 | Base for every modal; wrap in `<AnimatePresence>` |
| `DiscardChangesModal` | 2 | `onDiscard` resets form, `onKeep` keeps data |
| `EmptyState`, `Shimmer`, `ListShimmer` | 4 | |
| `DataState` | 4 | Wrap API sections: handles loading / error (+retry) / empty |
| `SearchableSelect` | 5 | `options=[{value,label}]`, `onChange(value)` |
| `NumberInput` | 8 | `onChange(cleanDigitsString)`, supports `maxLength` |
| `Button` | 7 | variants: `primary` `outline` `danger` `ghost`; `loading`, `leftIcon` |
| `Input` | | label, error, `leftIcon` |

Layout: `components/layout/` has `DashboardShell`, `Sidebar`, `SidebarItem`. Add a sidebar tab
by adding an item to `NAV_ITEMS` in `src/constants/navigation.js`. `Tooltip` (ui) is used for
collapsed-sidebar labels. Exception to rule 1: the brand logos in the sidebar/header are local
static assets and use `next/image` directly (no loader/preview).

Installed libs: `lucide-react`, `react-icons`, `framer-motion`, `clsx`, `tailwind-merge`.

## Reference

Patterns come from `../upliftt_coaching_dashboard`:
- `src/hooks/useShake.js` — `useShake` + `ShakeModal`
- `src/components/DiscardChangesModal.jsx` (+ `.md`) — unsaved-changes flow
- `.../clients/components/ProgramImage.jsx` — image loader + error fallback
- `.../clients/components/EmptyState.jsx` — empty state (filtered vs. no data)
- `.../clients/components/TableShimmer.jsx` — loading shimmer
- `src/lib/apiClient.js` — central API client
Differences here: no hardcoded hex colors (that project uses `#74D800` inline), and no inline SVG.

## PR / Task checklist

- [ ] Images have loader + fallback + preview
- [ ] Forms don't lose data; discard confirmation works
- [ ] Modals shake on backdrop click
- [ ] Loading / error / empty states handled
- [ ] Dropdowns are searchable
- [ ] No hardcoded colors; tokens used
- [ ] Number fields digit-only
- [ ] Icons from library, no inline SVG
- [ ] Components small and reusable
