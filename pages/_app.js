import '../styles/globals.css';
import '../styles/nprogress.css';
import App from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import store from '../store';
import { Provider } from 'react-redux';
import Message from '../components/Message';
import RouteGuard from '../components/RouteGuard';
import theme from '../configs/theme';
import { QueryClientProvider } from 'react-query';
import queryClient from '../services/client';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MuiThemeProvider theme={theme}>
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
            <div id="_overlay"></div>
            <Message />
          </MuiThemeProvider>
        </QueryClientProvider>
      </Provider>
    );
  }
}

export default MyApp;
