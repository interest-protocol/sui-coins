export interface NetworkConfig {
  rpc?: string;
  network: string;
}

export interface NetworkContext {
  network: string;
  changeNetwork: (network: string) => void;
}

export interface NetworkProviderProps {
  defaultNetwork: string;
  networks: ReadonlyArray<NetworkConfig>;
  onChangeNetwork?: (network: string) => void;
}
