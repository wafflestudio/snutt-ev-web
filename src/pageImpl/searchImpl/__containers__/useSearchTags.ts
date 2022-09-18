import { useQuery } from '@tanstack/react-query';

import { fetchTagInfos } from '@/lib/api/apis';
import { GetTagInfosProcessedResult } from '@/lib/dto/getTagInfos';

const select = ({ tag_groups }: GetTagInfosProcessedResult) => ({
  tag_groups: tag_groups.map(({ color, tags, ...group }) => ({
    ...group,
    color,
    tags: tags.map((tag) => ({ ...tag, color })),
  })),
});

export function useSearchTags() {
  const { data, error, isLoading } = useQuery(['tagInfos'], fetchTagInfos, {
    select,
  });

  return {
    tagGroups: data?.tag_groups,
    error,
    isLoading,
  };
}
