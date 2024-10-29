import data from './data.json';

interface SuiPlayRawNFT {
  owner: string;
  content: {
    id: string;
    tier: string;
    name: string;
    order: string;
    datetime: string;
    payment_chain: string;
    payment_tx_digest: string;
  };
}

const [THE_MYTHICS, THE_EXALTED] = (
  data as ReadonlyArray<SuiPlayRawNFT>
).reduce(
  ([mythics, exalted], curr) =>
    curr.content.tier === 'The Mythics'
      ? [[...mythics, curr.owner], exalted]
      : [mythics, [...exalted, curr.owner]],
  [[], []] as [ReadonlyArray<string>, ReadonlyArray<string>]
);

export const SUIPLAY_HOLDERS = {
  'The Mythics': THE_MYTHICS,
  'The Exalted': THE_EXALTED,
  All: [...THE_MYTHICS, ...THE_EXALTED],
};

export const SUIPLAY_LAST_UPDATE_AT = 1730218948227;
