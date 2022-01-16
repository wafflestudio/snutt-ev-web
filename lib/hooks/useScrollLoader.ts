import { useCallback, useEffect, useRef } from "react"

export default function useScrollLoader(loadMore: () => {}) {
  const loader = useRef(null)
  const handleObserver = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting) {
      loadMore()
    }
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  })

  return {
    loaderRef: loader,
  }
}
