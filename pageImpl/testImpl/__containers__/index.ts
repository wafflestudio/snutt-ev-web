import { fetchMyReviews, fetchRecentReviews } from "@lib/api/apis"
import { useState } from "react"
import { useQuery } from "react-query"

export type TapOptions = "recent" | "my"

export function useContainer() {
  const queryRecent = useQuery("reviews/recent", fetchRecentReviews)

  const queryMy = useQuery("reviews/my", fetchMyReviews)

  const [selectedTap, setSelectedTap] = useState<TapOptions>("recent")

  const { data, error, isLoading } =
    selectedTap === "recent" ? queryRecent : queryMy

  return {
    data,
    error,
    isLoading,
    selectedTap,
    setSelectedTap,
  }
}
