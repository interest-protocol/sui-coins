import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ArrowObliqueSVG from '../svg/arrow-oblique';
import IPX from '../svg/ipx';
import { PoolCardProps } from './pools-card.types';

const PoolCardHeader: FC<PoolCardProps> = ({ protocol }) => {
  return (
    <Box width="100%" height="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Tag
          PrefixIcon={() => <IPX maxHeight="1rem" maxWidth="1rem" />}
          size="small"
          variant="outline"
        >
          <Typography
            display="flex"
            flexDirection="row"
            fontFamily="Proto"
            lineHeight="1rem"
            fontSize="0.75rem"
            textDecoration="upper-case"
            marginLeft="0.3rem"
            size={'small'}
            variant={'body'}
          >
            {protocol}
          </Typography>
        </Tag>
        <Box
          as="button"
          display="flex"
          alignItems="center"
          width="1.5rem"
          height="1.5rem"
          bg="transparent"
          border="none"
          cursor="pointer"
          opacity="0"
          className="arrow-wrapper"
        >
          <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" />
        </Box>
      </Box>
    </Box>
  );
};

export default PoolCardHeader;
