import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { FC, useEffect, useState } from 'react';

import { SuiNetwork, useSuiClient } from '@/hooks/use-sui-client';
import { FixedPointMath } from '@/lib';
import { LoadingSVG, SuiLogoSVG } from '@/svg';

const SuiBalance: FC = () => {
  const { currentAccount } = useWalletKit();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number | string>(0);
  const suiClient = useSuiClient(
    (currentAccount?.chains?.[0] as SuiNetwork) ?? 'sui:mainnet'
  );

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    setLoading(true);
    await suiClient
      .getBalance({ owner: currentAccount?.address || '' })
      .then((data) =>
        setBalance(FixedPointMath.from(BigNumber(data.totalBalance)).toNumber())
      )
      .catch(() => setBalance('∞'))
      .finally(() => setLoading(false));
  };

  return (
    <Box display="flex" gap="xs" alignItems="center">
      <Box
        width="1.5rem"
        height="1.5rem"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
      >
        <SuiLogoSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
      <Box fontFamily="Proto !important">
        {loading ? (
          <Box as="span" display="inline-block">
            <LoadingSVG
              width="100%"
              height="100%"
              maxWidth="1rem"
              maxHeight="1rem"
            />
          </Box>
        ) : (
          balance
        )}
      </Box>
    </Box>
  );
};

export default SuiBalance;
