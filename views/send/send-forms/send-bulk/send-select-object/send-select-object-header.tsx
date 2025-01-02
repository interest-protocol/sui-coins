import { Box, Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ISendBulkForm } from '../send-bulk.types';

const SendSelectObjectHeader: FC = () => {
  const { control } = useFormContext<ISendBulkForm>();

  const object = useWatch({ control, name: 'object' });

  const { type } = object ?? {
    type: undefined,
  };

  const displayName = object ? (object.symbol ?? type) : type;

  const symbol = object?.symbol ?? '';

  return (
    <Box>
      <Typography variant="body" size="large" mb="s">
        1. Select your coin and amount
      </Typography>
      <Typography
        m="xs"
        pr="xs"
        size="large"
        variant="label"
        overflow="hidden"
        whiteSpace="nowrap"
        width={['auto', '0px']}
        display={['block', 'none']}
      >
        {symbol ||
          (type && type === displayName ? formatAddress(type) : displayName) ||
          'Select Token'}
      </Typography>
    </Box>
  );
};

export default SendSelectObjectHeader;
