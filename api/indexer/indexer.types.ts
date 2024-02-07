export interface ApiRequestIndexer {
  query: string;
  userApiKey: string;
  apiKey: string;
}

export interface FetchNftHolder {
  offset: number;
  collectionId: string;
}

export interface IndexerNFTResponse {
  owner: string;
}
