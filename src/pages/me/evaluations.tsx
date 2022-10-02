import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { MyEvaluationsImpl } from '@/pageImpl/myEvaluationsImpl';

export default function MyEvaluationsView() {
  return <MyEvaluationsImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
