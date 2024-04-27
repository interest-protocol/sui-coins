import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { DefaultAssetSVG } from '@/svg';
import { noop } from '@/utils';

const IncineratorTableBody: FC = () => (
  <Box as="tr" key={v4()}>
    <Typography
      as="th"
      key={v4()}
      size="small"
      color="outline"
      variant="label"
      textAlign="left"
    >
      <Checkbox defaultValue={false} onClick={noop} label="" />
    </Typography>
    <Typography
      pr="m"
      my="2xs"
      as="td"
      gap="s"
      size="small"
      display="flex"
      variant="label"
      alignItems="center"
    >
      <Box
        bg="black"
        color="white"
        display="flex"
        width="2.2rem"
        height="2.2rem"
        borderRadius="xs"
        alignItems="center"
        justifyContent="center"
      >
        <DefaultAssetSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
      </Box>
      <Box>
        <Typography size="medium" variant="body" whiteSpace="nowrap">
          SUI
        </Typography>
        <Typography
          as="span"
          size="small"
          variant="body"
          color="outline"
          whiteSpace="nowrap"
        >
          Type: Coin
        </Typography>
      </Box>
    </Typography>
    <Typography pr="m" as="td" size="small" variant="body" whiteSpace="nowrap">
      1111
    </Typography>
    <Typography pr="m" as="td" size="small" variant="label">
      <Typography
        p="xs"
        as="span"
        size="medium"
        variant="label"
        borderRadius="full"
      >
        3.4B
      </Typography>
    </Typography>
  </Box>
);

export default IncineratorTableBody;
