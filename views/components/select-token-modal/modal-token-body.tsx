import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import NotFound from './not-found';
import { ModalTokenBodyProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
  handleSelectToken,
}) => (
  <Box px="m" py="s">
    <Typography variant="body" size="small" color="outline">
      {tokens.length} Coin{tokens.length !== 1 ? 's' : ''}
    </Typography>
    <Box py="m" gap="s" display="grid" gridTemplateColumns={['1fr', '1fr 1fr']}>
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
    </Box>
  </Box>
);

export default ModalTokenBody;
