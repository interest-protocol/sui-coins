import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { IPXSVG } from '@/svg';

import { SOCIAL_LINK } from './social-link.data';

const Footer: FC = () => (
  <Box
    py="xl"
    gap="l"
    px="2xl"
    zIndex={0}
    as="footer"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    flexDirection={['column', 'column', 'column', 'row']}
  >
    <Link
      target="_blank"
      rel="noreferrer"
      title="Visit our landing page"
      href="https://www.interestprotocol.com/"
    >
      <Box height="3rem" width="3rem" nHover={{ color: 'primary' }}>
        <IPXSVG maxHeight="100%" maxWidth="100%" width="100%" />
      </Box>
    </Link>
    <Box gap="m" display="flex" flexDirection="column" alignItems="center">
      <Box
        gap="2xs"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="label" size="small">
          Follow us
        </Typography>
        <Box display="flex" gap="xs">
          {SOCIAL_LINK.map(({ title, pathname, Icon }) => (
            <Link
              key={v4()}
              href={pathname}
              target="_blank"
              rel="noreferrer"
              title={`Follow us on ${title}`}
            >
              <Box
                p="xs"
                width="2.5rem"
                height="2.5rem"
                border="1px solid"
                borderRadius="full"
                borderColor="outlineVariant"
                nHover={{ borderColor: 'outline' }}
              >
                <Icon maxHeight="100%" maxWidth="100%" width="100%" />
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
      <Typography variant="label" size="medium" textTransform="capitalize">
        &copy; Interest Protocol {new Date().getFullYear()}
      </Typography>
    </Box>
    <Box />
  </Box>
);

export default Footer;
