import { Component, ReactElement } from 'react';

import Error from '@/views/error';

import { Props, State } from './error-boundary.types';

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  render(): ReactElement {
    if (this.state.error) return <Error message={this.state.error.message} />;

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
