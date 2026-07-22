import type { Metadata } from 'next';
import { buildOpenGraph, SITE_URL } from '@/lib/metadata';
import css from './not-found.module.css';

export const metadata: Metadata = buildOpenGraph({
  title: '404 - Page not found | NoteHub',
  description:
    'The page you are looking for does not exist in the NoteHub application.',
  url: `${SITE_URL}/404`,
});

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
