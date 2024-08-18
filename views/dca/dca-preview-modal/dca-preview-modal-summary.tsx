import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DCA_FEE_PERCENTAGE } from '@/constants/fees';
import { formatMoney } from '@/utils';

import { PERIODICITY } from '../dca.data';
import { DCAForm } from '../dca.types';

const DCAPreviewModalSummary: FC = () => {
  const { control } = useFormContext<DCAForm>();

  const min = useWatch({ control, name: 'min' });
  const max = useWatch({ control, name: 'max' });
  const orders = useWatch({ control, name: 'orders' });
  const every = useWatch({ control, name: 'intervals' });
  const timeScale = useWatch({ control, name: 'periodicity' });

  return (
    <Box display="flex" flexDirection="column" mb="m" gap="l">
      <Box bg="surface" px="m" py="2xs" borderRadius="xs">
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Orders
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="s" variant="body" size="medium" color="onSurface">
              {orders}
            </Typography>
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Periodicity
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="s" variant="body" size="medium" color="onSurface">
              {every} {PERIODICITY[timeScale]}
            </Typography>
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Min
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="s" variant="body" size="medium" color="onSurface">
              {min ? formatMoney(+min.display) : 'N/A'}
            </Typography>
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Max
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="s" variant="body" size="medium" color="onSurface">
              {max ? formatMoney(+max.display) : 'N/A'}
            </Typography>
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            DCA fee
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="s" variant="body" size="medium" color="onSurface">
              {DCA_FEE_PERCENTAGE}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DCAPreviewModalSummary;
