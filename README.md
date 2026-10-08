# Keybayt Dashboard

Next.js (App Router, JavaScript/JSX) + Tailwind CSS v4.

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – run production build
- `npm run lint` – lint

## Structure
```
src/
  app/          routes, layouts, global styles
  components/
    ui/         reusable primitives (Button, Input, ...)
    layout/     Sidebar, Header, etc.
  constants/    static config
  context/      React context providers
  hooks/        custom hooks
  lib/          helpers/utilities
  services/     API calls
```
Import alias: `@/` → `src/`.
