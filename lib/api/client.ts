import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';

const notehubToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${notehubToken}`,
  },
});
