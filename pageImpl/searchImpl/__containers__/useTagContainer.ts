import { useInfiniteQuery, useQuery } from "react-query"
import { GetTagInfosResult } from "../../../lib/dto/getTagInfos"
import { ApiError } from "../../../lib/dto/core/error"
import { useState } from "react"
import { TagDTO } from "../../../lib/dto/core/tag"
import { fetchTagInfos, getLectures } from "@lib/api/apis"

export function useTagContainer() {
  const [currentlyAppliedQuery, setCurrentAppliedQuery] =
    useState<{ tags: TagDTO[]; textQuery?: string }>()
  const [selectedTags, setSelectedTags] = useState<TagDTO[]>([])
  const [textQuery, setTextQuery] = useState<string | undefined>()

  const { data, error, isLoading } = useQuery<GetTagInfosResult, ApiError>(
    "tagInfos",
    fetchTagInfos,
  )
  const toggleTagSelection = (tag: TagDTO) => {
    setSelectedTags((prev) => {
      if (prev?.some((it) => it.name == tag.name)) {
        return prev.filter((it) => it.name != tag.name)
      } else {
        return prev?.concat(tag)
      }
    })
  }

  const refreshQueries = () => {
    setCurrentAppliedQuery({
      tags: selectedTags,
      textQuery: textQuery,
    })
  }

  return {
    tagGroups: data?.tag_groups,
    error,
    isLoading,
    selectedTags,
    toggleTagSelection,
    currentlyAppliedQuery,
    refreshQueries,
  }
}
