import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { CoinsSVG, FileSVG, NftSVG, WalletSVG } from '@/svg';

interface IAirdropChooseMethod {
  onSelectMethod: (method: string) => void;
}

const METHODS_ICONS: Record<string, FC<SVGProps>> = {
  CSV: FileSVG,
  NFT: NftSVG,
  Coins: CoinsSVG,
  'Costume Amount': WalletSVG,
};

const AirdropChooseMethod: FC<IAirdropChooseMethod> = ({ onSelectMethod }) => {
  const handleSelectMethod = (method: string) => {
    onSelectMethod(method);
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" mb="m">
        <Typography variant="body" size="large">
          2. Choose Delivery Method
        </Typography>
      </Box>
      {['CSV', 'NFT', 'Coins', 'Costume Amount'].map((el, index) => {
        const Icon = METHODS_ICONS[el];

        return (
          <Box
            mb="2xs"
            padding="m"
            key={index}
            borderRadius="xs"
            nHover={{ bg: '#0053DB14', cursor: 'pointer' }}
          >
            <Box
              display="flex"
              borderRadius="xs"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" gap="m">
                <Box
                  color="black"
                  display="flex"
                  width="2.5rem"
                  height="2.5rem"
                  bg="#0053DB14"
                  minWidth="2.5rem"
                  minHeight="2.5rem"
                  alignItems="center"
                  borderRadius="full"
                  justifyContent="center"
                >
                  <Icon width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
                </Box>
                <Box>
                  <Typography fontWeight="700" variant="body" size="large">
                    {el}
                  </Typography>
                  <Typography variant="body" lineHeight="1.5rem" size="large">
                    copy what will happen if selected (1 line max)
                  </Typography>
                </Box>
              </Box>
              <RadioButton onClick={() => handleSelectMethod(el)} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AirdropChooseMethod;
