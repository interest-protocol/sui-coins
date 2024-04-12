import { NextPage } from 'next';

import { SEO } from '@/components';
import { AllObjectsProvider } from '@/context/all-objects';
import Incinerator from '@/views/incinerator';

const IncineratorPage: NextPage = () => (
  <AllObjectsProvider>
    <SEO pageTitle="Incinerator" />
    <Incinerator />
  </AllObjectsProvider>
);

export default IncineratorPage;
