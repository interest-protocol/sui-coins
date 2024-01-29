import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';

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
        balance={
          token?.balance
            ? FixedPointMath.toNumber(
                BigNumber(token.balance),
                token.decimals || 9
              ).toString()
            : '0'
        }
      />
    ))}
  </>
);

export default ModalTokenBody;
