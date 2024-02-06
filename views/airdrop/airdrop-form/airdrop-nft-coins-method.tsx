import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { NFT_MAP } from '@/constants/nft';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useModal } from '@/hooks/use-modal';
import { NFTCollection, NFTCollectionMetadata } from '@/interface';
import { ChevronRightSVG } from '@/svg';
import SelectNFTModal from '@/views/components/select-nft-modal';
import SelectTokenModal from '@/views/components/select-token-modal';

import { IAirdropForm } from '../airdrop.types';
import { getSymbol } from '../airdrop.utils';
import AirdropCommonAmountTextField from './airdrop-common-amount-text-field';

const AirdropNftCoinsMethod: FC = () => {
  const { setModal, handleClose } = useModal();

  const { control, setValue, getValues } = useFormContext<IAirdropForm>();

  const asset = useWatch({ control, name: 'asset' });
  const method = useWatch({ control, name: 'method' }) as 'nft';

  const onSelectToken = (asset: CoinObject) => {
    setValue('asset', asset);
    setValue('airdropList', null);
  };

  const onSelectNFT = async (collectionId: string) => {
    setValue('asset', NFT_MAP[collectionId]);

    const nft: NFTCollection = await fetch(
      `/api/v1/nft-collection?id=${collectionId}`
    ).then((res) => res.json());

    setValue(
      'airdropList',
      nft.holders.map((holder) => ({
        address: holder,
        amount: getValues('commonAmount'),
      }))
    );
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        {method === 'nft' ? (
          <SelectNFTModal closeModal={handleClose} onSelect={onSelectNFT} />
        ) : (
          <SelectTokenModal closeModal={handleClose} onSelect={onSelectToken} />
        )}
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Typography variant="body" size="large">
        3. Who to send & amount
      </Typography>
      <Box>
        <Typography variant="body" size="small">
          Choose an NFT collection
        </Typography>
        <Box py="xs">
          <Box position="relative">
            <Box
              p="xs"
              gap="xs"
              display="flex"
              minWidth="8rem"
              cursor="pointer"
              borderRadius="xs"
              border="1px solid"
              alignItems="center"
              onClick={openModal}
              borderColor="outlineVariant"
            >
              {asset && (
                <Box
                  bg="black"
                  color="white"
                  display="flex"
                  width="2.5rem"
                  height="2.5rem"
                  overflow="hidden"
                  borderRadius="xs"
                  alignItems="center"
                  justifyContent="center"
                >
                  <img
                    width="100%"
                    src={(asset as NFTCollectionMetadata).img}
                    alt={(asset as NFTCollectionMetadata).name}
                  />
                </Box>
              )}
              <Typography variant="body" size="large" flex="1" as="span">
                {asset
                  ? method === 'nft'
                    ? (asset as NFTCollectionMetadata).name
                    : getSymbol(
                        (asset as CoinObject).symbol,
                        (asset as CoinObject).type
                      )
                  : '---'}
              </Typography>
              <Box rotate="90deg">
                <ChevronRightSVG
                  maxWidth="1.5rem"
                  maxHeight="1.5rem"
                  width="100%"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="body" size="small">
          Enter amount to send per address
        </Typography>
        <AirdropCommonAmountTextField />
      </Box>
    </Box>
  );
};

export default AirdropNftCoinsMethod;
