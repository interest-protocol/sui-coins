import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ISendBulkForm } from './send-bulk.types';

const SendInputQuantity: FC = () => {
  const { register } = useFormContext<ISendBulkForm>();

  return (
    <Box flex="1">
      <Typography variant="body" size="large" mb="s">
        2. Number of links (Max: 300)
      </Typography>
      <TextField
        nPlaceholder={{ opacity: 0.7 }}
        placeholder="Type number of links"
        fieldProps={{ height: '3.5rem', borderRadius: 'xs' }}
        {...register('quantity')}
      />
    </Box>
  );
};

export default SendInputQuantity;
