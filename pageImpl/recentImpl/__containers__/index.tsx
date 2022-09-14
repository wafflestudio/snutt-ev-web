import { fetchLatestLectures } from "@/lib/api/apis"
import { useQuery } from "react-query"

export function useRecentLectureContainer() {
  const querySearch = useQuery("recent/", fetchLatestLectures)

  const { data, error } = querySearch

  return {
    recentLectureList: data,
    error,
  }
}
