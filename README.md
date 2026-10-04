# My Personal Website

A minimal personal site built with [Jekyll](https://jekyllrb.com/), hosted on GitHub Pages.

## Wishlist page (`/wishlist`)

The wishlist is written in TypeScript and compiled to plain JS, which is committed so GitHub Pages serves it as-is.

- Edit wishes in `assets/ts/wishes.ts` (title, why, category, image, decorations, `granted`).
- Put images in `assets/images/wishlist/` — transparent PNG/WebP cut-outs work best.
- Rebuild: `npm install` once, then `npm run build` (or `npm run watch` while editing).
- Styles live in `assets/css/wishlist.css`.
