import { Box, Typography } from '@interest-protocol/ui-kit';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { noop } from '@/utils';

import { MenuItemProps } from '../layout/sidebar/sidebar.types';

const MobileMenuListItem: FC<
  Omit<
    MenuItemProps,
    | 'setIsCollapsed'
    | 'isCollapsed'
    | 'setTemporarilyOpen'
    | 'temporarilyOpen'
    | 'open'
  >
> = ({ accordionList, ...item }) => {
  const { asPath, push } = useRouter();

  const { currentWallet } = useCurrentWallet();

  const { name, path, Icon, beta, disabled, suiWalletLink } = item;

  const hasAccordion = accordionList && accordionList.length;

  const onClick = () => {
    if (accordionList || disabled || !path) return;

    push(path);
  };

  if (hasAccordion)
    return (
      <>
        {accordionList.map(({ name, path, beta, disabled, Icon }) => (
          <Box key={v4()}>
            <Box
              p="l"
              mx="auto"
              display="flex"
              height="2.2rem"
              borderRadius="xs"
              color="onSurface"
              alignItems="center"
              opacity={disabled ? 0.7 : 1}
              justifyContent="space-between"
              cursor={disabled ? 'not-allowed' : 'pointer'}
              nHover={{ bg: !disabled && 'highestContainer' }}
              bg={asPath === path ? 'highestContainer' : undefined}
              onClick={onClick}
            >
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Icon maxHeight="1rem" maxWidth="1rem" width="1.2rem" />
                  <Typography
                    ml="s"
                    size="small"
                    variant="title"
                    width="max-content"
                    textTransform="capitalize"
                  >
                    {name}
                  </Typography>
                </Box>
                {beta && (
                  <Typography
                    px="xs"
                    py="2xs"
                    size="small"
                    variant="label"
                    border="1px solid"
                    borderRadius="2xs"
                    bg="errorContainer"
                    color="onErrorContainer"
                  >
                    Beta
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </>
    );

  const isSuiWallet = !!suiWalletLink && currentWallet?.name === 'Sui Wallet';

  return (
    <a href={suiWalletLink ? (isSuiWallet ? suiWalletLink : noop) : noop}>
      <Box>
        <Box
          p="l"
          mx="auto"
          display="flex"
          height="2.2rem"
          borderRadius="xs"
          color="onSurface"
          alignItems="center"
          opacity={disabled ? 0.7 : 1}
          justifyContent="space-between"
          cursor={disabled ? 'not-allowed' : 'pointer'}
          nHover={{ bg: !disabled && 'highestContainer' }}
          bg={asPath === path ? 'highestContainer' : undefined}
          onClick={onClick}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Icon maxHeight="1rem" maxWidth="1rem" width="1.2rem" />
              <Typography
                ml="s"
                size="small"
                variant="title"
                width="max-content"
                textTransform="capitalize"
              >
                {name}
              </Typography>
            </Box>
            {beta && (
              <Typography
                px="xs"
                py="2xs"
                size="small"
                variant="label"
                border="1px solid"
                borderRadius="2xs"
                bg="errorContainer"
                color="onErrorContainer"
              >
                Beta
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </a>
  );
};

export default MobileMenuListItem;
