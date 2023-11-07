import { NextPage } from 'next';

import { SEO } from '@/components';
import CreateToken from '@/views/create-token';

const CreateTokenPage: NextPage = () => (
  <>
    <SEO pageTitle="Create Token" />
    <CreateToken />
  </>
);

export default CreateTokenPage;
