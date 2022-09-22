import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { CreateImpl } from '@/pageImpl/createImpl';

export default function SearchView() {
  return <CreateImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
