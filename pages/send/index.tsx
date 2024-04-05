import { NextPage } from 'next';

import { SEO } from '@/components';
import { AllObjectsProvider } from '@/context/all-objects';
import Send from '@/views/send';

const SendPage: NextPage = () => (
  <AllObjectsProvider>
    <SEO pageTitle="Send " />
    <Send />
  </AllObjectsProvider>
);

export default SendPage;
