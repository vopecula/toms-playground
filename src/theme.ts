import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material';

const common: ThemeOptions = {
  typography: {
    fontFamily: 'Verdana',
    body1: {
      fontFamily: 'Verdana',
    },
    h1: {fontFamily: 'TF2Build'},
    h2: {fontFamily: 'TF2Build'},
    h3: {fontFamily: 'TF2Build'},
    h4: {fontFamily: 'TF2Build'},
    h5: {fontFamily: 'TF2Build'},
    h6: {fontFamily: 'TF2Build'},
  },
  palette: {
    primary: {
      main: 'rgb(220,100,81)'
    },
    text: {
      primary: 'rgb(243,229,208)'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
};

export const dark = createTheme(deepmerge(common, {
  palette: {
    mode: 'dark',
    background: {
      default: '#181512'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "url(/img/6n5cM14.png)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(rgb(56,51,45), rgb(35,32,27))',
          borderTop: '1px solid rgb(89,81,72)'
        }
      }
    }
  }
} as ThemeOptions));

export const light = createTheme(deepmerge(common, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "url(/img/NgiJMQy.png)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(rgb(125 112 97), rgb(72 67 58))',
          borderTop: '1px solid rgb(172 153 132)'
        }
      }
    }
  }
} as ThemeOptions));