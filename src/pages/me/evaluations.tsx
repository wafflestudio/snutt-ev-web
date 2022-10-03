import { listMyEvaluations } from '@/lib/apis/ev';
import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { MyEvaluationsImpl } from '@/pageImpl/myEvaluationsImpl';

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
