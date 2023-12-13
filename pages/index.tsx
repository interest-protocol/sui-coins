import { NextPage } from 'next';

import { SEO } from '@/components';
import CreatePoolPage from '@/views/create-pool';

const CreateTokenPage: NextPage = () => (
  <>
    <SEO pageTitle="Create pool" />
    <CreatePoolPage />
  </>
);

export default CreateTokenPage;
