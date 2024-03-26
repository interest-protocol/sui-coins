import { Button } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';

const Mint: FC = () => {
  const network = useNetwork();
  const currentAccount = useCurrentAccount();

  const getFaucet = () =>
    currentAccount &&
    toast.promise(
      fetch('https://faucet.testnet.sui.io/v1/gas', {
        method: 'POST',
        body: JSON.stringify({
          FixedAmountRequest: {
            recipient: currentAccount.address,
          },
        }),
      }),
      {
        loading: 'Minting SUI...',
        success: 'SUI Minted!',
        error: (e) => e.message ?? 'Error to Mint SUI!',
      }
    );

  if (!currentAccount || network !== Network.TESTNET) return null;

  return (
    <Button variant="tonal" onClick={getFaucet}>
      Mint Sui
    </Button>
  );
};

export default Mint;
