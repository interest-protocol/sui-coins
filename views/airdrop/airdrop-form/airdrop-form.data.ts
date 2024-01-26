import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { CoinsSVG, FileSVG, NftSVG, WalletSVG } from '@/svg';

import { TMethod } from '../airdrop.types';

export const METHODS_ICONS: Record<
  TMethod,
  { title: string; Icon: FC<SVGProps> }
> = {
  csv: { title: 'CSV', Icon: FileSVG },
  nft: { title: 'NFT', Icon: NftSVG },
  coin: { title: 'Coins', Icon: CoinsSVG },
  customAmount: { title: 'Custom Amount', Icon: WalletSVG },
};
