import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { buildOpenGraph, DEFAULT_DESCRIPTION, SITE_URL } from '@/lib/metadata';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const description =
      note.content.trim().slice(0, 160) || DEFAULT_DESCRIPTION;

    return buildOpenGraph({
      title: `${note.title} | NoteHub`,
      description,
      url: `${SITE_URL}/notes/${id}`,
    });
  } catch {
    return buildOpenGraph({
      title: 'Note not found | NoteHub',
      description: 'The requested note could not be found in NoteHub.',
      url: `${SITE_URL}/notes/${id}`,
    });
  }
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const noteState = queryClient.getQueryState(['note', id]);
  if (noteState?.status === 'error') {
    throw noteState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
