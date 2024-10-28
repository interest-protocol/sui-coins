import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DCAForm } from '../dca.types';
import Balance from './balance';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const { control } = useFormContext<DCAForm>();

  const symbol = useWatch({ control, name: `${label}.symbol` });

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="label" size="medium" fontSize="s">
        {label == 'from' ? 'I WANT TO TRADE' : 'I WANT TO BUY'}
        <Typography
          as="span"
          size="small"
          variant="label"
          fontSize="s"
          display={['inline-block', 'none']}
        >
          : {symbol}
        </Typography>
      </Typography>
      {label == 'from' && (
        <Box display="flex" gap="xs">
          <Balance label={label} />
        </Box>
      )}
    </Box>
  );
};

export default HeaderInfo;
