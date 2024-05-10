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
      {!!PARTNERS.length && (
        <Box borderTop="1px solid" borderColor="outlineVariant" />
      )}
      {PARTNERS.map(({ link, name, img }) => (
        <Box pt="m" key={v4()}>
          <a href={link} target="_blank" rel="noreferrer">
            {isCollapsed ? (
              <Box
                display="flex"
                borderRadius="s"
                cursor="pointer"
                alignItems="center"
                bg="lowestContainer"
                justifyContent="center"
              >
                <Box
                  display="flex"
                  width="2.8rem"
                  height="2.8rem"
                  overflow="hidden"
                  borderRadius="50%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <img src={img} alt={name} width="80%" height="80%" />
                </Box>
              </Box>
            ) : (
              <Box
                p="xs"
                pr="s"
                display="flex"
                borderRadius="s"
                cursor="pointer"
                alignItems="center"
                bg="lowestContainer"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" justifyItems="center">
                  <Box mr="s">
                    <Box
                      display="flex"
                      width="2.8rem"
                      height="2.8rem"
                      overflow="hidden"
                      borderRadius="50%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img src={img} alt={name} width="80%" height="80%" />
                    </Box>
                  </Box>
                  <Typography
                    size="large"
                    variant="label"
                    textDecoration="underline"
                    display={isCollapsed ? 'none' : 'block'}
                  >
                    {name}
                  </Typography>
                </Box>
                <Box display={isCollapsed ? 'none' : 'block'}>
                  <ArrowTopRightSVG
                    width="1.5rem"
                    maxWidth="1.5rem"
                    maxHeight="1.5rem"
                  />
                </Box>
              </Box>
            )}
          </a>
        </Box>
      ))}
    </>
  );
};

export default SidebarMenuList;
