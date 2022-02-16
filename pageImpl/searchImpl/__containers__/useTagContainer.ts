import { useQuery } from "react-query"
import { GetTagInfosProcessedResult } from "@lib/dto/getTagInfos"
import { ApiError } from "@lib/dto/core/error"
import { useCallback, useState } from "react"
import { TagWithColor, TagDTO } from "@lib/dto/core/tag"
import { fetchTagInfos } from "@lib/api/apis"

export function useTagContainer() {
  const [currentlyAppliedQuery, setCurrentAppliedQuery] =
    useState<{ tags: TagWithColor[]; textQuery?: string }>()
  const [selectedTags, setSelectedTags] = useState<TagWithColor[]>([])
  const [textQuery, setTextQuery] = useState<string | undefined>()

  const { data, error, isLoading } = useQuery<
    GetTagInfosProcessedResult,
    ApiError
  >("tagInfos", fetchTagInfos, {
    select: useCallback(
      ({ tag_groups }) => ({
        tag_groups: tag_groups.map(
          ({
            color,
            tags,
            ...group
          }: {
            color: string
            tags: TagWithColor[]
          }) => ({
            ...group,
            tags: tags.map((tag: TagDTO) => ({ ...tag, color })),
          }),
        ),
      }),
      [],
    ),
  })

  const toggleTagSelection = (tag: TagWithColor) => {
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
    selectedTextQuery: textQuery,
    updateTextQuery: setTextQuery,
  }
}
