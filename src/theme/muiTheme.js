import { createTheme } from '@mui/material/styles'

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
        light: mode === 'dark' ? '#bbdefb' : '#63a4ff',
        dark: '#1565c0'
      },
      secondary: {
        main: mode === 'dark' ? '#81c784' : '#4caf50'
      },
      warning: {
        main: mode === 'dark' ? '#ffb74d' : '#ff9800'
      },
      error: {
        main: mode === 'dark' ? '#ef5350' : '#f44336'
      },
      background: {
        default: mode === 'dark' ? '#1e1e1e' : '#f5f7fa',
        paper: mode === 'dark' ? '#2a2a2a' : '#ffffff'
      },
      text: {
        primary: mode === 'dark' ? '#e0e0e0' : '#212121',
        secondary: mode === 'dark' ? '#b0b0b0' : '#757575'
      }
    },
    shape: {
      borderRadius: 12
    },
    typography: {
      fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
      h5: {
        fontWeight: 700
      },
      h6: {
        fontWeight: 700
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: 0.2
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            boxShadow: 'none'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      }
    }
  })
