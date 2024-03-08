import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { PlusSVG, SearchSVG } from '@/svg';

import { ActionGroupProps } from './header.types';

const ActionGroup: FC<ActionGroupProps> = ({ showSearchView }) => {
  const { push } = useRouter();

  // TODO: Change this route to findPool when this page will be created
  const handleCreatePool = () => push(Routes[RoutesEnum.PoolCreate]);

  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <TextField
          Prefix={
            <Box height="1.25rem" width="1.25rem">
              <SearchSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
          placeholder="Search"
          fieldProps={{
            width: '13rem',
            borderRadius: 'xs',
          }}
        />
        <Button
          py="s"
          bg="onSurface"
          color="surface"
          variant="filled"
          onClick={handleCreatePool}
          nHover={{
            backgroundColor: 'onPrimaryContainer',
          }}
          SuffixIcon={
            <Box
              display="flex"
              width="0.875rem"
              height="0.875rem"
              justifyContent="center"
            >
              <PlusSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        >
          Create pool
        </Button>
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']} gap="xs">
        <Button
          isIcon
          width="1.5rem"
          bg="onSurface"
          color="surface"
          height="1.5rem"
          variant="filled"
          nHover={{
            backgroundColor: 'outline',
          }}
          onClick={showSearchView}
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
