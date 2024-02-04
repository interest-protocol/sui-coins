import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { NFT_MAP } from '@/constants/nft';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useModal } from '@/hooks/use-modal';
import { NFTCollection } from '@/interface';
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
  const airdropList = useWatch({ control, name: 'airdropList' });
  const method = useWatch({ control, name: 'method' }) as 'nft' | 'coin';

  const onSelectToken = (asset: CoinObject) => {
    setValue('asset', asset);
    setValue('airdropList', null);
  };

  const onSelectNFT = (asset: NFTCollection) => {
    setValue('asset', asset);
    setValue(
      'airdropList',
      asset.holders.map((holder) => ({
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

  const nftMetadata = NFT_MAP[(asset as NFTCollection)?.collectionId];

  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Typography variant="body" size="large">
        3. Who to send & amount
      </Typography>
      <Box>
        <Typography variant="body" size="small">
          Choose addresses with this type of {method}
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
                  {/* <TokenIcon
                    network={network}
                    tokenId={
                      network === Network.MAINNET ? asset.type : asset.symbol
                    }
                  /> */}
                  <img
                    width="100%"
                    src={nftMetadata.img}
                    alt={nftMetadata.name}
                  />
                </Box>
              )}
              <Typography variant="body" size="large" flex="1" as="span">
                {asset
                  ? method === 'nft'
                    ? nftMetadata.name
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
        <Typography variant="body" size="small" color="#000000A3">
          There are {airdropList?.length} addresses with this coin
        </Typography>
      </Box>
      <Box>
        <Typography variant="body" size="small">
          Enter Amount to Send
        </Typography>
        <AirdropCommonAmountTextField />
      </Box>
    </Box>
  );
};

export default AirdropNftCoinsMethod;
