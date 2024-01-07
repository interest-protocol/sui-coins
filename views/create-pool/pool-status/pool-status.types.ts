export interface PoolStatusProps {
  description: string;
  amount: number;
  type: string;
}

export interface PoolStatusLinesProps {
  lines: ReadonlyArray<PoolStatusProps>;
}
