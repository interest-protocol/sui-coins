import { Box, Button, Tag, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import ArrowObliqueSVG from '../../../components/svg/arrow-oblique';
import { PoolCardHeaderProps } from './pool-card.types';

const PoolCardHeader: FC<PoolCardHeaderProps> = ({ name, url, Logo }) => {
  const { push } = useRouter();
  const handlePoolCardDetails = () => push(url);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Tag
        PrefixIcon={
          <Box
            display="flex"
            alignItems="center"
            borderRadius="full"
            color="lowestContainer"
            justifyContent="center"
          >
            {Logo}
          </Box>
        }
        size="small"
        variant="outline"
      >
        <Typography size="small" variant="label">
          {name}
        </Typography>
      </Tag>
      <Button
        variant="text"
        isIcon
        onClick={handlePoolCardDetails}
        opacity="0"
        className="arrow-wrapper"
      >
        <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
      </Button>
    </Box>
  );
};

export default PoolCardHeader;
