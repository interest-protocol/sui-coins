import {
  Box,
  Modal,
  Tabs,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SearchSVG, TimesSVG } from '@/svg';

import NFTAvatar1 from './airdrop-mockups/svg/nft-avatar-1';

export interface IItem {
  name: string;
  abvreviation?: string;
  adresses: number;
}

interface AirdropSelectNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNFTSelect: (nft: IItem) => void;
  items: Array<IItem>;
  method: string;
}

interface ListItemProps extends IItem {
  onClick: (nft: string) => void;
}

const ListItem: FC<ListItemProps> = ({
  name,
  onClick,
  abvreviation,
  adresses,
}) => (
  <Box
    p="xl"
    display="flex"
    cursor="pointer"
    justifyContent="space-between"
    onClick={() => onClick(name)}
    nHover={{ backgroundColor: '#0053DB14' }}
  >
    <Box display="flex" alignItems="center">
      <Box mr="1rem" height="2.5rem" width="2.5rem" borderRadius="0.5rem">
        <NFTAvatar1 maxWidth="2.5rem" maxHeight="2.5rem" width="100%" />
      </Box>
      <Box>
        <Typography variant="body" size="large">
          {name}
        </Typography>
        <Typography color="#737478" variant="body" size="small">
          {abvreviation}
        </Typography>
      </Box>
    </Box>
    <Box textAlign="right">
      <Typography variant="body" size="medium" color="#1B1B1F">
        # of adresses
      </Typography>
      <Typography variant="body" size="large">
        {adresses}
      </Typography>
    </Box>
  </Box>
);

const AirdropSelectItemsModal: FC<AirdropSelectNFTModalProps> = ({
  isOpen,
  onClose,
  onNFTSelect,
  items,
  method,
}) => {
  const handleNftSelect = (nft: IItem) => {
    onNFTSelect(nft);
    onClose();
  };

  const labelType =
    {
      NFT: 'NFT',
      Coins: 'Token',
    }[method] || null;

  const placeholder =
    method === 'NFT' ? 'NFT name' : method === 'Coins' ? 'Sui' : '';

  return (
    <Modal custom isOpen={isOpen}>
      <Box
        maxWidth="95%"
        borderRadius="m"
        width="26.875rem"
        // minHeight="46rem"
        alignItems="center"
        display="inline-flex"
        justifyContent="space-between"
        flexDirection="column"
        boxShadow="dropShadow.2xl"
        backgroundColor="lowestContainer"
      >
        <Box width="100%">
          <Box
            p="xl"
            display="flex"
            alignItems="center"
            position="relative"
            justifyContent="center"
          >
            <Typography size="large" variant="title">
              Select {labelType}
            </Typography>
            <Box position="absolute" right="0" px="xl">
              <TimesSVG
                onClick={onClose}
                width="100%"
                maxWidth="1rem"
                maxHeight="1rem"
                cursor="pointer"
              />
            </Box>
          </Box>
          <Box
            p="xl"
            gap="xl"
            display="flex"
            width="100%"
            flexDirection="column"
            justifyContent="center"
          >
            <Box
              pt="2xs"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="body" size="small">
                Search {labelType}
              </Typography>
              <TextField
                placeholder={placeholder}
                nPlaceholder={{ color: '##C6C6CA' }}
                fieldProps={{
                  flex: 1,
                  borderRadius: '0.5rem',
                }}
                Prefix={
                  <SearchSVG
                    width="100%"
                    maxWidth="1.25rem"
                    maxHeight="1.25rem"
                  />
                }
              />
            </Box>
            <Tabs
              items={['ALL', 'FAVOURITE', 'SUGGESTED']}
              onChangeTab={() => {}}
              type="circle"
              px="1.77rem"
              width="100%"
            />
          </Box>
          <Box maxHeight="23rem" overflowY="scroll" bg="#B6C4FF33">
            {items.map((el, index) => (
              <ListItem
                abvreviation={el.abvreviation}
                adresses={el.adresses}
                onClick={() => handleNftSelect(el)}
                name={el.name}
                key={index}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AirdropSelectItemsModal;
