import { Network } from '@/constants';
import dbConnect from '@/server';
import metrics from '@/server/model/metrics';
import QuestModel, { Quest } from '@/server/model/quest';
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

  await updateMetrics(network, quest.address);

  const questProfile = await findQuestProfile(quest.address);

  const todayTimestamp = getExactDayTimestamp();

  const finalQuest = { ...quest, timestamp: todayTimestamp };

  const doc = await QuestModel.create(finalQuest);
  await doc.save();

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
      weeklyTXs: {},
      weeklyUsers: {},
    })
  );
};

export const updateMetrics = async (network: Network, address: string) => {
  await dbConnect();
  const firstWeekDay = getFirstWeekDayTimestamp();

  const metric = await findMetrics(network);

  metric.weeklyTXs[firstWeekDay] = (metric.weeklyTXs[firstWeekDay] ?? 0) + 1;

  if (!metric.weeklyUsers[firstWeekDay].includes(address))
    metric.weeklyUsers[firstWeekDay] = [
      ...metric.weeklyUsers[firstWeekDay],
      address,
    ];

  await metric.save();
};
