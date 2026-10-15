import { MailVerifyImpl } from '@/pageImpl/mailVerifyImpl';
import { Lang } from '@/utils/lang';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function Verify({ lang }: { lang: Lang }) {
  return <MailVerifyImpl lang={lang} />;
}

export const getServerSideProps = withGetServerSideProps(
  async (context) => {
    const acceptLanguage = context.req.headers['accept-language'] ?? '';
    const lang: Lang = acceptLanguage.toLowerCase().startsWith('en') ? 'en' : 'ko';
    return { props: { lang } };
  },
  { emailVerification: 'not-verified' },
);
