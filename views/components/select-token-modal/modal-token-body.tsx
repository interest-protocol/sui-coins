import { FC } from 'react';
import { v4 } from 'uuid';

import NotFound from './not-found';
import { ModalTokenBodyProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
  handleSelectToken,
}) => (
  <>
    {tokens && tokens.length ? (
      tokens?.map((token) => (
        <TokenModalItem
          key={v4()}
          selected={false}
          onClick={() => handleSelectToken(token.type, token.chain)}
          {...token}
        />
      ))
    ) : (
      <NotFound />
    )}
  </>
);

export default ModalTokenBody;
