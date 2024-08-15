import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { HeartSVG, IPXSVG } from '@/svg';

import { SOCIAL_LINK } from './social-link.data';

const Footer: FC = () => {
  const IPXLandingPage = 'https://www.interestprotocol.com/';
  return (
    <Box display="flex" flexDirection="column" textTransform="uppercase">
      <Box
        gap="0.5rem"
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="label" size="medium">
          The website is maintained &
        </Typography>
        <Typography
          gap="2xs"
          size="medium"
          display="flex"
          variant="label"
          justifyContent="center"
        >
          Made with
          <HeartSVG maxHeight="1.125rem" maxWidth="1.125rem" width="100%" />
          By Interest Protocol
        </Typography>
      </Box>
      <Box
        my="2xl"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="label" size="medium">
          Follow us
        </Typography>
        <Box display="flex" gap="xs" justifyContent="center" mt="s">
          {SOCIAL_LINK.map(({ title, pathname, Icon }) => {
            return (
              <Link
                key={v4()}
                href={pathname}
                target="_blank"
                rel="noreferrer"
                title={`Visit our page on ${title}`}
              >
                <Box
                  p="xs"
                  width="2.5rem"
                  height="2.5rem"
                  border="1px solid"
                  borderRadius="full"
                  borderColor="outline"
                >
                  <Icon maxHeight="100%" maxWidth="100%" width="100%" />
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
      <Box
        py="m"
        display="flex"
        borderTop="1px solid"
        borderColor="outlineVariant"
        justifyContent="center"
      >
        <Link
          target="_blank"
          rel="noreferrer"
          href={IPXLandingPage}
          title="Visit our landing page"
        >
          <IPXSVG maxHeight="2.5rem" maxWidth="2.5rem" width="100%" />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
