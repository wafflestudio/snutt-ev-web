import { fetchEvaluationSummary, fetchLectureEvaluations, fetchMyLectureEvaluations } from '@/lib/apis/ev';
import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { DetailImpl } from '@/pageImpl/detailImpl';

export default function DetailView() {
  return <DetailImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async (context, { queryClient }) => {
    const id = Number(context.query.id);

    await Promise.all([
      queryClient.prefetchQuery(['evaluationSummary', id] as const, ({ queryKey: [, id] }) =>
        fetchEvaluationSummary({ params: { id }, context }),
      ),
      queryClient.prefetchQuery(['myLectureEvaluation', id] as const, async ({ queryKey: [, id] }) =>
        fetchMyLectureEvaluations({ params: { id }, context }),
      ),
      queryClient.prefetchInfiniteQuery(['lectureEvaluation', id], async ({ pageParam }) =>
        fetchLectureEvaluations({ params: { id }, query: { cursor: pageParam }, context }),
      ),
    ]);

    return { props: {} };
  },
  { emailVerification: 'verified' },
);
