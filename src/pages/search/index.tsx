import React from 'react';

import { fetchTagInfos } from '@/lib/api/apis';
import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { SearchImpl } from '@/pageImpl/searchImpl';

export default function SearchView() {
  return <SearchImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async (context, { queryClient }) => {
    await Promise.all([
      queryClient.prefetchQuery(['tagInfos'], () => fetchTagInfos({ context })),
    ]);

    return { props: {} };
  },
  { emailVerification: 'verified' },
);
