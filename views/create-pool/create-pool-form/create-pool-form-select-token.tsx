import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TOKEN_SVG_MAP } from '@/constants/token';
import { useModal } from '@/hooks/use-modal';
import { CoinData } from '@/interface';
import { ChevronRightSVG, SUISVG } from '@/svg';
import SelectTokenModal from '@/views/components/select-token-modal';

import { IPoolForm } from '../create-pool.types';

const CreatePoolFormSelectToken: FC<{ name: `token${'A' | 'B'}` }> = ({
  name,
}) => {
  const { control, setValue } = useFormContext<IPoolForm>();
  const token = useWatch({ control, name });

  const TokenIcon = TOKEN_SVG_MAP[token.type] ?? SUISVG;

  const { setModal, handleClose } = useModal();

  const onSelect = (coin: CoinData) => {
    setValue(name, {
      ...coin,
      value: '0',
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
      gap="xs"
      bg="surface"
      ml="-0.75rem"
      display="flex"
      minWidth="8rem"
      cursor="pointer"
      borderRadius="xs"
      color="onSurface"
      alignItems="center"
      onClick={openModal}
    >
      <Box
        bg="black"
        color="white"
        display="flex"
        width="1.8rem"
        height="1.8rem"
        alignItems="center"
        borderRadius="full"
        justifyContent="center"
      >
        <TokenIcon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
      <Typography variant="label" size="large" flex="1" as="span">
        {token.symbol}
      </Typography>
      <Box rotate="90deg">
        <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
    </Box>
  );
};

export default CreatePoolFormSelectToken;
