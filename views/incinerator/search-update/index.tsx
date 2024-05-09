import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { RefreshSVG } from '@/svg';

const SearchUpdate: FC = () => {
  return (
    <Button
      isIcon
      mx="s"
      variant="text"
      width="1.5rem"
      height="1.5rem"
      bg="transparent"
      color="onSurface"
      border="1px solid"
      borderRadius="full"
      alignItems="center"
      position="relative"
      borderColor="outlineVariant"
      disabled={false}
      nHover={{
        background: 'lowContainer',
      }}
      nActive={{
        background: 'transparent',
        color: 'onSurface',
      }}
    >
      <RefreshSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
    </Button>
  );
};

export default SearchUpdate;
