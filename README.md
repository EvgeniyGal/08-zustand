# NoteHub

Next.js (App Router) app for managing personal notes with search, pagination, create and delete.

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
- `/notes` — notes list (SSR prefetch + CSR)
- `/notes/[id]` — note details (SSR prefetch + CSR)
