import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { values } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useModal } from '@/hooks/use-modal';
import { CheckSVG, TimesSVG } from '@/svg';

import { AGGREGATORS_LIST } from './swap.data';
import {
  Aggregator,
  AggregatorProps,
  SwapSelectAggregatorModalProps,
} from './swap.types';

const SwapSelectAggregatorModal: FC<SwapSelectAggregatorModalProps> = ({
  onSelect,
  aggregatorSelected,
}) => {
  const { handleClose } = useModal();

  return (
    <Motion
      layout
      display="flex"
      bg="onPrimary"
      minWidth="22rem"
      maxHeight="90vh"
      maxWidth="25rem"
      overflow="hidden"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      transition={{ duration: 0.3 }}
    >
      <Box
        p="m"
        display="grid"
        alignItems="center"
        justifyContent="space-between"
        gridTemplateColumns="2rem auto 2rem"
      >
        <Box />
        <Typography variant="title" size="large">
          Select Aggregator
        </Typography>
        <Button variant="text" isIcon onClick={handleClose} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      {values(AGGREGATORS_LIST).map((data: AggregatorProps) => (
        <Box
          p="l"
          key={v4()}
          display="flex"
          cursor="pointer"
          alignItems="center"
          nHover={{ bg: '#0053DB14' }}
          justifyContent="space-between"
          transition="all 300ms ease-in-out"
          opacity={data.disabled ? '0.7' : 1}
          onClick={() =>
            !data.disabled &&
            onSelect(
              data.shortName as
                | `${Aggregator.Hop}`
                | `${Aggregator.Aftermath}`
                | 'interest'
            )
          }
          bg={aggregatorSelected.name == data.name ? '#0053DB14' : 'unset'}
        >
          <Box display="flex" alignItems="center" gap="m">
            <Box width="2.5rem" height="2.5rem">
              <img
                alt={data.name}
                width="100%"
                height="100%"
                style={{ borderRadius: '0.5rem' }}
                src={data.logo}
              />
            </Box>
            <Typography
              fontSize="m"
              size="medium"
              variant="body"
              fontWeight="700"
              textTransform="capitalize"
            >
              {data.name}
            </Typography>
          </Box>
          {aggregatorSelected.name == data.name && (
            <Box width="1rem" height="1rem">
              <CheckSVG width="100%" maxWidth="100%" maxHeight="100%" />
            </Box>
          )}
        </Box>
      ))}
    </Motion>
  );
};

export default SwapSelectAggregatorModal;
