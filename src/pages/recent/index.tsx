import { RecentImpl } from '@/pageImpl/recentImpl';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function RecentView() {
  return <RecentImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
