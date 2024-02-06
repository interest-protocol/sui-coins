import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { ModalTokenBodyProps, TokenOrigin } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
  tokenOrigin,
  handleSelectToken,
}) => (
  <>
    {tokens?.map((token) => (
      <TokenModalItem
        key={v4()}
        selected={false}
        type={token.type}
        symbol={token.symbol}
        onClick={() => handleSelectToken(token)}
        isSuggested={tokenOrigin === TokenOrigin.Suggested}
        balance={FixedPointMath.toNumber(
          BigNumber(token.balance) ?? ZERO_BIG_NUMBER,
          token.decimals || 9
        ).toString()}
      />
    ))}
  </>
);

export default ModalTokenBody;
