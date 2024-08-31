import {
  getFaucetHost,
  getFaucetRequestStatus,
  requestSuiFromFaucetV1,
} from '@mysten/sui/faucet';
import { WalletAccount } from '@mysten/wallet-standard';

const faucetHost = getFaucetHost('testnet');

export const requestSui = async (currentAccount: WalletAccount) => {
  const response = await requestSuiFromFaucetV1({
    host: faucetHost,
    recipient: currentAccount.address,
  });

  const { status } = await getFaucetRequestStatus({
    host: faucetHost,
    taskId: response.task || '',
  });

  if (status.status === 'DISCARDED') throw new Error('Request discarded');
};
