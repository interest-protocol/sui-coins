import { NextPage } from 'next';

import { SEO } from '@/components';
import Send from '@/views/send';

const SendPage: NextPage = () => (
  <>
    <SEO pageTitle="Send " />
    <Send />
  </>
);

export default SendPage;
