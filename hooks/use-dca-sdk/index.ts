import { DcaSDK, PACKAGES, SHARED_OBJECTS } from '@interest-protocol/dca-sdk';
import { getFullnodeUrl } from '@mysten/sui/client';

import { Network } from '@/constants';

import { useNetwork } from '../use-network';

const DCATestnet = new DcaSDK({
  network: 'testnet',
  fullNodeUrl: getFullnodeUrl('testnet'),
  packages: PACKAGES['testnet'],
  sharedObjects: SHARED_OBJECTS['testnet'],
});

const DCAMainnet = new DcaSDK({
  network: 'mainnet',
  fullNodeUrl: getFullnodeUrl('mainnet'),
  packages: PACKAGES['mainnet'],
  sharedObjects: SHARED_OBJECTS['mainnet'],
});

const DCA_SDK = {
  [Network.TESTNET]: DCATestnet,
  [Network.MAINNET]: DCAMainnet,
};

const useDcaSdk = () => {
  const network = useNetwork();

  return DCA_SDK[network];
};

export default useDcaSdk;
