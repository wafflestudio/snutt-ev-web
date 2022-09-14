import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { fetchTagInfos } from "@/lib/api/apis"
import { TagWithColor } from "@/lib/dto/core/tag"

export function useTagContainer() {
  const [currentlyAppliedQuery, setCurrentAppliedQuery] =
    useState<{ tags: TagWithColor[]; textQuery?: string }>()
  const [selectedTags, setSelectedTags] = useState<TagWithColor[]>([])
  const [textQuery, setTextQuery] = useState<string | undefined>()

  const { data, error, isLoading } = useQuery(["tagInfos"], fetchTagInfos, {
    select: ({ tag_groups }) => ({
      tag_groups: tag_groups.map(({ color, tags, ...group }) => ({
        ...group,
        color,
        tags: tags.map((tag) => ({ ...tag, color })),
      })),
    }),
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
