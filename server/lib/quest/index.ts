import invariant from 'tiny-invariant';

import dbConnect from '@/server';
import QuestModel, { AirdropData, Quest } from '@/server/model/quest';
import QuestProfileModel from '@/server/model/quest-profile';
import { getExactDayTimestamp } from '@/utils';

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
  profileField: ProfileField
) => {
  await dbConnect();

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
