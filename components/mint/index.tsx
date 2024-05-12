import { Button } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClientContext } from '@mysten/dapp-kit';
import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui.js/faucet';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { Network } from '@/constants';

const Mint: FC = () => {
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();

  const getFaucet = async () => {
    if (!currentAccount) return;

    const loading = toast.loading('Minting SUI...');

    try {
      await requestSuiFromFaucetV1({
        host: getFaucetHost('testnet'),
        recipient: currentAccount.address,
      });
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
