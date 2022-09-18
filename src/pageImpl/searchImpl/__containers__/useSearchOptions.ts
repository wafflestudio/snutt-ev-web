import { useState } from 'react';

import { TagWithColor } from '@/lib/dto/core/tag';

type CurrentlyAppliedQuery = { tags: TagWithColor[]; textQuery?: string };

interface Return {
  currentlyAppliedQuery: CurrentlyAppliedQuery | undefined;
  refreshQueries: () => void;
  toggleTagSelection: (tag: TagWithColor) => void;
  selectedTextQuery: string | undefined;
  updateTextQuery: (textQuery: string | undefined) => void;
  selectedTags: TagWithColor[];
}

export const useSearchOptions = (): Return => {
  const [selectedTags, setSelectedTags] = useState<TagWithColor[]>([]);
  const [textQuery, setTextQuery] = useState<string | undefined>();
  const [currentlyAppliedQuery, setCurrentAppliedQuery] =
    useState<CurrentlyAppliedQuery>();

  const toggleTagSelection = (tag: TagWithColor) => {
    setSelectedTags((prev) => {
      if (prev?.some((it) => it.name == tag.name)) {
        return prev.filter((it) => it.name != tag.name);
      } else {
        return prev?.concat(tag);
      }
    });
  };

  const refreshQueries = () => {
    setCurrentAppliedQuery({
      tags: selectedTags,
      textQuery: textQuery,
    });
  };

  return {
    currentlyAppliedQuery,
    refreshQueries,
    toggleTagSelection,
    selectedTextQuery: textQuery,
    updateTextQuery: setTextQuery,
    selectedTags,
  };
};
