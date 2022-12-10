import { fetchTagInfos } from '@/apis/ev';
import { SearchImpl } from '@/pageImpl/searchImpl';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function SearchView() {
  return <SearchImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async (context, { queryClient }) => {
    await Promise.all([queryClient.prefetchQuery(['tagInfos'], () => fetchTagInfos({ context }))]);

    return { props: {} };
  },
  { emailVerification: 'verified' },
);
