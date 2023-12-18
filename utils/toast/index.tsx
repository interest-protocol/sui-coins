import { Box, Typography } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import toast from 'react-hot-toast';

import { EXPLORER_URL } from '@/constants';
import { Network } from '@/lib';

export const showTXSuccessToast = async (
  tx: SuiTransactionBlockResponse,
  network: Network
): Promise<void> => {
  const explorerLink = EXPLORER_URL[network](`/txblock/${tx.digest}`);

  toast(
    <a target="__black" rel="noreferrer nofollow" href={explorerLink}>
      <Box display="flex" alignItems="center">
        <Typography
          size="medium"
          color="accent"
          variant="body"
          cursor="pointer"
          textDecoration="underline"
        >
          Explorer
        </Typography>
      </Box>
    </a>
  );
};
