import { Typography } from '@interest-protocol/ui-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import toast from 'react-hot-toast';

import { EXPLORER_URL, Network } from '@/constants';

export const showTXSuccessToast = (
  tx: SuiTransactionBlockResponse,
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
    </a>
  );
};
