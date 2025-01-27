import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { NFTCollection, NFTCollectionMetadata } from '@/interface';
import { ChevronRightSVG } from '@/svg';
import SelectNFTModal from '@/views/components/select-nft-modal';
import SelectTokenModal from '@/views/components/select-token-modal';

import { CoinObject } from '../../../../components/web3-manager/coins-manager/coins-manager.types';
import { IAirdropForm } from '../../airdrop.types';
import { getSymbol } from '../../airdrop.utils';

const AirdropNftMethod: FC = () => {
  const { nftsMap } = useWeb3();
  const { setModal, handleClose } = useModal();

  const { control, setValue, getValues } = useFormContext<IAirdropForm>();

  const asset = useWatch({ control, name: 'asset' });
  const method = useWatch({ control, name: 'method' }) as 'nft';

  const onSelectToken = (asset: CoinObject) => {
    setValue('asset', asset);
    setValue('airdropList', null);
  };

  const onSelectNFT = async (collectionId: string) => {
    setValue('asset', nftsMap[collectionId]);

    const nft: NFTCollection = await fetch(
      `/api/auth/v1/nft-collection?id=${collectionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .catch(console.log);

    const airdropList = nft.holders.map((address) => ({
      address,
      amount: BigNumber(getValues('commonAmount') || 0)
        .times(BigNumber(10).pow(getValues('token.decimals') || 0))
        .toString(),
    }));

    setValue('step', 2);
    setValue('airdropList', airdropList);
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
        2. Who to send & amount
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
                    style={{ width: '100%' }}
                    alt={(asset as NFTCollectionMetadata).name}
                    src={`/images/nft/${
                      (asset as NFTCollectionMetadata).id
                    }.webp`}
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
    </Box>
  );
};

export default AirdropNftMethod;
