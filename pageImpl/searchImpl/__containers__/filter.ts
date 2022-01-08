import { useQuery } from "react-query"
import { GetTagInfos } from "../../../lib/dto/tagInfos"
import { ApiError } from "../../../lib/dto/core/error"
import { useState } from "react"
import { TagDTO } from "../../../lib/dto/core/tag"
import { fetchTagInfos } from "@lib/api/apis"

export function useTagContainer() {
  const { data, error, isLoading } = useQuery<GetTagInfos, ApiError>(
    "asdf",
    fetchTagInfos,
  )
  const [selectedTags, setSelectedTags] = useState<TagDTO[]>([])

  const toggleTagSelection = (tag: TagDTO) => {
    setSelectedTags((prev) => {
      if (prev?.some((it) => it.name == tag.name)) {
        return prev.filter((it) => it.name != tag.name)
      } else {
        return prev?.concat(tag)
      }
    })
  }

  return {
    tagGroupWithTags: data?.results,
    error,
    isLoading,
    selectedTags,
    toggleTagSelection,
  }
}
