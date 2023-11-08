import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import useEventListener from '@/hooks/use-event-listener';

import AccountInfo from '../account-info';
import ConnectWalletButton from './connect-wallet-button';

const BOX_ID = 'Account-Menu';

const Wallet: FC = () => {
  const { isConnected } = useWalletKit();
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    handleCloseMenu();
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  const handleOpenMenu = () => setIsOpen(true);

  const handleCloseMenu = () => setIsOpen(false);

  useEventListener('resize', handleCloseMenu, true);

  return (
    <Box
      display={'flex'}
      justifyContent="flex-end"
      id={BOX_ID}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={connectedBoxRef}
      position="relative"
    >
      <AccountInfo
        menuIsOpen={isOpen}
        handleOpenMenu={handleOpenMenu}
        handleCloseMenu={handleCloseMenu}
      />
      {!isConnected && (
        <Box display={['none', 'none', 'none', 'flex']}>
          <ConnectWalletButton />
        </Box>
      )}
    </Box>
  );
};

export default Wallet;
