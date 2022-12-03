import { fetchEvaluationSummary, fetchLectureEvaluations, fetchMyLectureEvaluations } from '@/lib/apis/ev';
import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { DetailImpl } from '@/pageImpl/detailImpl';

type PageProps = { onBack: 'close' | 'back' };

export default function DetailView({ onBack }: PageProps) {
  return <DetailImpl onBack={onBack} />;
}

export const getServerSideProps = withGetServerSideProps<PageProps>(
  async (context, { queryClient }) => {
    // on_back 파라미터: 좌상단 버튼 클릭시 일어날 동작을 명시한다.
    // back 이거나 없을 경우 웹뷰 기본 동작 수행.
    // close 일 경우 웹뷰 종료 동작 수행
    // 관련: https://www.notion.so/wafflestudio/d291fe606ec0407ea1292120b070db90
    const onBack = context.query.on_back === 'close' ? 'close' : 'back';
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

    return { props: { onBack } };
  },
  { emailVerification: 'verified' },
);
