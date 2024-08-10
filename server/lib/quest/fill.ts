import { Network } from '@/constants';
import dbConnect from '@/server';
import quest from '@/server/model/quest';
import { getExactDayTimestamp, getFirstWeekDayTimestamp } from '@/utils';

import { findMetrics, findQuestProfile } from '.';

export const fillQuestProfile = async (address: string) => {
  await dbConnect();

  const todayTimestamp = getExactDayTimestamp();
  const questProfile = await findQuestProfile(address);

  questProfile.lastSwapAt = todayTimestamp;
  questProfile.lastFaucetAt = todayTimestamp;
  questProfile.lastAirdropAt = todayTimestamp;
  questProfile.lastCreatePoolAt = todayTimestamp;
  questProfile.lastCreateTokenAt = todayTimestamp;
  questProfile.lastAddLiquidityAt = todayTimestamp;

  await questProfile.save();
};

export const fillMetrics = async (network: Network) => {
  await dbConnect();

  const metric = await findMetrics(network);
  if (!metric.weekly) metric.weekly = {};

  const max = Math.floor((await quest.countDocuments()) / 1000);

  for (let i = 0; i < max; i++) {
    const quests = await quest
      .find()
      .limit(1000)
      .skip(i * 1000)
      .lean();

    quests.forEach(({ timestamp }) => {
      const firstWeekDay = getFirstWeekDayTimestamp(timestamp);

      metric.weekly[firstWeekDay] = (metric.weekly[firstWeekDay] ?? 0) + 1;
    });
  }

  await metric.save();
};
