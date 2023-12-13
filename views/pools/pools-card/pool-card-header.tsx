import { Box, Button, Tag, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import ArrowObliqueSVG from '../../../components/svg/arrow-oblique';
import { PoolCardHeaderProps } from './pool-card.types';

const PoolCardHeader: FC<PoolCardHeaderProps> = ({ name, url, Logo }) => {
  const { push } = useRouter();
  const handlePoolCardDetails = () => push(url);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Tag PrefixIcon={Logo} size="small" variant="outline" height="1.5rem">
        <Typography
          display="flex"
          flexDirection="row"
          fontFamily="Proto"
          size="small"
          variant="body"
        >
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
