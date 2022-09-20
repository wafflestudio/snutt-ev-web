import { useQuery } from '@tanstack/react-query';

import { getMainTagInfos } from '@/lib/api/apis';

export const useRecommendationTags = () => {
  const { data } = useQuery(['mainTags'], getMainTagInfos);
  return { recommendationTags: data?.tags ?? [] };
};
