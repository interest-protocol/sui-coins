import { Button } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClientContext } from '@mysten/dapp-kit';
import {
  getFaucetHost,
  getFaucetRequestStatus,
  requestSuiFromFaucetV1,
} from '@mysten/sui/faucet';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { Network } from '@/constants';

const faucetHost = getFaucetHost('testnet');

const Mint: FC = () => {
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();

  const getFaucet = async () => {
    if (!currentAccount) return;

    const loading = toast.loading('Minting SUI...');

    try {
      const response = await requestSuiFromFaucetV1({
        host: faucetHost,
        recipient: currentAccount.address,
      });

      const { status } = await getFaucetRequestStatus({
        host: faucetHost,
        taskId: response.task || '',
      });

      if (status.status === 'DISCARDED') throw new Error('Request discarded');

      toast.success('SUI Minted!');
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error to Mint SUI!');
    } finally {
      toast.dismiss(loading);
    }
  };

  if (!currentAccount || network !== Network.TESTNET) return null;

  return (
    <Button variant="tonal" onClick={getFaucet}>
      Mint Sui
    </Button>
  );
};

export default Mint;
