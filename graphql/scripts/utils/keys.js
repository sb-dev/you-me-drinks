import { PUBLIC_ROLE, SERVER_ROLE } from './roles.js';

import faunadb from 'faunadb';

const q = faunadb.query;

export const createPublicKey = q.CreateKey({
  role: q.Role(PUBLIC_ROLE),
  data: {
    name: "For unauthenticated users",
  }
});

export const createServerKey = q.CreateKey({
  role: q.Role(SERVER_ROLE),
  data: {
    name: "For SSR/SSG",
  }
});
