import { Box, Theme, useTheme } from '@interest-protocol/ui-kit';
import { ConnectButton } from '@mysten/wallet-kit';
import stylin from '@stylin.js/react';
import { FC } from 'react';

const ConnectWalletButton = stylin(ConnectButton as never)();

const Wallet: FC = () => {
  const { colors, radii } = useTheme() as Theme;

  return (
    <Box display={['none', 'flex']} justifyContent="flex-end">
      <ConnectWalletButton
        py="m"
        px="xl"
        fontSize="s"
        fontFamily="Proto !important"
        bg={`${colors.primary} !important`}
        color={`${colors.onPrimary} !important`}
        borderRadius={`${radii.full} !important`}
      />
    </Box>
  );
};

export default Wallet;
