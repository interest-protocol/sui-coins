import { Typography } from '@interest-protocol/ui-kit';
import toast from 'react-hot-toast';

import { ExplorerMode } from '@/constants';
import { TimedSuiTransactionBlockResponse } from '@/interface';

export const showTXSuccessToast = (
  tx: TimedSuiTransactionBlockResponse,
  getExplorerUrl: (value: string, mode: ExplorerMode) => string,
  message: string
): void => {
  const explorerLink = getExplorerUrl(tx.digest, ExplorerMode.Transaction);

  toast.success(
    <a target="_blank" rel="noreferrer nofollow" href={explorerLink}>
      <Typography size="medium" variant="body" cursor="pointer">
        {message}
      </Typography>
      <Typography size="small" variant="body" cursor="pointer">
        Tx finalized in {+(tx.time / 1000).toFixed(2)} sec!
      </Typography>
      <Typography
        size="medium"
        variant="label"
        cursor="pointer"
        textDecoration="underline"
      >
        Sui Explorer
      </Typography>
    </a>
  );
};
