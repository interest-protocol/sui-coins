import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PARTNERS } from '@/constants';
import { useNetwork } from '@/context/network';
import { ArrowTopRightSVG } from '@/svg';

import SideBarMenuItem from './menu-item';
import { SIDEBAR_ITEMS } from './sidebar.data';
import { MenuListProps } from './sidebar.types';

const SidebarMenuList: FC<MenuListProps> = ({
  isCollapsed,
  setIsCollapsed,
  setTemporarilyOpen,
}) => {
  const network = useNetwork();

  return (
    <>
      <Box display="flex" flexDirection="column" gap="s" pb="m">
        {SIDEBAR_ITEMS.filter(({ networks }) => networks.includes(network)).map(
          (item) => (
            <SideBarMenuItem
              {...item}
              key={v4()}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              setTemporarilyOpen={setTemporarilyOpen}
            />
          )
        )}
      </Box>
      <Box as="hr" borderColor="outline" />
      {PARTNERS.map(({ link, name, Icon }) => (
        <Box pt="m" key={v4()}>
          <a href={link} target="_blank" rel="noreferrer">
            <Box
              bg="white"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="xs"
              pr="s"
              borderRadius="s"
              cursor="pointer"
            >
              <Box display="flex" alignItems="center" justifyItems="center">
                <Box mr="s">
                  <Icon maxWidth="2.8rem" maxHeight="2.8rem" width="100%" />
                </Box>
                <Typography
                  textDecoration="underline"
                  variant="label"
                  size="large"
                >
                  {name}
                </Typography>
              </Box>
              <ArrowTopRightSVG
                maxWidth="1.5rem"
                maxHeight="1.5rem"
                width="1.5rem"
              />
            </Box>
          </a>
        </Box>
      ))}
    </>
  );
};

export default SidebarMenuList;
