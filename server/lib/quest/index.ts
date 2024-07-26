import invariant from 'tiny-invariant';

import { FAUCET_COINS, Network } from '@/constants';
import dbConnect from '@/server';
import QuestModel, {
  AirdropData,
  FaucetData,
  Quest,
} from '@/server/model/quest';
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

  if (profileField === 'faucet') {
    invariant(
      'faucet' === quest.kind,
      'Something went wrong with faucet quest'
    );

    const data = quest.data as FaucetData;

    if (questProfile.lastFaucetAt[data.coin.type] === todayTimestamp)
      return finalQuest;

    questProfile.lastFaucetAt[data.coin.type] = todayTimestamp;
  } else if (profileField === 'swap') {
    invariant('swap' === quest.kind, 'Something went wrong with swap quest');

    const swapCount = await QuestModel.countDocuments({
      address: quest.address,
      timestamp: todayTimestamp,
    });

    if (swapCount >= 5) return finalQuest;

    questProfile.lastSwapAt = todayTimestamp;
  } else {
    if (questProfile[lastFieldMap[profileField]] === todayTimestamp)
      return finalQuest;

    (questProfile[lastFieldMap[profileField]] as number) = todayTimestamp;
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
      lastSwapAt: 0,
      lastAirdropAt: 0,
      lastCreatePoolAt: 0,
      lastCreateTokenAt: 0,
      lastAddLiquidityAt: 0,
      lastFaucetAt: FAUCET_COINS[Network.DEVNET].reduce(
        (acc, { type }) => ({ ...acc, [type]: 0 }),
        {}
      ),
    });

  return questProfile;
};
