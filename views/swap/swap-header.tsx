import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { ThreeDotsSVG } from '@/svg';

import { AGGREGATORS_LIST } from './swap.data';
import { Aggregator, SwapForm } from './swap.types';
import SwapSelectAggregatorModal from './swap-select-aggregator-modal';

const SwapHeader: FC = () => {
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<SwapForm>();

  const aggregator = useWatch({
    control,
    name: 'aggregator',
  });

  const onSelect = (aggregator: Aggregator) => {
    setValue('aggregator', aggregator);
    handleClose();
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SwapSelectAggregatorModal
          onSelect={onSelect}
          aggregatorSelected={AGGREGATORS_LIST[aggregator]}
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Box display="flex" justifyContent="space-between">
      <Typography
        size="large"
        fontWeight="700"
        variant="headline"
        fontFamily="Satoshi"
      >
        Swap
      </Typography>
      <Button
        p="xs"
        variant="outline"
        borderRadius="full"
        borderColor="outlineVariant"
        onClick={openModal}
        PrefixIcon={
          <Box height="1.5rem" borderRadius="full">
            <img
              width="100%"
              height="100%"
              style={{ borderRadius: '999rem' }}
              alt={AGGREGATORS_LIST[aggregator].name}
              src={AGGREGATORS_LIST[aggregator].logo}
            />
          </Box>
        }
        SuffixIcon={
          <Box width="1.5rem" height="1rem">
            <ThreeDotsSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        }
      >
        <Typography variant="body" size="medium" textTransform="capitalize">
          {AGGREGATORS_LIST[aggregator].shortName}
        </Typography>
      </Button>
    </Box>
  );
};

export default SwapHeader;
