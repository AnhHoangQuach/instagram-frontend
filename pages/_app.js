import '../styles/globals.css';
import '../styles/nprogress.css';
import { ThemeProvider } from 'next-themes';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import store from '../store';
import { Provider } from 'react-redux';
import Message from '../components/Message';
import RouteGuard from '../components/RouteGuard';

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
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <MuiThemeProvider theme={theme}>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
          <div id="_overlay"></div>
          <Message />
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
