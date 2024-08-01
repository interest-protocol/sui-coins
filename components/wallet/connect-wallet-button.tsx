import '@mysten/dapp-kit/dist/index.css';

import { Button, Typography } from '@interest-protocol/ui-kit';
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

const ConnectWalletButton: FC = () => {
  const [open, setOpen] = useState(false);
  const currentAccount = useCurrentAccount();

  return (
    <ConnectModal
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
      trigger={
        <Button
          px={['s', 'l']}
          variant="filled"
          borderRadius="xs"
          disabled={!!currentAccount}
          onClick={() => setOpen(not)}
        >
          Connect
          <Typography
            as="span"
            size="large"
            variant="label"
            display={['none', 'none', 'inline']}
          >
            {' '}
            Wallet
          </Typography>
        </Button>
      }
    />
  );
};

export default ConnectWalletButton;
