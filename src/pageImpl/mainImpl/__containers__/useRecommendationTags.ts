import { useQuery } from '@tanstack/react-query';

import { getMainTagInfos } from '@/lib/apis/ev';

export const useRecommendationTags = () => {
  const { data } = useQuery(['mainTags'], () => getMainTagInfos());
  return { recommendationTags: data?.tags ?? [] };
};
