import { Box, Motion } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import OptionItem from '@/components/account-info/menu-options/option-item';
import { wrapperVariants } from '@/constants';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import { MENU_ITEMS } from '../nav-bar.data';

const BOX_ID = 'network-box-id';

const RELATED_LINK = MENU_ITEMS.filter(({ mobileOnly }) => !mobileOnly).map(
  ({ path }) => path
);

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
          overflow="hidden"
          borderRadius="s"
          border="1px solid"
          position="absolute"
          bg="lowestContainer"
          variants={wrapperVariants}
          textTransform="capitalize"
          borderColor="outlineVariant"
          animate={isOpen ? 'open' : 'closed'}
          pointerEvents={isOpen ? 'auto' : 'none'}
        >
          {MENU_ITEMS.filter(({ mobileOnly }) => !mobileOnly).map(
            ({ path, name }) => (
              <OptionItem
                key={v4()}
                selected={path === asPath}
                onClick={() => push(path)}
              >
                <Box>{name}</Box>
              </OptionItem>
            )
          )}
        </Motion>
      )}
    </Box>
  );
};

export default MoreButton;
