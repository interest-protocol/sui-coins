import { TextField } from 'elements';
import { FC } from 'react';

import Layout from '@/components/layout';

const CreateToken: FC = () => (
  <Layout>
    Create Token
    <TextField
      status="success"
      label="Coin Decimals"
      defaultValue="9"
      supportingText="Insert the decimal precision of your token. If you don't know what to insert, use 9"
    />
    <TextField label="Coin URL" placeholder="Eg. LC" />
  </Layout>
);

export default CreateToken;
