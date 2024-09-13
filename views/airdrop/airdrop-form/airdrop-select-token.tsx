import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import useTokenPriceByType from '@/hooks/use-token-price';
import { ChevronRightSVG } from '@/svg';

import { CoinObject } from '../../../resui/web3-manager/coins-manager/coins-manager.types';
import SelectTokenModal from '../../components/select-token-modal';
import { IAirdropForm } from '../airdrop.types';
import { getSymbol } from '../airdrop.utils';

const BOX_ID = 'dropdown-id';

const AirdropSelectToken: FC = () => {
  const { network } = useSuiClientContext();
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const { isLoading, error, data: usdPrice } = useTokenPriceByType(token?.type);

  useEffect(() => {
    if (!isLoading && !error) setValue('tokenUSDPrice', usdPrice);
  }, [usdPrice, isLoading, error]);

  const onSelect = (coin: CoinObject) => {
    setValue('token', coin);
    setValue('tokenUSDPrice', undefined);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        custom: true,
        allowClose: true,
      }
    );

  return (
    <Box position="relative" id={BOX_ID}>
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
        {token && (
          <TokenIcon
            withBg
            type={token.type}
            symbol={token.symbol}
            network={network as Network}
          />
        )}
        <Typography variant="label" size="large" flex="1" as="span">
          {token ? getSymbol(token.symbol, token.type) : '---'}
        </Typography>
        <Box rotate="90deg">
          <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default AirdropSelectToken;
