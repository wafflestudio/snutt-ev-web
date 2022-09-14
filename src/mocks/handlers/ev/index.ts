import { rest } from "msw"

import { latestLectures } from "./fixtures"

export const evHandlers = [
  rest.get("*/v1/evaluations/*/report", (req, res, ctx) => {
    return res(ctx.json(latestLectures))
  }),
]
