import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { ConnectButton } from '@mysten/wallet-kit';
import stylin from '@stylin.js/react';
import { FC } from 'react';

const CustomConnectWalletButton = stylin(ConnectButton as never)();

const ConnectWalletButton: FC = () => {
  const { colors, radii } = useTheme() as Theme;

  return (
    <CustomConnectWalletButton
      py="m"
      px="xl"
      width="100%"
      fontSize="s"
      fontFamily="Proto !important"
      transition="all 0.3s ease-in-out"
      bg={`${colors.primary} !important`}
      color={`${colors.onPrimary} !important`}
      borderRadius={`${radii.xs} !important`}
      nHover={{ bg: 'accent', transform: 'scale(1.03)' }}
    />
  );
};

export default ConnectWalletButton;
