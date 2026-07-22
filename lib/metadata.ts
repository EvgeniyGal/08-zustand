import type { Metadata } from 'next';

export const SITE_NAME = 'NoteHub';
export const DEFAULT_DESCRIPTION =
  'A simple and efficient application for managing personal notes';
export const OG_IMAGE =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

export function buildOpenGraph({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
  };
}
