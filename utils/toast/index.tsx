import { Typography } from '@interest-protocol/ui-kit';
import toast from 'react-hot-toast';

import { EXPLORER_URL, Network } from '@/constants';
import { TimedSuiTransactionBlockResponse } from '@/interface';

export const showTXSuccessToast = (
  tx: TimedSuiTransactionBlockResponse,
  network: Network
): void => {
  const explorerLink = `${EXPLORER_URL[network]}/tx/${tx.digest}`;

  toast(
    <a target="_blank" rel="noreferrer nofollow" href={explorerLink}>
      <Typography
        size="medium"
        variant="label"
        cursor="pointer"
        textDecoration="underline"
      >
        Sui Explorer
      </Typography>
      <Typography size="small" variant="body" cursor="pointer">
        Tx finalized in {+(tx.time / 1000).toFixed(2)} sec!
      </Typography>
    </a>
  );
};
