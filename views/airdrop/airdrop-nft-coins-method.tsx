import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { ChevronRightSVG } from '@/svg';

import { IAirdropForm } from './airdrop.types';
import { renderCoinIcon } from './airdrop-custome-amount-method';
import { itemsCoins, itemsNFT } from './airdrop-mockups/data';
import AirdropSelectItemsModal, { IItem } from './airdrop-select-items-modal';

interface AirdropNftCoinsMethodProps {
  method: string;
}

const AirdropNftCoinsMethod: FC<AirdropNftCoinsMethodProps> = ({ method }) => {
  const [isSelectNFTModalOpen, setIsSelectNFTModalOpen] = useState(false);
  const [selectedNft, setSelectedNft] = useState<IItem | null>(null);

  const { control } = useFormContext<IAirdropForm>();
  const { network } = useNetwork();
  const token = useWatch({ control, name: 'token' });

  const items =
    {
      NFT: itemsNFT,
      Coins: itemsCoins,
    }[method] || [];

  useEffect(() => {
    setSelectedNft(null);
  }, [method]);

  const handleCloseSelectNFTModal = () => {
    setIsSelectNFTModalOpen(false);
  };

  const handleOpenSelectNFTModal = () => {
    setIsSelectNFTModalOpen(true);
  };

  const handleNftSelect = (nft: IItem) => {
    setSelectedNft(nft);
  };

  const labelType =
    {
      NFT: 'NFT',
      Coins: 'Coin',
    }[method] || null;

  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Box>
        <Typography variant="body" size="large">
          3. Who to send & amount
        </Typography>
      </Box>
      <Box>
        <Typography variant="body" size="small">
          Choose adresses with this type of {labelType}
        </Typography>
        <Box py="xs">
          <Box
            p="xs"
            gap="xs"
            display="flex"
            minWidth="8rem"
            cursor="pointer"
            borderRadius="xs"
            border="1px solid"
            alignItems="center"
            borderColor="outlineVariant"
            onClick={handleOpenSelectNFTModal}
          >
            <Box
              bg="#6FBCF0"
              display="flex"
              width="2.5rem"
              height="2.5rem"
              alignItems="center"
              borderRadius="0.5rem"
              color="lowestContainer"
              justifyContent="center"
            >
              {/* {renderCoinIcon(token, network)} */}
            </Box>
            <Typography variant="label" size="large" flex="1" as="span">
              {/* {token ? getSymbol(token.symbol, token.type) : '---'} */}
              {selectedNft?.name}
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
        <Typography variant="body" size="small" color="#000000A3">
          There are 500 addresses with this coin
        </Typography>
      </Box>
      <Box>
        <Typography variant="body" size="small">
          Enter Amount to Send
        </Typography>
        <Box
          my="xs"
          gap="2xs"
          minWidth="8rem"
          cursor="pointer"
          borderRadius="xs"
          border="1px solid"
          alignItems="center"
          borderColor="outlineVariant"
        >
          <Box display="flex" alignItems="center" width="100%">
            <Box
              height="2.5rem"
              width="2.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                bg="#6FBCF0"
                display="flex"
                width="1.5rem"
                p="0.5rem"
                minWidth="1.5rem"
                minHeight="1.5rem"
                height="1.5rem"
                borderRadius="50%"
                alignItems="center"
                color="lowestContainer"
                justifyContent="center"
              >
                {renderCoinIcon(token, network)}
              </Box>
            </Box>
            <TextField
              placeholder="000"
              fieldProps={{
                flex: 1,
                border: 'none',
                borderRadius: '0.5rem',
              }}
            />
          </Box>
        </Box>
      </Box>
      <AirdropSelectItemsModal
        method={method}
        items={items}
        onNFTSelect={handleNftSelect}
        isOpen={isSelectNFTModalOpen}
        onClose={handleCloseSelectNFTModal}
      />
    </Box>
  );
};

export default AirdropNftCoinsMethod;
