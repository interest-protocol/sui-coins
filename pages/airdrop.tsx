import { NextPage } from 'next';

import { SEO } from '@/components';
import Airdrop from '@/views/airdrop';

const AirdropPage: NextPage = () => (
  <>
    <SEO pageTitle="Airdrop" />
    <Airdrop />
  </>
);

export default AirdropPage;
