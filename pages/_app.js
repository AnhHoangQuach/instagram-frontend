import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <MuiThemeProvider theme={theme}>
        <Component {...pageProps} />;
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
