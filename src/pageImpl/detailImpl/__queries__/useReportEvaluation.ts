import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postReportEvaluation } from '@/apis/ev';

export const useReportEvaluation = (lectureId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, content }: { id: number; content: string }) => postReportEvaluation({ params: { id }, body: { content } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['evaluationSummary', lectureId]);
        queryClient.invalidateQueries(['lectureEvaluation', lectureId]);
      },
    },
  );
};
