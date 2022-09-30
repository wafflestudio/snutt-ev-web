import { fetchLatestLectures, getMainTagInfos } from '@/lib/apis/ev';
import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { MainImpl } from '@/pageImpl/mainImpl';

export default function MainView() {
  return <MainImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async (context, { queryClient }) => {
    await Promise.all([
      queryClient.prefetchQuery(['mainTags'], () => getMainTagInfos({ context })),
      queryClient.prefetchQuery(['latestLectures'], () => fetchLatestLectures({ context })),
    ]);
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
