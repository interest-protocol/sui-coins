import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXCHANGE_FEE_PERCENTAGE } from '@/constants/fees';
import { useFeeFreeTokens } from '@/hooks/use-dca';
import { InformationCircleSVG } from '@/svg';
import { formatMoney } from '@/utils';

import { PERIODICITY } from '../dca.data';
import { DCAForm } from '../dca.types';
import { AGGREGATORS_LIST } from '../dca-aggregator/dca-aggregator.data';

const DCAPreviewModalSummary: FC = () => {
  const { control, getValues } = useFormContext<DCAForm>();
  const { data, isLoading } = useFeeFreeTokens();

  const min = useWatch({ control, name: 'min' });
  const max = useWatch({ control, name: 'max' });
  const orders = useWatch({ control, name: 'orders' });
  const every = useWatch({ control, name: 'intervals' });
  const timeScale = useWatch({ control, name: 'periodicity' });
  const aggregator = useWatch({ control, name: 'aggregator' });

  const { name: aggregatorName } = AGGREGATORS_LIST[aggregator];

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
            <Typography mr="2xs" variant="body" size="medium" color="onSurface">
              {orders}
            </Typography>
            <InformationCircleSVG
              color="#1B1B1F"
              cursor="pointer"
              width="0.802rem"
              maxWidth="0.802rem"
              maxHeight="0.802rem"
            />
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
            <Typography mr="2xs" variant="body" size="medium" color="onSurface">
              {every} {PERIODICITY[timeScale]}
            </Typography>
            <InformationCircleSVG
              color="#1B1B1F"
              cursor="pointer"
              width="0.802rem"
              maxWidth="0.802rem"
              maxHeight="0.802rem"
            />
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
            <Typography mr="2xs" variant="body" size="medium" color="onSurface">
              {min ? formatMoney(+min) : 'N/A'}
            </Typography>
            <InformationCircleSVG
              color="#1B1B1F"
              cursor="pointer"
              width="0.802rem"
              maxWidth="0.802rem"
              maxHeight="0.802rem"
            />
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
            <Typography mr="2xs" variant="body" size="medium" color="onSurface">
              {max ? formatMoney(+max) : 'N/A'}
            </Typography>
            <InformationCircleSVG
              color="#1B1B1F"
              cursor="pointer"
              width="0.802rem"
              maxWidth="0.802rem"
              maxHeight="0.802rem"
            />
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Aggregator
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="2xs" variant="body" size="medium" color="onSurface">
              {aggregatorName.replace(/aggregator/gi, '').trim()}
            </Typography>
            <InformationCircleSVG
              color="#1B1B1F"
              cursor="pointer"
              width="0.802rem"
              maxWidth="0.802rem"
              maxHeight="0.802rem"
            />
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Start date
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="2xs" variant="body" size="medium" color="onSurface">
              today
            </Typography>
            <InformationCircleSVG
              color="#1B1B1F"
              cursor="pointer"
              width="0.802rem"
              maxWidth="0.802rem"
              maxHeight="0.802rem"
            />
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Estimated end date
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="2xs" variant="body" size="medium" color="onSurface">
              today
            </Typography>
            <InformationCircleSVG
              color="#1B1B1F"
              cursor="pointer"
              width="0.802rem"
              maxWidth="0.802rem"
              maxHeight="0.802rem"
            />
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
            {!isLoading ? (
              <>
                <Typography
                  mr="2xs"
                  variant="body"
                  size="medium"
                  color="onSurface"
                >
                  {data?.includes(getValues('to.type'))
                    ? 0
                    : EXCHANGE_FEE_PERCENTAGE}
                  %
                </Typography>
                <InformationCircleSVG
                  color="#1B1B1F"
                  cursor="pointer"
                  width="0.802rem"
                  maxWidth="0.802rem"
                  maxHeight="0.802rem"
                />
              </>
            ) : (
              <ProgressIndicator variant="loading" size={16} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DCAPreviewModalSummary;
