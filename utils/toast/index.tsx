import { Box, Typography } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { propOr } from 'ramda';
import toast from 'react-hot-toast';

import { EXPLORER_URL, Network } from '@/constants';
import { tryCatch } from '@/utils/promise';

import { ToastMsgs, ToastOpts } from './toast.types';

export const showTXSuccessToast = async (
  tx: SuiTransactionBlockResponse,
  network: Network
): Promise<void> => {
  const explorerLink = `${EXPLORER_URL[network]}/txblock/${tx.digest}`;

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
          Sui Explorer
        </Typography>
      </Box>
    </a>
  );
};

export function showToast<T>(
  fn: Promise<T>,
  msgs: ToastMsgs = {
    loading: 'Submitting tx...',
    success: 'Success!',
    error: propOr('Something went wrong', 'message'),
  },
  options: ToastOpts = undefined
): Promise<T | undefined> {
  return tryCatch(toast.promise(fn, msgs, options), (x) => x);
}
