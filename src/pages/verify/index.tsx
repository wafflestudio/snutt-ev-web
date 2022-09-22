import { withGetServerSideProps } from '@/lib/util/withGetServersideProps';
import { MailVerifyImpl } from '@/pageImpl/mailVerifyImpl';

export default function Verify() {
  return <MailVerifyImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'not-verified' },
);
