import { listMyEvaluations } from '@/apis/ev';
import { MyEvaluationsImpl } from '@/pageImpl/myEvaluationsImpl';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function MyEvaluationsView() {
  return <MyEvaluationsImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async (context, { queryClient }) => {
    await Promise.all([
      queryClient.prefetchInfiniteQuery(['evaluations', 'list', 'my'], async ({ pageParam }) =>
        listMyEvaluations({ query: { cursor: pageParam }, context }),
      ),
    ]);
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
