import { FC } from 'react';
import { v4 } from 'uuid';

import {
  CoinDataWithChainInfo,
  ModalTokenBodyProps,
} from './select-token-modal.types';
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
        onClick={() => handleSelectToken(token as CoinDataWithChainInfo)}
        {...token}
      />
    ))}
  </>
);

export default ModalTokenBody;
