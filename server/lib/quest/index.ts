import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import metrics from '@/server/model/metrics';
import QuestModel, { AirdropData, Quest } from '@/server/model/quest';
import QuestProfileModel from '@/server/model/quest-profile';
import { getExactDayTimestamp, getFirstWeekDayTimestamp } from '@/utils';

type ProfileField =
  | 'swap'
  | 'faucet'
  | 'createPool'
  | 'addLiquidity'
  | 'airdrop'
  | 'createToken';

type LastField =
  | 'lastSwapAt'
  | 'lastFaucetAt'
  | 'lastCreatePoolAt'
  | 'lastAddLiquidityAt'
  | 'lastAirdropAt'
  | 'lastCreateTokenAt';

const lastFieldMap: Record<ProfileField, LastField> = {
  swap: 'lastSwapAt',
  faucet: 'lastFaucetAt',
  airdrop: 'lastAirdropAt',
  createPool: 'lastCreatePoolAt',
  createToken: 'lastCreateTokenAt',
  addLiquidity: 'lastAddLiquidityAt',
};

export const addQuest = async (
  quest: Omit<Quest, 'timestamp'>,
  profileField: ProfileField,
  network: Network
) => {
  await dbConnect();

  const firstWeekDay = getFirstWeekDayTimestamp();

  const metric = await findMetrics(network);

  metric.weekly[firstWeekDay] = (metric.weekly[firstWeekDay] ?? 0) + 1;

  await metric.save();

  const questProfile = await findQuestProfile(quest.address);

  const todayTimestamp = getExactDayTimestamp();

  const finalQuest = { ...quest, timestamp: todayTimestamp };

  const doc = await QuestModel.create(finalQuest);
  await doc.save();

  if (profileField === 'airdrop') {
    invariant(
      'airdrop' === quest.kind,
      'Something went wrong with airdrop quest'
    );

    const data = quest.data as AirdropData;

    if (data.addressesCount < 10) return finalQuest;
  }

  if (questProfile[lastFieldMap[profileField]] === todayTimestamp)
    return finalQuest;

  (questProfile[lastFieldMap[profileField]] as number) = todayTimestamp;

  await questProfile.save();

  return finalQuest;
};

export const findQuestProfile = async (address: string) => {
  await dbConnect();

  const questProfile = await QuestProfileModel.findOne({ address });

  if (!questProfile)
    return QuestProfileModel.create({
      address,
      lastSwapAt: 0,
      lastFaucetAt: 0,
      lastAirdropAt: 0,
      lastCreatePoolAt: 0,
      lastCreateTokenAt: 0,
      lastAddLiquidityAt: 0,
    });

  return questProfile;
};

export const findMetrics = async (network: Network) => {
  await dbConnect();

  const metric = await metrics.findOne({ network });

  return (
    metric ??
    metrics.create({
      network,
      weekly: {},
    })
  );
};
