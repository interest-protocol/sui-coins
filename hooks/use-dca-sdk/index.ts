import { DcaSDK } from '@interest-protocol/dca-sdk';

import { Network } from '@/constants';

import { useNetwork } from '../use-network';

const DCATestnet = new DcaSDK({
  network: 'testnet',
});

const DCAMainnet = new DcaSDK();

const DCA_SDK = {
  [Network.TESTNET]: DCATestnet,
  [Network.MAINNET]: DCAMainnet,
};

const useDcaSdk = () => {
  const network = useNetwork();

  return DCA_SDK[network];
};

export default useDcaSdk;
