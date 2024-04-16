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
