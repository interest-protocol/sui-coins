import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { ObjectData } from '@/context/all-objects/all-objects.types';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { FilterArrowDownSVG } from '@/svg';

import { TableHeaderData } from '../incinerator.data';
import { IncineratorForm, IncineratorTabEnum } from '../incinerator.types';

const IncineratorTableHeader: FC = () => {
  const [checked, setChecked] = useState(false);
  const { control } = useFormContext<IncineratorForm>();
  const tab = useWatch({ control: control, name: 'tab' });
  const {
    objects,
    coinsMap,
    ownedNfts,
    otherObjects,
    coinsObjects,
    isFetchingCoinBalances,
  } = useWeb3();

  const { fields, replace } = useFieldArray({
    control,
    name: 'objects',
  });

  const displayObjects = {
    [IncineratorTabEnum.All]: objects,
    [IncineratorTabEnum.Coin]: coinsObjects,
    [IncineratorTabEnum.NFT]: ownedNfts,
    [IncineratorTabEnum.Other]: otherObjects,
  };

  const updateAssets = (active: boolean) => {
    replace(
      displayObjects[tab].map((object: ObjectData, index) => {
        const coin = coinsMap[(object.display as CoinObject)?.type];
        const editable = coin && coin.balance && !coin.balance.isZero();

        return {
          index,
          ...object,
          value: coin
            ? `${FixedPointMath.toNumber(coin.balance, coin.decimals)}`
            : '1',
          editable,
          isEditing: false,
          active,
        };
      })
    );
  };

  useEffect(() => {
    if (!isFetchingCoinBalances && !fields.length) updateAssets(checked);
  }, [isFetchingCoinBalances]);

  useEffect(() => {
    updateAssets(checked);
  }, [tab]);

  return (
    <Box as="thead">
      <Box as="tr">
        <Typography as="th" size="small" variant="label">
          <Checkbox
            label=""
            defaultValue={checked}
            onClick={() => {
              updateAssets(!checked);
              setChecked(!checked);
            }}
          />
        </Typography>
        {TableHeaderData.map((item) => (
          <Typography
            as="th"
            pr="xl"
            key={v4()}
            size="small"
            color="outline"
            cursor="pointer"
            textAlign="left"
            variant="headline"
          >
            <Box display="flex" alignItems="center" gap="xs">
              <Typography variant="headline" size="small" fontSize="12px">
                {item}
              </Typography>
              <Box width="0.5rem" height="0.5rem" display="flex" color="black">
                <FilterArrowDownSVG
                  maxHeight="100%"
                  maxWidth="100%"
                  width="100%"
                />
              </Box>
            </Box>
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default IncineratorTableHeader;
