import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { TagDTO } from '@/lib/dto/core/tag';

type RouterQuery = {
  tag?: string;
} & unknown;

export const useSelectTag = (tags: TagDTO[]) => {
  const router = useRouter();

  const selectedTagId = (router.query as RouterQuery).tag;

  const setSelectedTagId = useCallback(
    (tagId: number) => {
      if (selectedTagId === `${tagId}`) return;
      const params = new URLSearchParams();
      params.set('tag', `${tagId}`);
      router.replace(`${router.pathname}?${params}`);
    },
    [router, selectedTagId],
  );

  useEffect(() => {
    if (selectedTagId !== undefined) return;

    setSelectedTagId(tags[0]?.id);
  }, [tags, setSelectedTagId, selectedTagId]);

  const onClickTag = (tagId: number) => {
    setSelectedTagId(tagId);
  };

  return { selectedTagId: Number(selectedTagId), onClickTag };
};
