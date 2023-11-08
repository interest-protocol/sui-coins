import { css } from '@emotion/react';

export const GlobalStyles = css`
  @font-face {
    font-family: 'Proto';
    src: url('/fonts/proto/ProtoMono-Regular.eot');
    src:
      local('Proto Mono Regular'),
      local('ProtoMono-Regular'),
      url('/fonts/proto/ProtoMono-Regular.eot?#iefix')
        format('embedded-opentype'),
      url('/fonts/proto/ProtoMono-Regular.woff2') format('woff2'),
      url('/fonts/proto/ProtoMono-Regular.woff') format('woff'),
      url('/fonts/proto/ProtoMono-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proto';
    src: url('../fonts/proto/ProtoMono-Medium.eot');
    src:
      local('Proto Mono Medium'),
      local('ProtoMono-Medium'),
      url('../fonts/proto/ProtoMono-Medium.eot?#iefix')
        format('embedded-opentype'),
      url('../fonts/proto/ProtoMono-Medium.woff2') format('woff2'),
      url('../fonts/proto/ProtoMono-Medium.woff') format('woff'),
      url('../fonts/proto/ProtoMono-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Satoshi';
    src:
      url('/fonts/satoshi/Satoshi-Medium.woff2') format('woff2'),
      url('/fonts/satoshi/Satoshi-Medium.woff') format('woff'),
      url('/fonts/satoshi/Satoshi-Medium.ttf') format('truetype');
    font-weight: 500;
    font-display: swap;
    font-style: normal;
  }

  @font-face {
    font-family: 'Satoshi';
    src:
      url('/fonts/satoshi/Satoshi-Bold.woff2') format('woff2'),
      url('/fonts/satoshi/Satoshi-Bold.woff') format('woff'),
      url('/fonts/satoshi/Satoshi-Bold.ttf') format('truetype');
    font-weight: 700;
    font-display: swap;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Satoshi';
  }

  html {
    scroll-behavior: smooth;
  }

  body,
  html {
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    padding: 2rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    background: transparent;
    transition: all 300ms ease-in-out;
  }

  /* Track on hover */
  ::-webkit-scrollbar-track:hover {
    background: #fff1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
    border: 5px solid transparent;
  }
`;
