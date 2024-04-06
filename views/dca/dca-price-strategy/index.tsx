import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { InfoCircleSVG } from '@/svg';

const DCAPriceStrategy: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box px="l">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          gap="xs"
          size="medium"
          variant="body"
          display="flex"
          lineHeight="100%"
        >
          Price Strategy
          <Box as="span">
            <InfoCircleSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Box>
        </Typography>
        <Box>
          <ToggleButton
            name="priceStrategy"
            defaultValue={open}
            onChange={() => setOpen(not)}
          />
        </Box>
      </Box>
      {open && 'Open'}
    </Box>
  );
};

export default DCAPriceStrategy;
