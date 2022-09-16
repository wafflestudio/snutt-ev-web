import { useEffect, useRef } from "react";

export default function useScrollLoader(loadMore: () => void) {
  const loader = useRef(null);

  const handleObserver: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMore();
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    const cur = loader.current;
    if (cur) observer.observe(cur);
  });

  return {
    loaderRef: loader,
  };
}
