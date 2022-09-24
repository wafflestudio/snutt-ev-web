import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { RecentImpl } from '@/pageImpl/recentImpl';

export default function RecentView() {
  return <RecentImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
