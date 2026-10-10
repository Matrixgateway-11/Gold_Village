# Golden Village Furniture

React + Vite website with the full teak furniture catalog (338 products, 22 categories, 3 collections), trade page and guides.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production files in dist/
```

## Where to edit

| What | File |
| --- | --- |
| Company name, email, phone, WhatsApp number, address | `src/site.ts` |
| Inquiry form delivery (Formspree etc.) | `.env` → `VITE_FORM_ENDPOINT` (without it, forms open the visitor's email app) |
| Products, categories, guides | `src/data/catalog.json` |
| Product and page images | `public/img/` |
| Press items | `src/pages/Media.tsx` |
| Logo | `src/components/Logo.tsx` |
| Styling | `src/styles/theme.css` |

## Hosting

It is a single-page app, so the host must send every path to `index.html`.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) already do this.
