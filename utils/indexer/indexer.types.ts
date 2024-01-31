export interface ApiRequestIndexer {
  query: any;
  userApiKey: string;
  apiKey: string;
}

export interface FetchNftHolder {
  offset: string;
  collectionId: string;
}

export interface IndexerNFTResponse {
  owner: string;
}
