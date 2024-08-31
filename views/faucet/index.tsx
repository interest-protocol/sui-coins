import { FC } from 'react';

import Layout from '@/components/layout';

import MintBalances from './mint-balances';
import MintForm from './mint-form';

const Faucet: FC = () => (
  <Layout title="Faucet">
    <MintForm />
    <MintBalances />
  </Layout>
);

export default Faucet;
