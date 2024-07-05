import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { AccordionItemProps } from '../sidebar.types';

const AccordionItem: FC<AccordionItemProps> = ({
  name,
  path,
  disabled,
  beta,
}) => {
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
      borderRadius="m"
      onClick={goToPath}
      alignItems="center"
      opacity={disabled ? 0.3 : 1}
      justifyContent="space-between"
      transition="all 350ms ease-in-out"
      nHover={disabled ? {} : { color: 'primary' }}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      color={asPath === path ? 'primary' : 'onSurface'}
    >
      <Typography
        ml="l"
        py="s"
        pl="xl"
        size="medium"
        variant="label"
        borderLeft="1px solid"
        textTransform="capitalize"
        borderColor="outlineVariant"
      >
        {name}
      </Typography>
      {beta && (
        <Typography
          px="2xs"
          size="small"
          variant="label"
          border="1px solid"
          borderRadius="2xs"
          bg="errorContainer"
          color="onErrorContainer"
        >
          Beta
        </Typography>
      )}
    </Box>
  );
};

export default AccordionItem;
