import { getEmailVerification } from "@lib/api/apis"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { QueryClient, dehydrate } from "react-query"

type GetSnuttServerSideProps = (args: {
  context: GetServerSidePropsContext
  queryClient: QueryClient
}) => ReturnType<GetServerSideProps>

const removeUndefined = (obj: unknown) => JSON.parse(JSON.stringify(obj))

const getDehydratedQueryClient = (client: QueryClient) => {
  return removeUndefined(dehydrate(client))
}

export const withGetServerSideProps = (
  callback?: GetSnuttServerSideProps,
): GetServerSideProps => {
  const queryClient = new QueryClient()

  return async (context) => {
    const { is_email_verified: isVerified } = await queryClient.fetchQuery(
      "email-verified",
      getEmailVerification,
    )

    if (!isVerified)
      return { redirect: { destination: "/verify", permanent: false } }

    if (!callback)
      return {
        props: { dehydratedState: getDehydratedQueryClient(queryClient) },
      }

    const ret = await callback({ context, queryClient })

    return {
      ...ret,
      props: {
        ...("props" in ret && { ...ret.props }),
        dehydratedState: getDehydratedQueryClient(queryClient),
      },
    }
  }
}
