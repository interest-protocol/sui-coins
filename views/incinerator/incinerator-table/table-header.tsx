import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FilterArrowDownSVG } from '@/svg';
import { noop } from '@/utils';

import { TableHeaderData } from '../incinerator.data';

const IncineratorTableHeader: FC = () => (
  <Box as="thead" m="xs">
    <Box as="tr">
      <Typography as="th" key={v4()} size="small" variant="label" width="1%">
        <Checkbox defaultValue={false} onClick={noop} label="" />
      </Typography>
      {TableHeaderData.map((item) => (
        <Typography
          as="th"
          key={v4()}
          size="small"
          color="outline"
          variant="headline"
          textAlign="left"
          pr="xl"
          cursor="pointer"
        >
          <Box display="flex" alignItems="center" gap="xs">
            <Typography variant="headline" size="small" fontSize="12px">
              {item}
            </Typography>
            <Box width="0.5rem" height="0.5rem" display="flex" color="black">
              <FilterArrowDownSVG
                maxHeight="100%"
                maxWidth="100%"
                width="100%"
              />
            </Box>
          </Box>
        </Typography>
      ))}
      <Box as="th" width="12%" />
    </Box>
  </Box>
);

export default IncineratorTableHeader;
