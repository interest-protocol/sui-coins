import { NextPage } from 'next';
import { useRouter } from 'next/router';

import SendClaim from '@/views/send-claim';

const SendLinkPage: NextPage = () => {
  const { query } = useRouter();

  return <SendClaim id={query.id as string} />;
};

export default SendLinkPage;
