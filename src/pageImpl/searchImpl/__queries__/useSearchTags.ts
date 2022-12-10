import { useQuery } from '@tanstack/react-query';

import { fetchTagInfos } from '@/apis/ev';
import { TagGroupDTO } from '@/dto/tagGroup';

const select = ({ tag_groups }: { tag_groups: TagGroupDTO[] }) =>
  tag_groups.map(({ color, tags, ...group }) => ({
    ...group,
    color,
    tags: tags.map((tag) => ({ ...tag, color })),
  }));

export function useSearchTags() {
  return useQuery(['tagInfos'], () => fetchTagInfos(), { select });
}
