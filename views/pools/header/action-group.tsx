import { Box, Button, Theme, useTheme } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { SearchSVG } from '@/svg';

const ActionGroup: FC = () => {
  const { colors } = useTheme() as Theme;
  const { push } = useRouter();

  // TODO: @MarioBatalha call ur modal here
  const handleFindPool = () => push(Routes[RoutesEnum.Pools]);

  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <Button
          py="s"
          color="onSurface"
          variant="tonal"
          bg="#ffffff14"
          onClick={handleFindPool}
          nHover={{
            bg: `${colors.primary}14`,
          }}
          SuffixIcon={
            <Box
              ml="m"
              display="flex"
              width="1rem"
              height="1rem"
              justifyContent="center"
            >
              <SearchSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        >
          find pool
        </Button>
      </Box>
      <Box gap="xs" display={['flex', 'flex', 'flex', 'none']}>
        <Button
          isIcon
          width="1.5rem"
          bg="onSurface"
          color="surface"
          height="1.5rem"
          variant="filled"
          nHover={{
            bg: 'outline',
          }}
          onClick={handleFindPool}
        >
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default ActionGroup;
