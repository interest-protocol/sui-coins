import { DcaSDK } from '@interest-protocol/dca-sdk';
import { getFullnodeUrl } from '@mysten/sui/client';

import { Network } from '@/constants';

import { useNetwork } from '../use-network';

const DCATestnet = new DcaSDK(getFullnodeUrl('testnet'));
const DCAMainnet = new DcaSDK(getFullnodeUrl('mainnet'));

const DCA_SDK = {
  [Network.TESTNET]: DCATestnet,
  [Network.MAINNET]: DCAMainnet,
};

const useDcaSdk = () => {
  const network = useNetwork();

  return DCA_SDK[network];
};

export default useDcaSdk;
