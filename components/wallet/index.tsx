import { Box, Theme, useTheme } from '@interest-protocol/ui-kit';
import { ConnectButton } from '@mysten/wallet-kit';
import stylin from '@stylin.js/react';
import { FC } from 'react';

const ConnectWalletButton = stylin(ConnectButton as any)();

const Wallet: FC = () => {
  const { colors } = useTheme() as Theme;

  return (
    <Box display="flex" justifyContent="flex-end">
      <ConnectWalletButton
        fontFamily="Proto !important"
        borderRadius="99rem !important"
        bg={`${colors.primary} !important`}
        color={`${colors['primary.onPrimary']} !important`}
      />
    </Box>
  );
};

export default Wallet;
