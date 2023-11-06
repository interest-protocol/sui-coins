import { Global } from '@emotion/react';
import { ThemeProviderProps } from '@emotion/react/types/theming';
import {
  darkTheme,
  lightTheme,
  ThemeProvider as InterestThemeProvider,
} from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';

import { TOAST_DURATION } from '@/constants';
import { GlobalStyles } from '@/styles';

import NetworkProvider from '../network-provider';
import WalletSuiProvider from './wallet-sui-provider';

const ThemeManager: FC<Omit<ThemeProviderProps, 'theme'>> = ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <NetworkProvider>
      <InterestThemeProvider
        theme={{ ...(dark ? darkTheme : lightTheme), setDark }}
      >
        <Global styles={GlobalStyles} />
        <WalletSuiProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                border: '1px solid',
                borderRadius: darkTheme.radii.m,
                color: darkTheme.colors.onSurface,
                background: darkTheme.colors.surface,
                borderColor: darkTheme.colors['primary.onPrimaryContainer'],
              },
              duration: TOAST_DURATION,
            }}
          />
          <SkeletonTheme baseColor="#99BBFF28" highlightColor="#99BBFF14">
            {children}
          </SkeletonTheme>
        </WalletSuiProvider>
      </InterestThemeProvider>
    </NetworkProvider>
  );
};

export default ThemeManager;
