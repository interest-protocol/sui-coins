import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PlusSVG, SearchSVG } from '@/svg';

import { ActionGroupProps } from './header.types';

const ActionGroup: FC<ActionGroupProps> = ({ gotoPool, showSearchView }) => (
  <>
    <Box
      display={['none', 'none', 'none', 'flex']}
      gap="0.25rem"
      alignItems="center"
    >
      <TextField
        Prefix={
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        }
        placeholder="Search"
        fieldProps={{
          width: '13rem',
        }}
      />
      <Button
        py="0.725rem"
        variant="tonal"
        bg="rgba(0, 0, 0, 0.08)"
        onClick={gotoPool}
        SuffixIcon={
          <Box
            display="flex"
            width="1.25rem"
            height="1.25rem"
            justifyContent="center"
          >
            <PlusSVG maxHeight="1.125rem" maxWidth="1.125rem" width="100%" />
          </Box>
        }
      >
        Create Pool
      </Button>
    </Box>
    <Box display={['flex', 'flex', 'flex', 'none']} gap="0.25rem">
      <Button
        isIcon
        variant="tonal"
        height="1.5rem"
        width="1.5rem"
        bg="rgba(0, 0, 0, 0.08)"
        onClick={showSearchView}
      >
        <Box height="1.25rem" width="1.25rem">
          <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
        </Box>
      </Button>
      <Button
        isIcon
        variant="tonal"
        height="1.5rem"
        width="1.5rem"
        bg="rgba(0, 0, 0, 0.08)"
        onClick={gotoPool}
      >
        <Box height="1.25rem" width="1.25rem">
          <PlusSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
        </Box>
      </Button>
    </Box>
  </>
);

export default ActionGroup;
