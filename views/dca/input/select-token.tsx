import { Token } from '@interest-protocol/sui-tokens';
import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { ChevronDownSVG } from '@/svg';
import { updateURL, ZERO_BIG_NUMBER } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { DCAForm } from '../dca.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const network = useNetwork();
  const { pathname } = useRouter();
  const { setModal, handleClose } = useModal();

  const { setValue, control } = useFormContext<DCAForm>();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const changeURL = (type: string, oppositeType?: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(label, type);

    if (oppositeType)
      searchParams.set(label === 'to' ? 'from' : 'to', oppositeType);

    updateURL(
      `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
        'to'
      )}`
    );
  };

  const oppositeType = useWatch({
    control,
    name: `${label === 'to' ? 'from' : 'to'}.type`,
  });

  const onSelect = async ({ type, decimals, symbol, chain }: Token) => {
    if (type === oppositeType) {
      if (label === 'to')
        setValue(label === 'to' ? 'from' : 'to', {
          display: '',
          value: ZERO_BIG_NUMBER,
          type: currentToken.type,
          chain: currentToken.chain,
          symbol: currentToken.symbol,
          decimals: currentToken.decimals,
        });
    }

    setValue(label, {
      type: type,
      display: '',
      chain: chain,
      symbol: symbol,
      decimals: decimals,
      value: ZERO_BIG_NUMBER,
    });

    changeURL(type, type === oppositeType ? currentToken.type : undefined);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal
          onSelect={onSelect}
          closeModal={handleClose}
          faucet={network === Network.TESTNET}
          simple={network === Network.TESTNET}
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
    <Button
      px="s"
      py="auto"
      fontSize="s"
      variant="tonal"
      color="onSurface"
      borderRadius="xs"
      borderStyle="solid"
      onClick={openModal}
      borderColor="outlineVariant"
      height={label === 'to' ? '3.25rem' : '3rem'}
      bg={label === 'to' ? 'none' : 'lowContainer'}
      borderWidth={label === 'to' ? '1px' : '0px'}
      SuffixIcon={
        <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      }
      {...(currentType &&
        label === 'from' && {
          PrefixIcon: (
            <TokenIcon
              withBg
              rounded
              size="1.1rem"
              network={network}
              type={currentType}
              symbol={currentSymbol}
            />
          ),
        })}
    >
      <Box as="span" display="flex" alignItems="center" gap="xs">
        {currentType && label === 'to' && (
          <TokenIcon
            withBg
            rounded
            size="1.1rem"
            network={network}
            type={currentType}
            symbol={currentSymbol}
          />
        )}
        <Typography
          size="large"
          variant="label"
          overflow="hidden"
          whiteSpace="nowrap"
          fontFamily="Satoshi"
          width={['0px', 'auto']}
          display={[currentType ? 'none' : 'block', 'block']}
        >
          {currentSymbol ?? 'Select Token'}
        </Typography>
      </Box>
    </Button>
  );
};

export default SelectToken;
