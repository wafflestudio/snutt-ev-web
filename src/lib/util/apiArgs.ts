import { GetServerSidePropsContext } from 'next';

export type Context = { context?: GetServerSidePropsContext };
export type Args<P = undefined, Q = undefined, B = undefined> = Context &
  (P extends undefined ? unknown : { params: P }) &
  (Q extends undefined ? unknown : { query: Q }) &
  (B extends undefined ? unknown : { body: B });
