import { Motion } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const ItemWrapper: FC<
  PropsWithChildren<{ disabled?: boolean; onClick: () => void }>
> = ({ onClick, disabled, children }) => (
  <Motion
    py="m"
    gap="l"
    px="l"
    display="flex"
    minWidth="14rem"
    onClick={onClick}
    alignItems="center"
    variants={itemVariants}
    initial={itemVariants.closed}
    justifyContent="space-between"
    nHover={{
      bg: disabled ? 'unset' : '#86868614',
    }}
    cursor={disabled ? 'not-allowed' : 'pointer'}
  >
    {children}
  </Motion>
);

export default ItemWrapper;
