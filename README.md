# Golden Village Furniture

React + Vite website with the full teak furniture catalog (338 products, 22 categories, 3 collections), trade page and guides.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production files in dist/
```

## Where to edit

| What | File |
| --- | --- |
| Company name, email, phone, WhatsApp number, address | `src/site.ts` |
| Inquiry form delivery (Formspree etc.) | `.env` → `VITE_FORM_ENDPOINT` (without it, forms open the visitor's email app) |
| Products, categories, guides | `src/data/catalog.json` |
| Product and page images | `public/img/` |
| Featured products on the home page | `FEATURED` in `src/pages/Home.tsx` |
| Press items | `src/pages/Media.tsx` |
| Logo | `src/components/Logo.tsx` |
| Colours, fonts, spacing (the design tokens) | `src/styles/tokens.css` |
| Shared look of buttons, forms, cards… | `src/styles/components.css` |
| Header, footer, menus, WhatsApp, lightbox | `src/styles/layout.css` |
| One page's layout | `src/styles/pages/<page>.css` |

## How the front end is organised

```
src/
  components/        Header, Footer, WhatsApp widget, lightbox, forms
    ui/              Reusable pieces: Button, Carousel, Accordion, ProductCard, PageHero, Reveal…
  pages/             One file per route (all but Home are lazy-loaded)
  lib/               Catalog helpers, lead submission, page-meta and media-query hooks
  styles/
    tokens.css       Palette, type scale, spacing, shadows, motion — change the look here
    base.css         Reset, typography, layout primitives, focus styles
    components.css   Buttons, forms, cards, accordion, carousel
    layout.css       Header / mega menu / mobile drawer / footer / WhatsApp / lightbox
    pages/           Page-specific layout, imported by each page
```

**Design system.** Colours are named after the materials: *linen* (backgrounds), *walnut* (text and dark sections),
*brass* (the “golden” accent) and *forest* (actions and links). Headings use Fraunces, text uses Manrope; both are
self-hosted variable fonts (`@fontsource-variable`), so there is no request to Google Fonts. Icons come from
`react-icons` (Phosphor set, `react-icons/pi`). Carousels use Swiper, scroll animation uses Framer Motion and the
FAQ accordion uses Radix UI.

**Responsive breakpoints.** Mobile first. The inline navigation appears at 1024px (below that the drawer is used);
content grids step up at 640px, 768px, 900px, 1024px and 1200px. Content is capped at 1360px wide.

## Hosting

It is a single-page app, so the host must send every path to `index.html`.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this.
