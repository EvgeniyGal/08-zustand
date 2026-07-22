'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NotesPage.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const apiTag = tag && tag !== 'all' ? tag : undefined;

  const updateDebouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    updateDebouncedSearch(value);
  };

  const { data, isLoading, isError, isSuccess, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['notes', debouncedSearch, page, tag],
      queryFn: () => fetchNotes({ page, search: debouncedSearch, tag: apiTag }),
      placeholderData: keepPreviousData,
    });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    setPage(1);
    setSearch('');
    setDebouncedSearch('');
  }, [tag]);

  useEffect(() => {
    toast.dismiss('no-notes-found');
  }, [tag, debouncedSearch, page]);

  useEffect(() => {
    if (isFetching || isPlaceholderData || !isSuccess || notes.length > 0)
      return;

    toast.error('No notes found for your request.', { id: 'no-notes-found' });
  }, [
    isFetching,
    isPlaceholderData,
    isSuccess,
    notes.length,
    tag,
    debouncedSearch,
    page,
  ]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {notes.length > 0 && <NoteList notes={notes} />}

      <Toaster position="top-center" />
    </div>
  );
}
