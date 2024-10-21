import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SUIPLAY_SOULBOUND } from '@/constants';
import { SUIPLAY_HOLDERS } from '@/constants/nft';
import { useModal } from '@/hooks/use-modal';
import { ChevronRightSVG } from '@/svg';
import SelectSuiPlayModal from '@/views/components/select-sui-play-modal';

import { IAirdropForm } from '../airdrop.types';
import AirdropCommonAmountTextField from './airdrop-common-amount-method/airdrop-common-amount-text-field';

const AirdropSuiPlayHoldersMethod: FC = () => {
  const { setModal, handleClose } = useModal();

  const { control, setValue, getValues } = useFormContext<IAirdropForm>();

  const tier = useWatch({ control, name: 'tier' });

  const onSelectSuiPlay = async (
    tier: 'The Mythics' | 'The Exalted' | 'All'
  ) => {
    setValue('tier', tier);
    const holders = SUIPLAY_HOLDERS[tier];

    const airdropList = holders.map((address) => ({
      address,
      amount: BigNumber(getValues('commonAmount'))
        .times(BigNumber(10).pow(getValues('token.decimals')))
        .toString(),
    }));

    setValue('airdropList', airdropList);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectSuiPlayModal
          closeModal={handleClose}
          onSelect={onSelectSuiPlay}
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
    <Box display="flex" flexDirection="column" gap="s">
      <Typography variant="body" size="large">
        3. Who to send & amount
      </Typography>
      <Box>
        <Typography variant="body" size="small">
          Choose the Sui Play NFT collection
        </Typography>
        <Box py="xs">
          <Box position="relative">
            <Box
              p="xs"
              gap="xs"
              display="flex"
              minWidth="8rem"
              cursor="pointer"
              borderRadius="xs"
              border="1px solid"
              alignItems="center"
              onClick={openModal}
              borderColor="outlineVariant"
            >
              {tier && (
                <Box
                  bg="black"
                  color="white"
                  display="flex"
                  width="2.5rem"
                  height="2.5rem"
                  overflow="hidden"
                  borderRadius="xs"
                  alignItems="center"
                  justifyContent="center"
                >
                  <img
                    width="100%"
                    alt={tier}
                    src={
                      SUIPLAY_SOULBOUND.find((item) => item.tier === tier)
                        ?.image
                    }
                  />
                </Box>
              )}
              <Typography variant="body" size="large" flex="1" as="span">
                {tier}
              </Typography>
              <Box rotate="90deg">
                <ChevronRightSVG
                  maxWidth="1.5rem"
                  maxHeight="1.5rem"
                  width="100%"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="body" size="small">
          Enter amount to send per Soulbound
        </Typography>
        <AirdropCommonAmountTextField />
      </Box>
    </Box>
  );
};

export default AirdropSuiPlayHoldersMethod;
