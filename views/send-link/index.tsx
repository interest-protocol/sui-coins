import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { ZkSendLink } from '@mysten/zksend';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import Layout from '@/components/layout';
import { useNetwork } from '@/context/network';
import { ZkSendLinkData } from '@/interface';
import { ErrorSVG } from '@/svg';

const SendLink: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const network = useNetwork();
  const { data, isLoading, error } = useSWR<ZkSendLinkData>(
    `${id}-${network}`,
    () =>
      fetch(`/api/v1/zksend?network=${network}&id=${id}`).then((response) =>
        response.json?.()
      )
  );

  console.log(router);

  useEffect(() => {
    if (data) ZkSendLink.fromUrl(data.link).then(console.log);
  }, [data]);

  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(location.href);
    toast('Copied to clipboard');
  };

  return (
    <Layout title="Claim link">
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
          Share your Claim Link
        </Typography>
        <Typography
          size="large"
          variant="body"
          color="outline"
          textAlign="center"
        >
          The claim is ready to be shared.
        </Typography>
        <Box
          p="2xl"
          width="12rem"
          height="12rem"
          display="flex"
          borderRadius="xs"
          overflow="hidden"
          border="1px solid"
          alignItems="center"
          justifyContent="center"
          borderColor="outlineVariant"
        >
          {data ? (
            <img
              alt="QR Code"
              src={`https://api.qrserver.com/v1/create-qr-code?data=${location.href}&size=120x120`}
            />
          ) : isLoading ? (
            <ProgressIndicator variant="loading" size={32} />
          ) : (
            <ErrorSVG maxWidth="4rem" maxHeight="4rem" width="100%" />
          )}
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            variant="filled"
            onClick={handleCopyLink}
            disabled={!data || isLoading || error}
          >
            Copy Link
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default SendLink;
