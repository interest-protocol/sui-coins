import { Box } from '@interest-protocol/ui-kit';
import { v4 } from 'uuid';

import Accordion from './components/accordion';
import {
  PoolDetailAccordionItemCoinProps,
  PoolDetailAccordionItemStandardProps,
} from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import {
  POOL_ORACLE_PRICE,
  POOL_PARAMETERS,
  POOL_PRICE,
} from './pool-info.data';

const AdvanceDetail = () => (
  <Box>
    <Accordion title={POOL_PARAMETERS.title}>
      {(
        POOL_PARAMETERS.data as Array<PoolDetailAccordionItemStandardProps>
      ).map(({ label, content, popupInfo, isCopyClipBoard }) => (
        <ItemStandard
          key={v4()}
          label={label}
          loading={false}
          content={content}
          isCopyClipBoard={isCopyClipBoard}
          popupInfo={popupInfo}
        />
      ))}
    </Accordion>
    <Accordion title={POOL_PRICE.title}>
      {(POOL_PRICE.data as Array<PoolDetailAccordionItemCoinProps>).map(
        ({ Icon, coinName, conversion, percentage, value }) => (
          <ItemToken
            key={v4()}
            Icon={Icon}
            value={value}
            coinName={coinName}
            percentage={percentage}
            conversion={conversion}
          />
        )
      )}
    </Accordion>
    <Accordion title={POOL_ORACLE_PRICE.title} noBorder>
      {(POOL_ORACLE_PRICE.data as Array<PoolDetailAccordionItemCoinProps>).map(
        ({ Icon, coinName, conversion, percentage, value }) => (
          <ItemToken
            key={v4()}
            Icon={Icon}
            value={value}
            coinName={coinName}
            percentage={percentage}
            conversion={conversion}
          />
        )
      )}
    </Accordion>
  </Box>
);

export default AdvanceDetail;
