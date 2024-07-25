import {
  Box,
  Motion,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { not, toPairs } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { DISPLAY_NETWORK } from '@/constants/network';
import { Network } from '@/constants/network';
import { wrapperVariants } from '@/constants/wrapper-variants';
import { useNetwork } from '@/context/network';
import { useIsFirstRender } from '@/hooks';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { ChevronDownSVG, MovementLogoSVG } from '@/svg';

import OptionItem from './menu-options/option-item';

const BOX_ID = 'network-box-id';

const MovementNetwork: FC = () => {
  const { colors } = useTheme() as Theme;
  const isFirstRender = useIsFirstRender();
  const [isOpen, setIsOpen] = useState(false);
  const network = useNetwork();
  const { selectNetwork } = useSuiClientContext();

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
          color="onSurface"
          display="flex"
          width="1.5rem"
          height="1.5rem"
          cursor="pointer"
          alignItems="center"
          borderRadius="full"
          justifyContent="center"
        >
          <MovementLogoSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
        <Typography
          variant="label"
          size="large"
          mr="0.5rem"
          width="max-content"
          color="onSurface"
        >
          {`${DISPLAY_NETWORK[network]}`}
        </Typography>
        <Box
          display="flex"
          transform={`rotate(${isOpen ? '180deg' : '0deg'})`}
          alignItems="center"
          color="onSurface"
        >
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        </Box>
      </Box>
      {!isFirstRender && (
        <Motion
          right="0"
          top="3rem"
          zIndex={4}
          bg="container"
          width="14.5rem"
          borderRadius="m"
          position="absolute"
          variants={wrapperVariants}
          textTransform="capitalize"
          initial={isOpen ? 'closed' : 'open'}
          animate={isOpen ? 'open' : 'closed'}
          pointerEvents={isOpen ? 'auto' : 'none'}
          boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
        >
          {toPairs(DISPLAY_NETWORK).map(
            ([networkKey, displayNetwork], index) => (
              <OptionItem
                key={v4()}
                index={index}
                selected={networkKey === network}
                totalItems={toPairs(DISPLAY_NETWORK).length}
                onClick={() => selectNetwork(networkKey as Network)}
              >
                <MovementLogoSVG maxWidth="2rem" maxHeight="2rem" />
                <Box>M2 {displayNetwork}</Box>
              </OptionItem>
            )
          )}
        </Motion>
      )}
    </Box>
  );
};

export default MovementNetwork;
