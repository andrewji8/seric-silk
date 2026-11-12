# SERIC — Silk Atelier (original demo)

A complete front-end silk e-commerce concept: quiet-luxury aesthetic, working
cart, collections, product detail pages and a journal — no backend required.

> **Originality note.** SERIC is an *original* concept study inspired by the
> general UX patterns of luxury silk e-commerce (hero banner, category tiles,
> journal, cart drawer). All branding, copy, product data and artwork in this
> repository are original to this project. No code, images, text or brand
> assets are copied from lilysilk.com or any other company's website.

## Pages

| Page | Path |
| --- | --- |
| Home | `index.html` |
| Shop (filter + sort) | `shop.html` |
| Product detail | `product.html?id=<slug>` |
| Collections | `collections.html` |
| About / craft | `about.html` |
| Journal (4 articles) | `journal.html`, `journal.html?id=<slug>` |

## Tech

- Vanilla HTML + CSS + JS. No build step, no dependencies, no binary assets.
- All product artwork is **procedurally generated SVG** (woven-band renderer in
  `js/main.js`) — every "photo" in the shop is drawn, not downloaded.
- Cart persists to `localStorage` (`seric-cart-v1`).
- Fonts: Cormorant Garamond + Jost (Google Fonts, with system fallbacks).

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
# or: npx serve .
```

## Structure

```
index.html / shop.html / product.html / collections.html / about.html / journal.html
css/styles.css          # all styling
js/data.js              # catalogue: categories, products, collections, articles
js/main.js              # chrome injection, SVG art, cart, page renderers
```

## Extending

- **Checkout**: the drawer's checkout button is a stub — wire it to a
  payment provider to make commerce real.
- **Product art**: swap `productArt()` for real photography when you have it.
- **Catalogue**: everything in `js/data.js` is editable content.
