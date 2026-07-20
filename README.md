# NoteHub — Advanced Routing

Next.js (App Router) app for managing personal notes with search, pagination, tag filtering, and modal note preview.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file based on `.env.example` and add your personal token from NoteHub API docs:

```
NEXT_PUBLIC_NOTEHUB_TOKEN=your_token_here
```

3. Start the development server:

```bash
npm run dev
```

## Scripts

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run format` — format code with Prettier

## Routes

- `/` — home page
- `/notes/filter/all` — all notes (SSR prefetch + CSR)
- `/notes/filter/{tag}` — notes filtered by tag (Todo, Work, Personal, Meeting, Shopping)
- `/notes/[id]` — note details page (direct access)
- `/notes/[id]` — note preview modal (intercepting route when navigating from the list)

## Features

- **404 page** — custom not-found page for invalid routes
- **Parallel routes** — sidebar tag filter (`@sidebar`) updates independently from the notes list
- **Intercepting routes** — note details open in a modal without leaving the current filter view
