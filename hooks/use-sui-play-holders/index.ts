import useSWR from 'swr';

interface SuiPlayRawNFT {
  owner: string;
  isMythic: boolean;
}

interface SuiPlayHolders {
  holders: Record<'The Mythics' | 'The Exalted' | 'All', ReadonlyArray<string>>;
  lastUpdateAt: number;
}

export const useSuiPlayHolders = () =>
  useSWR<SuiPlayHolders>('sui-play-holders', async () => {
    const data = await fetch(
      'https://interest-protocol.github.io/public/sui/sui-play-holders.json'
    ).then((res) => res.json());

    const [theMythics, theExalted] = (
      data.holders as ReadonlyArray<SuiPlayRawNFT>
    ).reduce(
      ([mythics, exalted], curr) =>
        curr.isMythic
          ? [[...mythics, curr.owner], exalted]
          : [mythics, [...exalted, curr.owner]],
      [[], []] as [ReadonlyArray<string>, ReadonlyArray<string>]
    );

    return {
      holders: {
        'The Mythics': theMythics,
        'The Exalted': theExalted,
        All: [...theMythics, ...theExalted],
      },
      lastUpdateAt: data.lastUpdateAt,
    };
  });
