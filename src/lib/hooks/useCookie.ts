import Cookies from "js-cookie"
import { useCallback, useEffect, useState } from "react"

export default function useCookie(
  cookieName: string,
): [
  string | null,
  (newValue: string, options?: Cookies.CookieAttributes) => void,
  () => void,
] {
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    setValue(Cookies.get(cookieName) ?? null)
  }, [cookieName])

  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options)
      setValue(newValue)
    },
    [cookieName],
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName)
    setValue(null)
  }, [cookieName])

  return [value, updateCookie, deleteCookie]
}
