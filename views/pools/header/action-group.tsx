import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SearchSVG } from '@/svg';

import { ActionGroupProps } from './header.types';

const ActionGroup: FC<ActionGroupProps> = ({ showSearchView }) => {
  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <TextField
          fontFamily="Proto"
          fontSize="0.875rem"
          placeholder="FIND POOL"
          fieldProps={{
            border: 'none',
            width: '10.7rem',
            borderRadius: 'xs',
            color: 'onSurface',
            bg: 'highestContainer',
          }}
          Suffix={
            <Box height="1.25rem" width="1.25rem">
              <SearchSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        />
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
