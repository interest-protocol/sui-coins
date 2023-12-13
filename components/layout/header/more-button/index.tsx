import { Box, Motion } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import OptionItem from '@/components/account-info/menu-options/option-item';
import { Routes, RoutesEnum, wrapperVariants } from '@/constants';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import { DeviceMenuType } from '../header.types';
import { MENU_ITEMS } from '../nav-bar.data';

const BOX_ID = 'network-box-id';

const RELATED_LINK = [
  Routes[RoutesEnum.Faucet],
  Routes[RoutesEnum.Airdrop],
  Routes[RoutesEnum.MyCoins],
  Routes[RoutesEnum.Metrics],
];

const MoreButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { asPath, push } = useRouter();

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
      id={BOX_ID}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={networkBoxRef}
      display="flex"
      position="relative"
      flexDirection="column"
    >
      <Box
        py="s"
        fontSize="s"
        display="flex"
        cursor="pointer"
        fontFamily="Proto"
        textAlign="center"
        borderRadius="full"
        alignItems="center"
        bg={RELATED_LINK.includes(asPath) ? 'primary' : 'lowestContainer'}
        border={
          RELATED_LINK.includes(asPath)
            ? 'unset'
            : isOpen
              ? '0.25rem solid'
              : 'unset'
        }
        px={['s', 's', 's', 'xl']}
        onClick={handleOpenMenu}
        nHover={{
          color: !RELATED_LINK.includes(asPath) ? 'primary' : 'lowestContainer',
        }}
        transition="all 0.3s ease-in-out"
        nActive={{ borderColor: '#0053DB33' }}
        color={
          RELATED_LINK.includes(asPath)
            ? 'lowestContainer'
            : isOpen
              ? 'primary'
              : 'onSurface'
        }
        borderColor={
          RELATED_LINK.includes(asPath) || isOpen ? '#0053DB33' : 'transparent'
        }
      >
        More
      </Box>
      {isOpen && (
        <Motion
          right="0"
          top="5rem"
          zIndex={4}
          width="14.5rem"
          initial="closed"
          border="1px solid"
          borderRadius="1rem"
          position="absolute"
          bg="lowestContainer"
          variants={wrapperVariants}
          textTransform="capitalize"
          borderColor="outlineVariant"
          animate={isOpen ? 'open' : 'closed'}
          pointerEvents={isOpen ? 'auto' : 'none'}
          boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
        >
          {MENU_ITEMS.filter(
            ({ device }) => DeviceMenuType.Mobile == device
          ).map(({ path, name }) => (
            <OptionItem
              key={v4()}
              selected={path === asPath}
              onClick={() => push(path)}
            >
              <Box>{name}</Box>
            </OptionItem>
          ))}
        </Motion>
      )}
    </Box>
  );
};

export default MoreButton;
