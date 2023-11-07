interface GetTokenByteCoreArgs {
  name: string;
  decimals: number;
  symbol: string;
  mintAmount: string;
  url?: string;
  description?: string;
  fixedSupply: boolean;
}

export interface CompiledModules {
  modules: number[][] | string[];
  dependencies: string[];
}

export const getTokenByteCode = async (
  data: GetTokenByteCoreArgs
): Promise<CompiledModules> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IPX_ANALYTICS_SERVER_URL}api/v1/token/makeToken`,
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        ...(!process.env.production && { mode: 'cors' }),
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
  );

  return response.json();
};
