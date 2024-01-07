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
      display={showSearchView ? ['flex', 'flex', 'flex', 'none'] : 'none'}
      gap="m"
      width="100%"
      px="xs"
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
        variant="tonal"
        height="1.5rem"
        width="1.5rem"
        display="flex"
        my="auto"
        bg="rgba(0, 0, 0, 0.08)"
        onClick={handleClose}
      >
        <Box
          height="1rem"
          width="1rem"
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
