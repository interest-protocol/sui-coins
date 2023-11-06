import { Box, Theme, useTheme } from '@interest-protocol/ui-kit';
import { button } from '@interest-protocol/ui-kit/dist/theme/variants';
import { ConnectButton } from '@mysten/wallet-kit';
import stylin from '@stylin.js/react';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const Wallet: FC = () => {
  const { colors } = useTheme() as Theme;
  // const { currentWallet } = useCurrentWallet();
  // const { mutateAsync: disconnect } = useDisconnectWallet();
  // const account = currentWallet?.accounts.length
  //   ? currentWallet.accounts[0]
  //   : null;

  // return account ? (
  //   <div>
  //     address: {account.address} chain: {account.chains[0]}
  //     <button
  //       onClick={async () => {
  //         await disconnect();
  //       }}
  //     >
  //       disconnect
  //     </button>
  //   </div>
  // ) : (
  //   <ConnectModal trigger={<button>waa</button>} />
  // );

  return <ConnectButton />;
};

export default Wallet;
