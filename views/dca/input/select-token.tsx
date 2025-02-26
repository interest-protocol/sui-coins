import { Token } from '@interest-protocol/sui-tokens';
import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
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

  const {
    symbol: currentSymbol,
    type: currentType,
    logoUrl: currentUrl,
  } = currentToken ?? {
    logoUrl: undefined,
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
      setValue(label === 'to' ? 'from' : 'to', {
        ...currentToken,
        display: '',
        value: ZERO_BIG_NUMBER,
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

    await fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coins: [type],
      }),
    })
      .then((res) => res.json?.())
      .then((data) => setValue(`${label}.usdValue`, data[0].price));

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
      fontSize="s"
      variant="tonal"
      color="onSurface"
      borderRadius="xs"
      onClick={openModal}
      borderStyle="solid"
      gap={['unset', 's', 's']}
      borderColor="outlineVariant"
      height={label == 'to' ? '3.5rem' : ''}
      {...(label === 'to' && { px: 'xs' })}
      borderWidth={label === 'to' ? '1px' : '0px'}
      bg={label === 'to' ? 'none' : 'lowContainer'}
      py={label == 'to' ? 'unset' : currentType ? 'xs' : 's'}
      SuffixIcon={
        label == 'to' ? (
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        ) : (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )
      }
      {...(currentType &&
        label === 'from' && {
          PrefixIcon: (
            <TokenIcon
              withBg
              rounded
              size="1.1rem"
              url={currentUrl}
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
            size="1.4rem"
            url={currentUrl}
            network={network}
            type={currentType}
            symbol={currentSymbol}
          />
        )}
        <Typography
          size="large"
          variant="label"
          maxWidth="12ch"
          overflowX="hidden"
          whiteSpace="nowrap"
          fontFamily="Satoshi"
          textOverflow="ellipsis"
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
