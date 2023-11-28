import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { FixedSupplyToggleProps } from '../create-token.types';

const FixedSupplyToggle: FC<FixedSupplyToggleProps> = ({
  control,
  setValue,
}) => {
  const value = useWatch({ control, name: 'fixedSupply' });

  return (
    <>
      <Box display="flex" justifyContent="space-between" color="onSurface">
        <Typography variant="body" size="large">
          Fixed Supply
        </Typography>
        <ToggleButton
          name="Fixed Supply"
          defaultValue={!!value}
          onClick={() => setValue('fixedSupply', not(value))}
        />
      </Box>
      <Typography variant="body" size="small" color="#0000007A">
        The Treasury Cap will be sent to {value ? 'the @0x0 address' : 'you'}
      </Typography>
    </>
  );
};

export default FixedSupplyToggle;
