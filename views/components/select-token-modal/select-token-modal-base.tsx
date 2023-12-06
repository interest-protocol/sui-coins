import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { BNBSVG } from '@/svg';

import { SelectTokenBaseTokensProps } from './select-token-modal.types';

const SelectTokenBaseTokens: FC<SelectTokenBaseTokensProps> = ({
  handleSelectToken,
}) => {
  return (
    <Box
      px="m"
      py="xs"
      gap={['0.25rem', '0.25rem', '0.25rem', 'xs']}
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr 1fr 1fr"
    >
      {['BNB', 'BTC', 'USDT', 'SUI'].map((item) => (
        <Tag
          key={v4()}
          PrefixIcon={BNBSVG}
          size="small"
          display="flex"
          variant="outline"
          justifyContent="center"
          onClick={handleSelectToken}
        >
          <Typography variant="label" size="large">
            {item}
          </Typography>
        </Tag>
      ))}
    </Box>
  );
};

export default SelectTokenBaseTokens;
