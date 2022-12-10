import { CreateImpl } from '@/pageImpl/createImpl';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function SearchView() {
  return <CreateImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'verified' },
);
