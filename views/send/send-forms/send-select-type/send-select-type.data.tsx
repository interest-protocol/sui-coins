import { SendType } from '../../send.data';
import BulkSendIllustration from './send-select-type-illustrations/bulk-send';
import SimpleSendIllustration from './send-select-type-illustrations/simple-send';

export const SEND_SELECT_TYPE_CARDS = [
  {
    key: SendType.Link,
    title: 'Simple link',
    illustration: <SimpleSendIllustration />,
    description: 'Send multiple item with one claimable link',
  },
  {
    key: SendType.Bulk,
    title: 'Bulk link',
    illustration: <BulkSendIllustration />,
    description: 'Create Multiple links to send. Only available for Coins',
  },
];
