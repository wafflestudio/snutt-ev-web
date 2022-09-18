import { useState } from 'react';

type CurrentlyAppliedQuery = { tags: number[]; textQuery?: string };

interface Return {
  currentlyAppliedQuery: CurrentlyAppliedQuery | undefined;
  refreshQueries: () => void;
  toggleTagSelection: (tagID: number) => void;
  selectedTextQuery: string | undefined;
  updateTextQuery: (textQuery: string | undefined) => void;
  selectedTagIDs: number[];
}

export const useSearchOptions = (): Return => {
  const [selectedTagIDs, setSelectedTagIDs] = useState<number[]>([]);
  const [textQuery, setTextQuery] = useState<string | undefined>();
  const [currentlyAppliedQuery, setCurrentAppliedQuery] =
    useState<CurrentlyAppliedQuery>();

  const toggleTagSelection = (tagID: number) => {
    const isExist = selectedTagIDs.includes(tagID);
    const newSelectedTagIDs = isExist
      ? selectedTagIDs.filter((id) => id !== tagID)
      : selectedTagIDs.concat(tagID);

    setSelectedTagIDs(newSelectedTagIDs);
  };

  const refreshQueries = () => {
    setCurrentAppliedQuery({
      tags: selectedTagIDs,
      textQuery: textQuery,
    });
  };

  return {
    currentlyAppliedQuery,
    refreshQueries,
    toggleTagSelection,
    selectedTextQuery: textQuery,
    updateTextQuery: setTextQuery,
    selectedTagIDs,
  };
};
