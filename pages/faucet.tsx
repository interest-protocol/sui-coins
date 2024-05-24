import { NextPage } from 'next';

import { SEO } from '@/components';
import Faucet from '@/views/faucet';

const PoolsPage: NextPage = () => (
  <>
    <SEO pageTitle="Faucet" />
    <Faucet />
  </>
);

export default PoolsPage;
