import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#1a1a1a',
    primary: '#2a2a2a',
    text: '#ffffff',
    accent: '#646cff',
    barDefault: '#ffffff',
    barActive: '#ff4444',
    barSorted: '#4caf50',
  },
  transitions: {
    default: '0.3s ease-in-out',
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;