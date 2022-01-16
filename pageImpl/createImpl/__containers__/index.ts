import { fetchLectureSemesters } from "@lib/api/apis"
import { useState } from "react"
import { useQuery } from "react-query"

export function useSemsetersContainer() {
  const querySearch = useQuery("lecturesemester", fetchLectureSemesters)
  const { data, error } = querySearch

  return {
    data,
    error,
  }
}

export function usePolygonContainer() {
  const defaultValue = 3

  const [left, setLeft] = useState(defaultValue)
  const handleSliderLeft = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    const realValue = 5 - newValue
    if (realValue < 1) {
      setLeft(1)
    } else {
      setLeft(realValue)
    }
  }

  const [right, setRight] = useState(defaultValue)
  const handleSliderRight = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    if (newValue < 1) {
      setRight(1)
    } else {
      setRight(newValue)
    }
  }

  const [top, setTop] = useState(defaultValue)
  const handleSliderTop = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    if (newValue < 1) {
      setTop(1)
    } else {
      setTop(newValue)
    }
  }

  const [bottom, setBottom] = useState(defaultValue)
  const handleSliderBottom = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    const realValue = 5 - newValue
    if (realValue < 1) {
      setBottom(1)
    } else {
      setBottom(realValue)
    }
  }

  return {
    defaultValue,
    left,
    right,
    top,
    bottom,
    handleSliderLeft,
    handleSliderRight,
    handleSliderTop,
    handleSliderBottom,
  }
}
