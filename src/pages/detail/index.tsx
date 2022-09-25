import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { DetailImpl } from '@/pageImpl/detailImpl';

export default function DetailView() {
  return <DetailImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
