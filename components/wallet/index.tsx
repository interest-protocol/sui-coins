import { ConnectButton } from '@mysten/wallet-kit';
import stylin from '@stylin.js/react';
import { FC } from 'react';

const ConnectWalletButton = stylin(ConnectButton as any)();

const Wallet: FC = () => (
  <ConnectWalletButton
    bg="#B4C5FF !important"
    color="#00174B !important"
    borderRadius="99rem !important"
  />
);

export default Wallet;
