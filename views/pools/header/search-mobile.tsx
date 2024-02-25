import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SearchSVG, TimesSVG } from '@/svg';

import { SearchMobileProps } from './header.types';

const SearchMobile: FC<SearchMobileProps> = ({
  handleClose,
  showSearchView,
}) => {
  return (
    <Box
      gap="m"
      px="xs"
      width="100%"
      display={showSearchView ? ['flex', 'flex', 'flex', 'none'] : 'none'}
    >
      <TextField
        Prefix={
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        }
        placeholder="Search"
      />
      <Button
        isIcon
        my="auto"
        display="flex"
        width="1.5rem"
        variant="filled"
        height="1.5rem"
        onClick={handleClose}
      >
        <Box
          width="1rem"
          height="1rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TimesSVG maxHeight="0.8rem" maxWidth="0.8rem" width="100%" />
        </Box>
      </Button>
    </Box>
  );
};

export default SearchMobile;
