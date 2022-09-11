import React from "react"
import { MainImpl } from "@pageImpl/mainImpl"
import { withGetServerSideProps } from "@lib/util/withGetServerSideProps"
import {
  fetchLatestLectures,
  getMainTagEvaluations,
  getMainTagInfos,
} from "@lib/api/apis"

export default function MainView() {
  return <MainImpl />
}

export const getServerSideProps = withGetServerSideProps(
  async ({ queryClient }) => {
    await Promise.all([
      queryClient.prefetchQuery("mainTags", getMainTagInfos),
      queryClient.prefetchQuery("latestLectures", fetchLatestLectures),
      queryClient.prefetchInfiniteQuery(
        ["tagEvaluations", 1],
        ({ pageParam }) => getMainTagEvaluations(1, { cursor: pageParam }),
      ),
    ])

    return { props: {} }
  },
)
