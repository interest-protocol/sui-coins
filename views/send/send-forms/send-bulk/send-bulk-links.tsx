import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import { ErrorSVG } from '@/svg';

const SendBulkLinks: FC<{ links: ReadonlyArray<string> }> = ({ links }) => {
  const copyLinks = () => {
    navigator.clipboard.writeText(links.join(`\n`));

    toast('Links copied to clipboard');
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);

    toast('Link copied to clipboard');
  };

  const downloadURL = URL.createObjectURL(
    new Blob([links.join(`\n`)], { type: 'text/plain' })
  );

  return (
    <Box
      p="2xl"
      gap="xl"
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="s"
      alignItems="center"
      maxWidth="39.75rem"
      bg="lowestContainer"
      flexDirection="column"
      px={['2xs', 'xl', 'xl', '7xl']}
    >
      <Typography variant="title" size="large" textAlign="center">
        Share the claim Links
      </Typography>
      <Typography
        size="large"
        variant="body"
        color="outline"
        textAlign="center"
      >
        The claim links are ready to be shared.
      </Typography>
      <Box
        p="s"
        gap="xs"
        display="flex"
        overflow="auto"
        maxWidth="100%"
        maxHeight="25rem"
        borderRadius="xs"
        border="1px solid"
        flexDirection="column"
        borderColor="outlineVariant"
      >
        {links.map((link, index) => (
          <Box
            gap="m"
            key={v4()}
            display="grid"
            cursor="pointer"
            alignItems="center"
            onClick={() => copyLink(link)}
            gridTemplateColumns="2rem auto"
            nHover={{ bg: 'lowContainer' }}
          >
            <Typography
              size="medium"
              variant="label"
              color="outline"
              textAlign="right"
            >
              {index + 1}
            </Typography>
            <Typography variant="body" size="medium" textOverflow="ellipsis">
              {link}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        p="l"
        gap="l"
        width="100%"
        display="flex"
        borderRadius="s"
        border="1px solid"
        borderColor="error"
      >
        <ErrorSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
        <Box display="flex" flexDirection="column" gap="xs">
          <Typography variant="title" size="medium" color="error">
            Save your link before leaving this page
          </Typography>
          <Typography variant="body" size="small" color="outline">
            Be sure to share or save your link before leaving this page,
            otherwise, the funds will be lost
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" gap="m">
        <Button variant="filled" onClick={copyLinks}>
          Copy Links
        </Button>
        <a href={downloadURL} download="zkSend-Bulk-Links.txt">
          <Button variant="outline">Download</Button>
        </a>
      </Box>
    </Box>
  );
};

export default SendBulkLinks;
