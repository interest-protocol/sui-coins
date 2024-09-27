import { Token } from '@interest-protocol/sui-tokens';
import { Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { ChevronDownSVG } from '@/components/svg';
import { Network } from '@/constants';
import { getAllCoinsPrice } from '@/hooks/use-get-multiple-token-price-by-type/use-get-multiple-token-price-by-type.utils';
import { useNetwork } from '@/hooks/use-network';

import SelectTokenModal from '../select-token-modal';
import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const network = useNetwork();
  const [open, setOpen] = useState(false);

  const { setValue, control, getValues } = useFormContext<SwapForm>();

  const fixed = getValues(`fixed${label === 'from' ? 'In' : 'Out'}`);

  const currentToken = useWatch({
    control,
    name: label,
  });

  const swapping = useWatch({
    control,
    name: 'swapping',
  });

  const { symbol: currentSymbol, type: currentType } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const oppositeType = useWatch({
    control,
    name: `${label === 'to' ? 'from' : 'to'}.type`,
  });

  const onSelect = async ({ type, decimals, symbol, chain }: Token) => {
    if (type === oppositeType) {
      setValue(label === 'to' ? 'from' : 'to', {
        type: currentToken.type,
        symbol: currentToken.symbol,
        decimals: currentToken.decimals,
        usdPrice: currentToken.usdPrice,
        chain: currentToken.chain,
        display: '',
      });
    }

    setValue(label, {
      type,
      chain,
      symbol,
      decimals,
      display: '',
      usdPrice: null,
    });

    getAllCoinsPrice([type], network)
      .then((data) => setValue(`${label}.usdPrice`, data[type]))
      .catch(() => null);

    if (label === 'from') setValue('to.display', '');
  };

  const openModal = () => setOpen(true);

  return (
    <>
      <Button
        py="2xs"
        pr="s"
        bg="#F8F9FD"
        fontSize="s"
        variant="tonal"
        border="1px solid"
        borderRadius="full"
        onClick={openModal}
        disabled={fixed || swapping}
        opacity={swapping ? 0.7 : 1}
        pl={currentType ? '2xs' : 'm'}
        borderColor="#C6C6CA !important"
        {...(currentType && {
          PrefixIcon: (
            <TokenIcon
              withBg
              rounded
              size="1.1rem"
              type={currentType}
              symbol={currentSymbol}
              network={network as Network}
            />
          ),
        })}
      >
        <Typography
          size="large"
          variant="label"
          overflow="hidden"
          whiteSpace="nowrap"
          fontFamily="Satoshi"
        >
          {currentSymbol}
        </Typography>
        {!fixed && (
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
      {open && (
        <Motion
          inset="0"
          zIndex="11"
          position="absolute"
          animate={{ scale: 1 }}
          initial={{ scale: 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <SelectTokenModal
            closeModal={() => setOpen(false)}
            onSelect={onSelect}
          />
        </Motion>
      )}
    </>
  );
};

export default SelectToken;
