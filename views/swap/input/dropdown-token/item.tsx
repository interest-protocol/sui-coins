import { Box, ListItem, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { BNBSVG } from '@/svg';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const DropdownTokenItem: FC = () => {
  return (
    <Motion
      alignItems="center"
      variants={itemVariants}
      initial={itemVariants.closed}
      justifyContent="space-between"
      cursor={'pointer'}
      nHover={{
        bg: 'rgba(0, 83, 219, 0.08)',
      }}
    >
      <ListItem
        px="xs"
        title="BNB"
        width="100%"
        nHover={{
          bg: 'rgba(0, 83, 219, 0.08)',
        }}
        PrefixIcon={
          <Box
            width="1.5rem"
            height="1.5rem"
            bg="#000"
            color="#fff"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
          >
            <BNBSVG maxWidth="1.125rem" maxHeight="1.125rem" width="100%" />
          </Box>
        }
      />
    </Motion>
  );
};

export default DropdownTokenItem;
