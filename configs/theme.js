import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 375,
      xs: 480,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;',
  },
});

export default theme;
