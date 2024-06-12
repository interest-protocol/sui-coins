import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';

declare module '*/coin-metadata.json' {
  const value: Record<Network, Record<string, CoinMetadataWithType>>;
  export default value;
}
