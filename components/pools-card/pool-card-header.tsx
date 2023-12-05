import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import IPXRoundedSVG from '../svg/ipx-rounded';
import Telegram from '../svg/Telegram';

const PoolCardHeader: FC = () => {
  const { push } = useRouter();
  const handlePoolCardDetails = () => push('/');
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        whiteSpace="nowrap"
        bg="blue"
      >
        <Tag PrefixIcon={IPXRoundedSVG} size="small" variant="outline">
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
            Interest
          </Typography>
        </Tag>
        <Box
          onClick={handlePoolCardDetails}
          className="arrow-wrapper"
          height="1.5rem"
          width="1.5rem"
          textDecoration="none"
          cursor="pointer"
          opacity="0"
          bg="green"
        >
          <Telegram maxHeight="1.5rem" maxWidth="1.5rem" />
        </Box>
      </Box>
    </Box>
  );
};

export default PoolCardHeader;
