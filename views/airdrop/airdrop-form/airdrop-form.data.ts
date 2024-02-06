import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { FileSVG, NftSVG, WalletSVG } from '@/svg';

import { TMethod } from '../airdrop.types';

export const METHODS_ICONS: Record<
  TMethod,
  { title: string; Icon: FC<SVGProps>; description: string }
> = {
  csv: {
    title: 'CSV',
    Icon: FileSVG,
    description:
      'Upload a CSV file with wallet addresses and corresponding amounts.',
  },
  nft: {
    title: 'NFT',
    Icon: NftSVG,
    description: 'Airdrops to holders of your favorite NFT collections.',
  },
  customAmount: {
    title: 'Custom Amount',
    Icon: WalletSVG,
    description: 'Same airdrop value, different project addresses.',
  },
};
