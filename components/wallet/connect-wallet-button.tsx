import '@mysten/dapp-kit/dist/index.css';

import { Button } from '@interest-protocol/ui-kit';
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

const ConnectWalletButton: FC = () => {
  const [open, setOpen] = useState(false);
  const currentAccount = useCurrentAccount();

  return (
    <ConnectModal
      trigger={
        <Button
          py="s"
          variant="filled"
          borderRadius="xs"
          disabled={!!currentAccount}
          onClick={() => setOpen(not)}
        >
          Connect Wallet
        </Button>
      }
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
    />
  );
};

export default ConnectWalletButton;
