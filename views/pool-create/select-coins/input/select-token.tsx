import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { TOKEN_ICONS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { CoinData } from '@/interface';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
import SelectTokenModal from '@/views/components/select-token-modal';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ index }) => {
  const network = useNetwork();
  const { setModal, handleClose } = useModal();

  const { setValue, control, getValues } = useFormContext<CreatePoolForm>();

  const currentToken = useWatch({
    control,
    name: `tokens.${index}`,
  });

  const { symbol: currentSymbol } = currentToken;

  const Icon = currentSymbol ? TOKEN_ICONS[network][currentSymbol] : null;

  const onSelect = async ({ type, decimals, symbol }: CoinData) => {
    if (getValues('tokens')?.some((token) => token.type === type)) return;

    setValue(`tokens.${index}`, {
      type,
      symbol,
      decimals,
      value: '',
    });
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
        color="onSurface"
        borderRadius="xs"
        bg="highestContainer"
        onClick={openModal}
        {...(Icon && {
          PrefixIcon: (
            <Box
              as="span"
              width="2.5rem"
              height="2.5rem"
              bg="onSurface"
              color="onPrimary"
              borderRadius="xs"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TokenIcon
                network={network}
                symbol={currentSymbol}
                type={currentToken.type}
              />
            </Box>
          ),
        })}
      >
        <Typography size="large" variant="label" p="xs">
          {currentSymbol || 'Select Token'}
        </Typography>
        {currentSymbol ? (
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        ) : (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectToken;
