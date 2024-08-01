import {
  Box,
  Motion,
  Theme,
  TooltipWrapper,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { ChevronLeftSVG } from '@/svg';

import Checkpoint from '../checkpoint';
import useCheckpoint from '../checkpoint/checkpoint.hook';
import { SidebarCollapseButtonProps } from './sidebar.types';

const SidebarCollapseButton: FC<SidebarCollapseButtonProps> = ({
  isOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { colors } = useTheme() as Theme;
  const { content: checkpoint } = useCheckpoint();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);

    window.localStorage.setItem(
      `${LOCAL_STORAGE_VERSION}-movement-menu-collapse`,
      String(!isCollapsed)
    );
  };

  return (
    <Motion
      my="s"
      gap="m"
      mx="2xs"
      display="flex"
      transition={{ duration: 0.5 }}
      animation={isCollapsed ? 'collapsed' : 'unCollapsed'}
      variants={{
        collapsed: { width: '2.5rem' },
        unCollapsed: { width: '100%' },
      }}
    >
      <Box
        display="flex"
        minWidth="2.5rem"
        minHeight="2.5rem"
        cursor="pointer"
        borderRadius="xs"
        color="onSurface"
        border="1px solid"
        position="relative"
        alignItems="center"
        justifyContent="center"
        onClick={handleCollapse}
        borderColor="outlineVariant"
        nHover={{
          transition: 'all 300ms ease-in-out',
          backgroundColor: `${colors.primary}14`,
        }}
      >
        <Motion
          display="flex"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          transform={!isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'}
        >
          <ChevronLeftSVG
            width="100%"
            height="100%"
            maxWidth="0.625rem"
            maxHeight="0.625rem"
          />
        </Motion>
        {isCollapsed && !isOpen && (
          <Box
            mt="-0.5rem"
            right="-0.3rem"
            bottom="-0.3rem"
            position="absolute"
          >
            <TooltipWrapper
              bg="surface"
              border="1px solid"
              width="max-content"
              tooltipPosition="right"
              borderColor="outlineVariant"
              tooltipContent={
                <Typography
                  size="medium"
                  variant="label"
                  color="onSurface"
                  textTransform="capitalize"
                >
                  {checkpoint}
                </Typography>
              }
            >
              <Checkpoint withoutInfo />
            </TooltipWrapper>
          </Box>
        )}
      </Box>
      {(!isCollapsed || isOpen) && (
        <Box mx="auto">
          <Checkpoint />
        </Box>
      )}
    </Motion>
  );
};

export default SidebarCollapseButton;
