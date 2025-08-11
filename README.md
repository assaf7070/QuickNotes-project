# QuickNotes (React + Vite + Mantine)

A simple, fast notes app: add, edit (inline in a modal), delete, categorize, search, and persist to Local Storage.

**Live demo:** https://assaf7070.github.io/QuickNotes-project/

---

## Features
- Add notes (title optional) with created timestamp
- Edit inside a modal (click title/body to toggle editing, then **Update**)
- Shows **Updated** timestamp after edits
- Delete with confirmation
- Categories (Personal / Work / Ideas / Study) with colored cards
- Search (title/body) + category filters (multi-select)
- Persists to **Local Storage**
- Built with **React + Vite + Mantine + date-fns**

---

## Tech Stack
- React 18, Vite
- Mantine UI (`@mantine/core`, `@mantine/hooks`)
- date-fns
- Local Storage
- GitHub Pages (deployed via Actions or `gh-pages`)

> Make sure your app imports Mantine styles in `main.jsx`:
> ```js
> import '@mantine/core/styles.css';
> ```

---

## Getting Started

> If your app folder is `my-app/`, run the commands inside that folder:
> ```bash
> cd my-app
> ```

Install & run:
```bash
npm ci
npm run dev
