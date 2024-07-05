export type Features = 'coins' | 'nfts' | 'objects';

export interface Web3ManagerProps {
  features?: ReadonlyArray<Features>;
  withBlocked?: boolean;
}
