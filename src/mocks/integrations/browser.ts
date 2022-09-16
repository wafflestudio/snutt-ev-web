import { useEffect, useState } from "react"

import { handlers } from "@/mocks/handlers"

export const useMSW = (enable: boolean) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!enable) return

    let cancelled = false

    const enableMSW = async () => {
      const { setupWorker } = await import("msw")
      if (cancelled) return
      setupWorker(...handlers).start({ onUnhandledRequest: "bypass" })
      setEnabled(true)
    }

    enableMSW()

    return () => {
      cancelled = true
    }
  }, [enable])

  return enabled
}
