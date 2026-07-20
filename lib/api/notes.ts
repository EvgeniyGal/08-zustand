import type { Note, NewNote } from '@/types/note';
import { api } from './client';

export interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search = '',
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  if (tag) {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
