import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { TagDTO } from '@/dto/tag';

type RouterQuery = {
  tag?: string;
} & unknown;

export const useSelectTag = (tags: TagDTO[]) => {
  const router = useRouter();

  const selectedTagId = (router.query as RouterQuery).tag || tags[0]?.id;

  const setSelectedTagId = useCallback(
    (tagId: number) => {
      if (selectedTagId === `${tagId}`) return;
      const params = new URLSearchParams();
      params.set('tag', `${tagId}`);
      const url = `${router.pathname}?${params}`;
      router.replace(url, undefined, { shallow: true });
    },
    [router, selectedTagId],
  );

  const onClickTag = (tagId: number) => {
    setSelectedTagId(tagId);
  };

  return {
    selectedTagId: selectedTagId === undefined ? undefined : Number(selectedTagId),
    onClickTag,
  };
};
