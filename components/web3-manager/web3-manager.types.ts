export type Features = 'coins' | 'nfts' | 'objects';

export interface Web3ManagerProps {
  withBlocked?: boolean;
  features?: ReadonlyArray<Features>;
}
