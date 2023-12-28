import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { AccordionItemProps } from '../sidebar.types';

const AccordionItem: FC<AccordionItemProps> = ({ name, path }) => {
  const { push, asPath } = useRouter();

  const goToPath = () => {
    if (path.startsWith('https://'))
      return window.open(path, '_blank')?.focus();

    push(path);
  };

  return (
    <Box
      mx="auto"
      width="100%"
      display="flex"
      cursor="pointer"
      borderRadius="m"
      onClick={goToPath}
      nHover={{ color: 'primary' }}
      transition="all 350ms ease-in-out"
      color={asPath === path ? 'primary' : 'onSurface'}
    >
      <Typography
        ml="l"
        py="s"
        pl="xl"
        size="small"
        variant="label"
        borderLeft="1px solid"
        textTransform="capitalize"
        borderColor="outlineVariant"
      >
        {name}
      </Typography>
    </Box>
  );
};

export default AccordionItem;
