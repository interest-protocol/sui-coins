import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { AnimatePresence, easeInOut } from 'framer-motion';
import { useRouter } from 'next/router';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { CaretUpSVG } from '@/svg';
import { noop } from '@/utils';

import AccordionItem from '../layout/sidebar/menu-item/accordion-item';
import { MenuMobileItemProps } from './menu.types';

const BOX_ID = 'Mobile-Menu-List-Item-';

const MobileMenuListItem: FC<MenuMobileItemProps> = ({
  name,
  path,
  Icon,
  index,
  disabled,
  accordionList,
}) => {
  const { asPath, push } = useRouter();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const closeAccordion = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == `${BOX_ID}${index}`) ||
      event
        ?.composedPath()
        ?.some((node: any) => node?.id == `${BOX_ID}${index}`)
    )
      return;

    setIsAccordionOpen(false);
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeAccordion);

  const getSuffixIcon = () =>
    accordionList && (
      <Box display="flex" justifyContent="flex-end" pr="s">
        <Motion
          transform={isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
          display="flex"
          width="1.25rem"
          height="1.25rem"
          whileTap={{
            scale: 0.97,
            transition: { duration: 0.05, ease: easeInOut },
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.05, ease: easeInOut },
          }}
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
          transition={{ duration: 0.5 }}
        >
          <CaretUpSVG
            width="0.469rem"
            height="0.469rem"
            maxWidth="1.25rem"
            maxHeight="1.25rem"
          />
        </Motion>
      </Box>
    );
  return (
    <Box
      id={`${BOX_ID}${index}`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={connectedBoxRef}
      onClick={() => {
        accordionList && setIsAccordionOpen(not);
      }}
    >
      <Box>
        <Box
          p="l"
          key={v4()}
          display="flex"
          borderRadius="xs"
          color="onSurface"
          opacity={disabled ? 0.7 : 1}
          cursor={disabled ? 'not-allowed' : 'pointer'}
          height="2.2rem"
          bg={asPath === path ? 'highestContainer' : undefined}
          onClick={
            disabled || !!accordionList || !path ? noop : () => push(path)
          }
          nHover={{
            bg: !disabled && 'highestContainer',
          }}
          justifyContent="space-between"
          alignItems="center"
          mx="auto"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Icon maxHeight="1rem" maxWidth="1rem" width="1.2rem" />
            <Typography
              ml="s"
              size="small"
              variant="title"
              width="max-content"
              textTransform="capitalize"
            >
              {name}
            </Typography>
          </Box>
          {getSuffixIcon()}
        </Box>
      </Box>
      {accordionList && (
        <AnimatePresence>
          {isAccordionOpen && (
            <Motion
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {accordionList.map((item) => (
                <AccordionItem key={v4()} {...item} />
              ))}
            </Motion>
          )}
        </AnimatePresence>
      )}
    </Box>
  );
};

export default MobileMenuListItem;
