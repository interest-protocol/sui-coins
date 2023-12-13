export interface PoolStatusProps {
  length: number;
  description: string;
  amount: number;
  type: string;
}

export interface PoolStatusLinesProps {
  lines: ReadonlyArray<PoolStatusProps>;
}
