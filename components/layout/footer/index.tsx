import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { IPXSVG } from '@/svg';

import { SOCIAL_LINK } from './social-link.data';

const Footer: FC = () => {
  const IPXLandingPage = 'https://www.interestprotocol.com/';
  const date = new Date();
  const fullYear = date.getFullYear();
  return (
    <Box
      py="xl"
      gap="s"
      px="2xl"
      zIndex={0}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Link
        target="_blank"
        rel="noreferrer"
        href={IPXLandingPage}
        title={`Visit our landing page ${IPXLandingPage}`}
      >
        <Box
          height="2.5rem"
          width="2.5rem"
          nHover={{
            color: 'primary',
          }}
        >
          <IPXSVG maxHeight="100%" maxWidth="100%" width="100%" />
        </Box>
      </Link>
      <Box textAlign="center">
        <Typography variant="label" size="medium" textTransform="capitalize">
          &copy; Interest PROTOCOL UI {fullYear}
        </Typography>
      </Box>
      <Box
        gap="xs"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="label" size="medium">
          Follow us
        </Typography>
        <Box display="flex" gap="xs">
          {SOCIAL_LINK.map(({ title, pathname, Icon }) => {
            return (
              <Link
                key={v4()}
                href={pathname}
                title={`Visit our page on ${title}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  p="xs"
                  width="2.5rem"
                  height="2.5rem"
                  border="1px solid"
                  borderRadius="full"
                  borderColor="outlineVariant"
                  nHover={{
                    borderColor: 'outline',
                  }}
                >
                  <Icon maxHeight="100%" maxWidth="100%" width="100%" />
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
