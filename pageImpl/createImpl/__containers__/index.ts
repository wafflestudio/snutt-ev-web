import { fetchLectureSemesters } from "@lib/api/apis"
import { useQuery } from "react-query"

export function useSemsetersContainer() {
  const querySearch = useQuery("lecturesemester", fetchLectureSemesters)
  const { data, error } = querySearch

  return {
    data,
    error,
  }
}
