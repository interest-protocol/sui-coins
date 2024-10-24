import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { FileSVG, NftSVG, WalletSVG } from '@/svg';

import { TMethod } from '../airdrop.types';

export const METHODS_ICONS: Record<
  TMethod,
  { title: string; Icon: string | FC<SVGProps>; description: string }
> = {
  suiPlay: {
    title: 'SuiPlay Holders',
    Icon: '/images/suiplay/suiplay.png',
    description: 'Drop to SuiPlay Souldbound NFT holders.',
  },
  csv: {
    title: 'CSV',
    Icon: FileSVG,
    description: 'Upload a CSV with addresses and allocations.',
  },
  nft: {
    title: 'NFT',
    Icon: NftSVG,
    description: 'Drop to holders of specific NFTs.',
  },
  addressList: {
    title: 'Custom Addresses',
    Icon: WalletSVG,
    description: 'Airdrop the same amount to multiple addresses',
  },
};
