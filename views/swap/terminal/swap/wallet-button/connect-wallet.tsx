import '@mysten/dapp-kit/dist/index.css';

import { Button } from '@interest-protocol/ui-kit';
import { ConnectModal } from '@mysten/dapp-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

const ConnectWallet: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <ConnectModal
      open={open}
      onOpenChange={() => setOpen(not)}
      trigger={
        <Button variant="filled" p="xs" borderRadius="2xs">
          Connect Wallet
        </Button>
      }
    />
  );
};

export default ConnectWallet;
