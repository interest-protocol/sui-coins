import { Motion, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { toPairs } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { DISPLAY_NETWORK, wrapperVariants } from '@/constants';
import { useNetwork } from '@/context/network';
import { NetworkDropDownMenuProps } from '@/interface';
import { SuiLogoSVG } from '@/svg';

import OptionItem from './menu-options/option-item';

const NetworkDropDownMenu: FC<NetworkDropDownMenuProps> = ({ isOpen }) => {
  const { selectNetwork } = useSuiClientContext();
  const network = useNetwork();

  return (
    <Motion
      right="0"
      top="3rem"
      zIndex={4}
      width="14.5rem"
      border="1px solid"
      borderRadius="1rem"
      position="absolute"
      bg="lowestContainer"
      variants={wrapperVariants}
      textTransform="capitalize"
      borderColor="outlineVariant"
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      pointerEvents={isOpen ? 'auto' : 'none'}
      boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
    >
      {toPairs(DISPLAY_NETWORK).map(([networkKey, displayNetwork]) => (
        <OptionItem
          key={v4()}
          selected={networkKey === network}
          onClick={() => selectNetwork(networkKey)}
        >
          <SuiLogoSVG maxWidth="2rem" maxHeight="2rem" />
          <Typography variant="body" size="large">
            Sui {displayNetwork}
          </Typography>
        </OptionItem>
      ))}
    </Motion>
  );
};

export default NetworkDropDownMenu;
