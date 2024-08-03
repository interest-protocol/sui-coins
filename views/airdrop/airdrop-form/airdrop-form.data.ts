import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { FileSVG, WalletSVG } from '@/svg';

import { TMethod } from '../airdrop.types';

export const METHODS_ICONS: Record<
  TMethod,
  { title: string; Icon: FC<SVGProps>; description: string }
> = {
  csv: {
    title: 'CSV',
    Icon: FileSVG,
    description: 'Upload a CSV file with wallet addresses and amounts.',
  },
  addressList: {
    title: 'List of addresses',
    Icon: WalletSVG,
    description: 'Same airdrop value, different addresses.',
  },
};

export const AIRDROP_ERRORS = {
  notValidList: 'The airdropping amounts are not valid',
  noCoin: 'You does not have this coin on your wallet',
  noBalance: 'The coin select does not have any amount',
  balanceNotEnough: 'Not enough balance',
};
