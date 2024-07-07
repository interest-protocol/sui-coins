import invariant from 'tiny-invariant';

import dbConnect from '@/server';
import QuestModel, { FaucetData, Quest } from '@/server/model/quest';
import QuestProfileModel from '@/server/model/quest-profile';
import { getExactDayTimestamp } from '@/utils';

type ProfileField =
  | 'swap'
  | 'faucet'
  | 'createPool'
  | 'addLiquidity'
  | 'airdrop'
  | 'createToken';

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

  if (!questProfile[profileField]) questProfile[profileField] = {};

  if (profileField === 'faucet') {
    invariant(
      'faucet' === quest.kind,
      'Something went wrong with faucet quest'
    );

    const data = quest.data as FaucetData;

    if (!questProfile[profileField][todayTimestamp])
      questProfile[profileField][todayTimestamp] = {};

    if (!questProfile[profileField][todayTimestamp][data.coin.type])
      questProfile[profileField][todayTimestamp][data.coin.type] = 0;

    questProfile[profileField][todayTimestamp][data.coin.type] =
      questProfile[profileField][todayTimestamp][data.coin.type] + 1;
  } else {
    if (!questProfile[profileField][todayTimestamp])
      questProfile[profileField][todayTimestamp] = 0;

    questProfile[profileField][todayTimestamp] =
      questProfile[profileField][todayTimestamp] + 1;
  }

  await questProfile.save();

  return finalQuest;
};

export const findQuestProfile = async (address: string) => {
  await dbConnect();

  const questProfile = await QuestProfileModel.findOne({ address });

  if (!questProfile)
    return QuestProfileModel.create({
      address,
      swap: {},
      faucet: {},
      airdrop: {},
      createPool: {},
      createToken: {},
      addLiquidity: {},
    });

  return questProfile;
};
