'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

interface NoteToDelete {
  id: string;
  title: string;
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [noteToDelete, setNoteToDelete] = useState<NoteToDelete | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setNoteToDelete(null);
    },
  });

  const handleDeleteClick = (id: string, title: string) => {
    setNoteToDelete({ id, title });
  };

  const handleConfirmDelete = () => {
    if (!noteToDelete) return;
    mutate(noteToDelete.id);
  };

  const handleCancelDelete = () => {
    setNoteToDelete(null);
  };

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <div className={css.actions}>
                <Link href={`/notes/${note.id}`} className={css.link}>
                  View details
                </Link>
                <button
                  type="button"
                  className={css.button}
                  onClick={() => handleDeleteClick(note.id, note.title)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {noteToDelete && (
        <Modal onClose={handleCancelDelete}>
          <div className={css.confirm}>
            <h2 className={css.confirmTitle}>Delete note</h2>
            <p className={css.confirmText}>
              Are you sure you want to delete &quot;{noteToDelete.title}&quot;?
            </p>
            <div className={css.confirmActions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancelDelete}
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                className={css.button}
                onClick={handleConfirmDelete}
                disabled={isPending}
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
