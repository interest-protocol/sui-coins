import { Box, Button } from '@interest-protocol/ui-kit';
import { useFormContext } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';

import { SwapForm } from './swap.types';
const SwapButton = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<SwapForm>();
  const { getValues } = form;

  const coinsExist = coinsMap[getValues('from.type')];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt="l"
      mb="l"
    >
      <Button
        py="s"
        px="xl"
        fontSize="s"
        bg={coinsExist ? 'filled' : 'container'}
        type="button"
        variant={coinsExist ? 'filled' : 'tonal'}
        color={coinsExist ? 'surface' : 'outlineVariant'}
        cursor={coinsExist ? 'pointer' : 'not-allowed'}
        borderRadius="xs"
        fontFamily="Proto"
      >
        Preview swap
      </Button>
    </Box>
  );
};

export default SwapButton;
