import { coreHandlers } from "./core"
import { evHandlers } from "./ev"

export const handlers = [...coreHandlers, ...evHandlers]
