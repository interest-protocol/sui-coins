import { FC } from 'react';
import { v4 } from 'uuid';

import { ModalTokenBodyProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
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
      />
    ))}
  </>
);

export default ModalTokenBody;
