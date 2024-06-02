import { ReactNode } from 'react';

export interface State {
  error: null | Error;
}

export interface Props {
  children: ReactNode;
}

export type BoundaryMessageProps = State;
