import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export const dynamic = 'force-dynamic';

interface FilterNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterNotesPage({
  params,
}: FilterNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0];
  const apiTag = tag && tag !== 'all' ? tag : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag: apiTag }),
  });

  const notesState = queryClient.getQueryState(['notes', '', 1, tag]);
  if (notesState?.status === 'error') {
    throw notesState.error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
