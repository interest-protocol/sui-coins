import { FC } from 'react';
import { v4 } from 'uuid';

import NotFound from './not-found';
import { ModalTokenBodyProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
  handleSelectToken,
}) => {
  if (!tokens.length) return <NotFound />;
  return (
    <>
      {tokens?.map((token) => (
        <TokenModalItem
          key={v4()}
          selected={false}
          onClick={() => handleSelectToken(token)}
          {...token}
        />
      ))}
    </>
  );
};

export default ModalTokenBody;
