import { fetchSemesterLectures } from "@lib/api/apis"
import { useState } from "react"
import { useQuery } from "react-query"

export function useSemestersContainer(id: number) {
  const querySearch = useQuery(
    ["lectureSemester", id],
    () => fetchSemesterLectures(id),
    {
      enabled: !isNaN(id),
    },
  )
  const { data, error } = querySearch

  return {
    data,
    error,
  }
}

export function usePolygonContainer() {
  const defaultValue = 3

  const [score, setScore] = useState<{
    top: number
    left: number
    bottom: number
    right: number
  }>({
    top: defaultValue,
    left: defaultValue,
    bottom: defaultValue,
    right: defaultValue,
  })

  const updateScore = (
    value: number,
    direction: "top" | "left" | "bottom" | "right",
  ) => {
    const realValue = value
    const nextValue = realValue < 1 ? 1 : realValue
    setScore((prev) => ({
      ...prev,
      [direction]: nextValue,
    }))
  }

  return {
    defaultValue,
    score,
    updateScore,
  }
}
