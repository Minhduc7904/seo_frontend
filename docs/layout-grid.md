# Layout Grid Guide

This project uses a custom responsive grid defined in [globals.css](/C:/Users/Admin/Desktop/Job/seo_frontend/src/app/globals.css).

## 1) Core CSS Variables

Defined in `:root`:

- `--layout-cols-mobile: 4`
- `--layout-cols-tablet: 8`
- `--layout-cols-desktop: 12`
- `--layout-desktop-col-width: 80px`
- `--layout-column-gap: 20px`
- `--layout-inline-padding: 16px` (tablet becomes `24px`)

## 2) Base Layout Classes

### `.layout-shell`

- `width: 100%`
- `margin-inline: auto`
- `padding-inline: var(--layout-inline-padding)`
- At `min-width: 1280px`, `max-width` is locked by:

```css
calc(
  (var(--layout-cols-desktop) * var(--layout-desktop-col-width)) +
  ((var(--layout-cols-desktop) - 1) * var(--layout-column-gap)) +
  (var(--layout-inline-padding) * 2)
)
```

### `.layout-grid`

- Mobile: `repeat(4, minmax(0, 1fr))`
- Tablet (`>= 768px`): `repeat(8, minmax(0, 1fr))`
- Desktop (`>= 1280px`): `repeat(12, 80px)` + `justify-content: center`
- Direct children default to full width:
  - `.layout-grid > * { grid-column: 1 / -1; min-width: 0; }`

## 3) Breakpoints

- Mobile: `< 768px` => 4 columns
- Tablet: `>= 768px` => 8 columns
- Desktop: `>= 1280px` => 12 fixed columns

## 4) Usage Pattern

Wrap each page with shell + grid:

```tsx
<main className="layout-shell">
  <div className="layout-grid">
    <section className="col-span-4 md:col-span-8 xl:col-span-12">Header</section>
    <section className="col-span-4 md:col-span-4 xl:col-span-6">Left</section>
    <section className="col-span-4 md:col-span-4 xl:col-span-6">Right</section>
  </div>
</main>
```

## 5) Col-span Mapping

- Full row:
  - Mobile: `col-span-4`
  - Tablet: `md:col-span-8`
  - Desktop: `xl:col-span-12`
- 3 equal desktop columns:
  - `xl:col-span-4` each
- 2 equal tablet columns:
  - `md:col-span-4` each

## 6) Notes

- Prefer `w-full` for grid items; avoid fixed width in sections.
- Fix height only when needed (cards/media), let width follow grid.
- Keep `gap-5` (20px) to match `--layout-column-gap`.

