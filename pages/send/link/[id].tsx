import { NextPage } from 'next';
import { useRouter } from 'next/router';

import SendLink from '@/views/send-link';

const SendLinkPage: NextPage = () => {
  const { query } = useRouter();

  return <SendLink id={query.id as string} />;
};

export default SendLinkPage;
