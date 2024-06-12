import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import {
  SCALLOP_SUI_TYPE,
  SCALLOP_USDC_TYPE,
  WS_SUI_TYPE,
  WS_USDC_TYPE,
} from '@/constants/clamm';
import { useModal } from '@/hooks/use-modal';
import { ThreeDotsSVG } from '@/svg';

import { AGGREGATORS_LIST } from './swap.data';
import { Aggregator, AggregatorType, SwapForm } from './swap.types';
import SwapSelectAggregatorModal from './swap-select-aggregator-modal';

const SwapHeader: FC = () => {
  console.log(
    [SCALLOP_SUI_TYPE, SCALLOP_USDC_TYPE, WS_SUI_TYPE, WS_USDC_TYPE].map(
      normalizeStructTag
    )
  );

  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<SwapForm>();

  const settings = useWatch({
    control,
    name: 'settings',
  });

  const onSelect = (aggregator: AggregatorType) => {
    setValue('settings.aggregator', aggregator as Aggregator);
    localStorage.setItem(
      `${LOCAL_STORAGE_VERSION}-sui-coins-settings`,
      JSON.stringify({
        slippage: settings.slippage,
        interval: settings.interval,
        aggregator,
      })
    );
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
          aggregatorSelected={AGGREGATORS_LIST[settings.aggregator]}
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
        onClick={openModal}
        borderColor="outlineVariant"
        PrefixIcon={
          <Box height="1.5rem" width="1.5rem" borderRadius="full">
            <img
              width="100%"
              height="100%"
              style={{ borderRadius: '999rem' }}
              alt={AGGREGATORS_LIST[settings.aggregator]?.name}
              src={AGGREGATORS_LIST[settings.aggregator]?.logo}
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
          {AGGREGATORS_LIST[settings.aggregator]?.shortName}
        </Typography>
      </Button>
    </Box>
  );
};

export default SwapHeader;
