import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteEvaluation } from '@/lib/apis/ev';

export const useDeleteEvaluation = (lectureId: number) => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteEvaluation({ params: { id } }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['evaluationSummary', lectureId]);
      queryClient.invalidateQueries(['myLectureEvaluation', lectureId]);
      queryClient.invalidateQueries(['lectureEvaluation', lectureId]);
    },
  });
};
