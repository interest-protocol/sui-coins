import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { SEO } from '@/components';
import CreateToken from '@/views/create-token';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const CreateTokenPage: NextPage = () => {
  return (
    <Web3Manager>
      <SEO pageTitle="Create Token" />
      <CreateToken />
    </Web3Manager>
  );
};

export default CreateTokenPage;
