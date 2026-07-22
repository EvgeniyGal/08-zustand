import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import { buildOpenGraph, SITE_URL } from '@/lib/metadata';
import css from './CreateNote.module.css';

export const metadata: Metadata = buildOpenGraph({
  title: 'Create note | NoteHub',
  description:
    'Create a new note in NoteHub. Your draft is saved automatically while you write.',
  url: `${SITE_URL}/notes/action/create`,
});

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
