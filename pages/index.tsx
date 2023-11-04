import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { SEO } from '@/components';
import Layout from '@/components/layout';
import CreateToken from '@/views/create-token';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const CreateTokenPage: NextPage = () => {
  return (
    <Web3Manager>
      <SEO pageTitle="Create Token" />
      <Layout>
        <CreateToken />
      </Layout>
    </Web3Manager>
  );
};

export default CreateTokenPage;
