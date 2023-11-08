import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import useEventListener from '@/hooks/use-event-listener';

import AccountInfo from '../account-info';
import ConnectWalletButton from './connect-wallet-button';

const BOX_ID = 'Account-Menu';

const Wallet: FC = () => {
  const { query } = useRouter();
  const { isConnected } = useWalletKit();
  const [isOpen, setIsOpen] = useState(Boolean(query.menu));

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

  const handleOpenMenu = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('menu', 'true');
    window.history.pushState('', '', url.toString());
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('menu');
    window.history.pushState('', '', url.toString());
    setIsOpen(false);
  };

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
        <Box display={['none', 'none', 'flex', 'flex']}>
          <ConnectWalletButton />
        </Box>
      )}
    </Box>
  );
};

export default Wallet;
