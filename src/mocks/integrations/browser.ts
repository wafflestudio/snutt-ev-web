import { useEffect, useState } from "react";

import { handlers } from "@/mocks/handlers";

/**
 * msw 를 활성화하는 hook
 * 최상단 _app.tsx 에서 한 번만 불러야 한다.
 *
 * @param enable msw 를 활성화할지
 * @returns msw 가 활성화되었는지
 */

export const useMSW = (enable: boolean) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enable) return;

    let cancelled = false;

    const enableMSW = async () => {
      const { setupWorker } = await import("msw");
      if (cancelled) return;
      setupWorker(...handlers).start({ onUnhandledRequest: "bypass" });
      setEnabled(true);
    };

    enableMSW();

    return () => {
      cancelled = true;
    };
  }, [enable]);

  return enabled;
};
