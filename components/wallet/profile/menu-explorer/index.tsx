import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { useAccounts } from '@mysten/dapp-kit';
import { FC } from 'react';

import { CheckmarkSVG } from '@/components/svg';
import { wrapperVariants } from '@/constants';

import ItemWrapper from '../../../menu-mobile/menu-settings/item-wrapper';
import { MenuExplorerProps } from '../profile.types';
import MenuSwitchAccountHeader from './header';
import { v4 } from 'uuid';

const MenuExplorer: FC<MenuExplorerProps> = ({
  isOpen,
  onBack,
  explorer,
  handleCloseProfile,
  handleExplorer,
}) => {
  const accounts = useAccounts();

  return (
    <Motion
      right="0"
      top={['0', '0', '0', '3rem']}
      overflow="visible"
      zIndex={1}
      borderRadius="m"
      position={['fixed', 'fixed', 'fixed', 'absolute']}
      bg="container"
      variants={wrapperVariants}
      animate={isOpen ? 'open' : 'closed'}
      initial={isOpen ? 'closed' : 'open'}
      pointerEvents={isOpen ? 'auto' : 'none'}
      textTransform="capitalize"
      width={['100vw', '100vw', '100vw', '14.5rem']}
      height={['100vh', '100vh', '100vh', 'unset']}
      p={['xl', 'xl', 'xl', 'unset']}
    >
      <MenuSwitchAccountHeader
        handleCloseProfile={handleCloseProfile}
        onBack={onBack}
        size={accounts.length}
      />
      {['sui vision', 'sui scan', 'polymedia'].map((item) => {
        return (
          <ItemWrapper
            key={v4()}
            disabled={false}
            onClick={() => handleExplorer(item)}
          >
            <Box width="100%" display="flex">
              <Box gap="s" display="flex" flexDirection="column">
                <Box
                  gap="m"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {item === explorer && (
                    <Box
                      width="1rem"
                      height="1rem"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="1px solid"
                      borderColor="success"
                      color="success"
                    >
                      <CheckmarkSVG
                        maxHeight="0.438rem"
                        maxWidth="0.438rem"
                        width="100%"
                      />
                    </Box>
                  )}
                  <Typography size="medium" variant="body">
                    {item}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ItemWrapper>
        );
      })}
    </Motion>
  );
};

export default MenuExplorer;
