import { Box, Button } from '@interest-protocol/ui-kit';
import { useFormContext } from 'react-hook-form';

import { useDialog } from '@/hooks';
import { useWeb3 } from '@/hooks/use-web3';
import { sleep } from '@/utils';

import { SwapForm } from './swap.types';
const SwapButton = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<SwapForm>();
  const { getValues } = form;

  const { dialog, handleClose } = useDialog();

  const coinsExist = coinsMap[getValues('from.type')];

  const handleSwap = async () => await sleep(3000);

  const swap = () => {
    dialog.promise(handleSwap(), {
      loading: {
        title: 'Test Swapping...',
        message: 'We are test swapping',
      },
      success: {
        onClose: handleClose,
        title: 'Test Swap Successfully',
        message: 'Your test swap was successfully',
        primaryButton: {
          label: 'Close',
          onClick: handleClose,
        },
      },
      error: {
        onClose: handleClose,
        title: 'Swap Failure',
        message:
          'Your swap failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });
  };

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
        onClick={swap}
      >
        Preview swap
      </Button>
    </Box>
  );
};

export default SwapButton;
