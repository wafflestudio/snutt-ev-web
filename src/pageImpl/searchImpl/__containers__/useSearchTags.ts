import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchTagInfos } from '@/lib/api/apis';
import { GetTagInfosProcessedResult } from '@/lib/dto/getTagInfos';

export function useSearchTags() {
  const select = useCallback(
    ({ tag_groups }: GetTagInfosProcessedResult) => ({
      tag_groups: tag_groups.map(({ color, tags, ...group }) => ({
        ...group,
        color,
        tags: tags.map((tag) => ({ ...tag, color })),
      })),
    }),
    [],
  );

  const { data, error, isLoading } = useQuery(['tagInfos'], fetchTagInfos, {
    select,
  });

  return {
    tagGroups: data?.tag_groups,
    error,
    isLoading,
  };
}
