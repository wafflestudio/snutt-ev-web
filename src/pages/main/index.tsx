import React from 'react';

import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { MainImpl } from '@/pageImpl/mainImpl';

export default function MainView() {
  return <MainImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
