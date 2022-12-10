import { useQuery } from '@tanstack/react-query';

import { getMainTagInfos } from '@/apis/ev';

export const useMainTags = () => {
  return useQuery(['mainTags'], () => getMainTagInfos());
};
