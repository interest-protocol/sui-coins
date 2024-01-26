import { Box, Button, Form, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CreatePoolFormSelectDex from './find-pool-form-select-dex';
import CreatePoolFormSelectToken from './find-pool-form-select-token';

const FindPoolForm: FC = () => (
  <Form
    p="xl"
    gap="l"
    mx="auto"
    width="100%"
    display="flex"
    borderRadius="xs"
    overflow="hidden"
    bg="lowestContainer"
    flexDirection="column"
  >
    <Box display="flex" flexDirection="column" gap="4xl">
      <Box display="flex" flexDirection="column">
        <Typography variant="body" size="large" pb="xl">
          1. Choose in which DEX you want your pool
        </Typography>
        <CreatePoolFormSelectDex />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="body" size="large" pb="xl">
          2. Select the pair
        </Typography>
        <Box display="flex" flexDirection="column" gap="m">
          <Box display="flex" flexDirection="column" gap="xs">
            <Typography size="small" variant="body">
              Token A
            </Typography>
            <CreatePoolFormSelectToken name="tokenA" />
          </Box>
          <Box display="flex" flexDirection="column" gap="xs">
            <Typography size="small" variant="body">
              Token B
            </Typography>
            <CreatePoolFormSelectToken name="tokenB" />
          </Box>
        </Box>
      </Box>
    </Box>
    <Box display="flex" justifyContent="center">
      <Button type="submit" variant="filled" borderRadius="xs" py="s">
        Find pool
      </Button>
    </Box>
  </Form>
);

export default FindPoolForm;
