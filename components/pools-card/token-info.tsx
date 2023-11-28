import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import DefaultToken from '../svg/default-token';
import { PoolCardProps } from './pools-card.types';

const TokenInfo: FC<PoolCardProps> = ({ coins, value }) => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt="1.5rem"
        mb="1.5rem"
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
          <Box borderRadius="1rem" minHeight="2.5rem" minWidth="2.5rem">
            <DefaultToken maxHeight="100%" maxWidth="100%" />
          </Box>
          <Box borderRadius="1rem" minHeight="2.5rem" minWidth="2.5rem">
            <DefaultToken maxHeight="100%" maxWidth="100%" />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography
            lineHeight="1.7rem"
            fontWeight="700"
            fontSize="1rem"
            textTransform="uppercase"
            size={'small'}
            variant={'body'}
          >
            {coins}
          </Typography>
          <Typography
            textTransform="uppercase"
            fontFamily="Proto"
            fontSize="0.875rem"
            lineHeight="1.25rem"
            color="#0053DB"
            size={'large'}
            variant={'body'}
          >
            {value}% APR
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TokenInfo;
