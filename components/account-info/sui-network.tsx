import { Box, Theme, useTheme } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { DISPLAY_NETWORK } from '@/constants';
import { useNetwork } from '@/context/network';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ChevronDownSVG, SuiLogoSVG } from '@/svg';

import NetworkDropDownMenu from './network-dropdown-menu';

const BOX_ID = 'network-box-id';

const SuiNetwork: FC = () => {
  const { colors } = useTheme() as Theme;
  const [isOpen, setIsOpen] = useState(false);
  const network = useNetwork();

  const closeNetworkDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    setIsOpen(false);
  };

  const handleOpenMenu = () => {
    setIsOpen(not);
  };

  const networkBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeNetworkDropdown);

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      id={BOX_ID}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={networkBoxRef}
    >
      <Box
        p="xs"
        gap="xs"
        display="flex"
        cursor="pointer"
        onClick={handleOpenMenu}
        borderRadius="xs"
        alignItems="center"
        bg={isOpen ? `${colors.primary}14` : 'container'}
      >
        <Box
          color="white"
          display="flex"
          width="1.5rem"
          height="1.5rem"
          cursor="pointer"
          alignItems="center"
          borderRadius="full"
          justifyContent="center"
        >
          <SuiLogoSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
        <Box fontFamily="Proto">{DISPLAY_NETWORK[network]}</Box>
        <Box
          display="flex"
          transform={`rotate(${isOpen ? '180deg' : '0deg'})`}
          alignItems="center"
        >
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        </Box>
      </Box>
      <NetworkDropDownMenu isOpen={isOpen} />
    </Box>
  );
};

export default SuiNetwork;
