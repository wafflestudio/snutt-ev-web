import { useQuery } from "react-query"

import { fetchLatestLectures } from "@/lib/api/apis"

export function useRecentLectureContainer() {
  const querySearch = useQuery("recent/", fetchLatestLectures)

  const { data, error } = querySearch

  return {
    recentLectureList: data,
    error,
  }
}
