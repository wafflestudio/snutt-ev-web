import { useRouter } from 'next/router';
import { useEffect } from 'react';

const pathnameStorageKey = (pn: string) => `sr__${pn}__y`;

export const useApplicationScrollRestoration = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.scrollY) sessionStorage.setItem(pathnameStorageKey(router.pathname), JSON.stringify(window.scrollY));
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events, router.pathname]);

  useEffect(() => {
    const handleRouteChange = () => {
      const previousScrollY = JSON.parse(sessionStorage.getItem(pathnameStorageKey(router.pathname)) ?? 'null');
      if (!previousScrollY) return;

      setTimeout(() => window.scrollTo({ top: previousScrollY }));
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events, router.pathname]);
};
