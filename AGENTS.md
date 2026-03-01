# AGENTS.md

## Cursor Cloud specific instructions

This is a static portfolio website (HTML, CSS, vanilla JS) with **zero npm/build dependencies**. There is no `package.json`, no bundler, no linter config, and no test framework.

### Running the dev server

Serve the project root with any static file server:

```bash
npx serve . -l 3000
```

Do **not** use the `-s` (SPA) flag — the site is multi-page (separate `.html` files) and SPA mode causes all routes to serve `index.html`.

Alternatively: `python3 -m http.server 3000`

The site is then available at `http://localhost:3000/`.

### Key pages

| Page | File |
|---|---|
| Home (bento grid) | `index.html` |
| About | `about.html` |
| Skills | `skills.html` |
| Projects | `projects.html` |
| Typing test | `typing.html` |
| Contact | `contact.html` |

### Notes

- No automated tests, lint, or build steps exist in this repo.
- The contact form (`contact.html`) is client-side only — submission is faked with a `setTimeout`.
- Theme toggle (dark/light) persists via `localStorage`.
- External dependency: Google Fonts loaded from CDN; site degrades gracefully without network.
