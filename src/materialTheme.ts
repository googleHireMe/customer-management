import { createTheme } from '@material-ui/core/styles';
import { blueGrey, lightGreen } from '@material-ui/core/colors';

export const theme = createTheme({
  typography: {
    //fontFamily: `"Navigo"`
  },
  props: {
    MuiButton: {
      disableElevation: true,
    }
  },
  palette: {
    primary: {
      main: blueGrey[700]
    },
    secondary: {
      main: lightGreen[500],
    },
    background: {
      default: '#E5E5E5'
    }
  }
});