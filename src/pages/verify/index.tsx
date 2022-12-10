import { MailVerifyImpl } from '@/pageImpl/mailVerifyImpl';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function Verify() {
  return <MailVerifyImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'not-verified' },
);
