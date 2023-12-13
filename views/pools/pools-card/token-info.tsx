import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PoolCardTokenInfoProps } from './pool-card.types';

const TokenInfo: FC<PoolCardTokenInfoProps> = ({ tokenList, apr }) => (
  <Box>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      my="1.5rem"
    >
      <Box
        minWidth="19rem"
        height="2.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignSelf="stretch"
        gap="1rem"
        mb="1rem"
      >
        {tokenList.map((token) => (
          <Box
            key={v4()}
            borderRadius="1rem"
            minHeight="2.5rem"
            minWidth="2.5rem"
          >
            <token.Icon maxHeight="100%" maxWidth="100%" />
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography
          lineHeight="1.7rem"
          fontWeight="700"
          fontSize="1rem"
          textTransform="uppercase"
          size="small"
          variant="body"
        >
          {tokenList.map(
            (token, index) =>
              `${token.symbol} ${tokenList.length - 1 > index ? '• ' : ''}`
          )}
        </Typography>
        <Typography
          textAlign="center"
          textTransform="uppercase"
          size="large"
          variant="label"
          color="primary"
        >
          {apr}% APR
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default TokenInfo;
