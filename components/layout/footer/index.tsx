import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DiscordSVG, GithubSVG, IPXSVG, TelegramSVG, XSVG } from '@/svg';

const Footer: FC = () => (
  <Box
    mx="3xl"
    as="footer"
    display="flex"
    color="onSurface"
    flexDirection="column"
    textTransform="uppercase"
  >
    <Box textAlign="center" my="2xl">
      <Typography variant="label" size="medium">
        Follow us
      </Typography>
      <Box display="flex" gap="xs" justifyContent="center" mt="s">
        <a
          href="https://discord.com/invite/interestprotocol"
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
            nHover={{ borderColor: 'outline' }}
          >
            <DiscordSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        </a>
        <a
          href="https://github.com/interest-protocol/"
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
            nHover={{ borderColor: 'outline' }}
          >
            <GithubSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        </a>
        <a
          href="https://t.me/interestprotocol"
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
            nHover={{ borderColor: 'outline' }}
          >
            <TelegramSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        </a>
        <a href="https://x.com/IPXMovement" target="_blank" rel="noreferrer">
          <Box
            p="xs"
            width="2.5rem"
            height="2.5rem"
            border="1px solid"
            borderRadius="full"
            borderColor="outlineVariant"
            nHover={{ borderColor: 'outline' }}
          >
            <XSVG maxHeight="100%" maxWidth="100%" height="100%" />
          </Box>
        </a>
      </Box>
    </Box>
    <Box
      py="m"
      display="flex"
      borderTop="1px solid"
      justifyContent="center"
      borderColor="outlineVariant"
    >
      <a href="https://interestprotocol.com" target="_blank" rel="noreferrer">
        <IPXSVG maxHeight="2.5rem" maxWidth="2.5rem" width="100%" />
      </a>
    </Box>
  </Box>
);

export default Footer;
