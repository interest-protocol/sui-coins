import { DAY_IN_MS, FAUCET_COINS } from '@/constants';
import dbConnect from '@/server';
import { getExactDayTimestamp } from '@/utils';

import { findQuestProfile } from '.';

export const fillQuestProfile = async (address: string) => {
  await dbConnect();

  const todayTimestamp = getExactDayTimestamp();
  const questProfile = await findQuestProfile(address);

  await Promise.all(
    Array.from({ length: 20 }, (_, dayIndex) => {
      questProfile['swap'] = {
        ...questProfile['swap'],
        [todayTimestamp - dayIndex * DAY_IN_MS]: 5,
      };
      questProfile['airdrop'] = {
        ...questProfile['airdrop'],
        [todayTimestamp - dayIndex * DAY_IN_MS]: 1,
      };
      questProfile['createPool'] = {
        ...questProfile['createPool'],
        [todayTimestamp - dayIndex * DAY_IN_MS]: 1,
      };
      questProfile['createToken'] = {
        ...questProfile['createToken'],
        [todayTimestamp - dayIndex * DAY_IN_MS]: 1,
      };
      questProfile['addLiquidity'] = {
        ...questProfile['addLiquidity'],
        [todayTimestamp - dayIndex * DAY_IN_MS]: 1,
      };
      questProfile['faucet'] = {
        ...questProfile['faucet'],
        [todayTimestamp - dayIndex * DAY_IN_MS]: FAUCET_COINS.reduce(
          (acc, { type }) => ({
            ...acc,
            [type]: 1,
          }),
          {}
        ),
      };
    })
  );

  await questProfile.save();
};
