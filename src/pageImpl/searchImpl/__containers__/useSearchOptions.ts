import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type CurrentlyAppliedQuery = { tags: number[]; textQuery?: string };
type RouterQuery = {
  tag?: string | string[];
  q?: string;
} & unknown;

interface Return {
  currentlyAppliedQuery: CurrentlyAppliedQuery | undefined;
  refreshQueries: () => void;
  toggleTagSelection: (tagID: number) => void;
  selectedTextQuery: string;
  updateTextQuery: (textQuery: string) => void;
  selectedTagIDs: number[];
}

const getQueryFromRoute = ({ tag, q }: RouterQuery) => {
  const tags = (() => {
    if (typeof tag === 'undefined') return [];
    if (typeof tag === 'string') return [Number(tag)];
    return tag.map((id) => Number(id));
  })();
  const textQuery = q ?? '';

  return { tags, textQuery };
};

export const useSearchOptions = (): Return => {
  const router = useRouter();
  const [selectedTagIDs, setSelectedTagIDs] = useState<number[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');

  useEffect(() => {
    const { tags, textQuery } = getQueryFromRoute(router.query as RouterQuery);
    setSelectedTagIDs(tags);
    setSearchKey(textQuery);
  }, [router.query]);

  const toggleTagSelection = (tagID: number) => {
    const isExist = selectedTagIDs.includes(tagID);
    const newSelectedTagIDs = isExist
      ? selectedTagIDs.filter((id) => id !== tagID)
      : selectedTagIDs.concat(tagID);

    setSelectedTagIDs(newSelectedTagIDs);
  };

  const currentlyAppliedQuery = getQueryFromRoute(router.query as RouterQuery);

  const refreshQueries = () => {
    const newParams = new URLSearchParams();
    selectedTagIDs.forEach((id) => newParams.append('tag', `${id}`));
    newParams.set('q', searchKey);

    router.replace(`${router.pathname}?${newParams}`);
  };

  return {
    currentlyAppliedQuery,
    refreshQueries,
    toggleTagSelection,
    selectedTextQuery: searchKey,
    updateTextQuery: setSearchKey,
    selectedTagIDs,
  };
};
