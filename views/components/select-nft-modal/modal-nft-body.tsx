import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import NFTModalItem from './nft-modal-item';
import { ModalNFTBodyProps } from './select-nft-modal.types';

const ModalNFTBody: FC<ModalNFTBodyProps> = ({ tokens, handleSelectNFT }) => (
  <>
    {tokens?.map((token) => (
      <NFTModalItem
        key={v4()}
        selected={false}
        type={token.type}
        symbol={token.symbol}
        onClick={() => handleSelectNFT(token)}
        balance={FixedPointMath.toNumber(
          BigNumber(token.balance) ?? ZERO_BIG_NUMBER,
          token.decimals || 9
        ).toString()}
      />
    ))}
  </>
);

export default ModalNFTBody;
