import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { CoinData } from '@/interface';
import { ChevronRightSVG } from '@/svg';
import { isSui } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ index, isMobile }) => {
  const network = useNetwork();
  const { setModal, handleClose } = useModal();

  const { setValue, control, getValues } = useFormContext<CreatePoolForm>();

  const currentToken = useWatch({
    control,
    name: `tokens.${index}`,
  });

  const { symbol: currentSymbol } = currentToken;

  const onSelect = async ({ type, decimals, symbol }: CoinData) => {
    if (getValues('tokens')?.some((token) => token.type === type)) return;

    setValue(`tokens.${index}`, {
      type,
      symbol,
      decimals,
      value: '',
      usdPrice: currentToken?.usdPrice,
    });

    fetch(`/api/auth/v1/coin-price?symbol=${isSui(type) ? 'SUI' : symbol}`)
      .then((response) => response.json())
      .then((data) =>
        setValue(
          `tokens.${index}.usdPrice`,
          data[isSui(type) ? 'SUI' : symbol][0].quote.USD.price
        )
      )
      .catch(() => null);
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
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Box
      p="xs"
      position="relative"
      minWidth={['8rem', '8rem', '8rem', '8rem', '10rem']}
    >
      <Button
        p="2xs"
        fontSize="s"
        width="100%"
        variant="tonal"
        bg={currentSymbol ? 'transparent' : 'highestContainer'}
        color="onSurface"
        borderRadius="xs"
        onClick={openModal}
        {...(currentSymbol && {
          PrefixIcon: (
            <TokenIcon
              withBg
              network={network}
              symbol={currentSymbol}
              type={currentToken.type}
            />
          ),
        })}
      >
        <Typography
          p="xs"
          variant="label"
          whiteSpace="nowrap"
          width="100%"
          size={isMobile ? 'large' : 'small'}
        >
          {currentSymbol || 'Select token'}
        </Typography>
        {!currentSymbol && (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectToken;
