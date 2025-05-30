import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003274',
      light: '#004c9e',
      dark: '#002054',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#27f19c',
      light: '#4ff4b0',
      dark: '#1ac77a',
      contrastText: '#003274',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#718096',
    },
    success: {
      main: '#27f19c',
      light: '#4ff4b0',
      dark: '#1ac77a',
    },
    warning: {
      main: '#f6ad55',
    },
    error: {
      main: '#e53e3e',
    },
    info: {
      main: '#3182ce',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      color: '#003274',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      color: '#003274',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#003274',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#003274',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#003274',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#003274',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.05)',
    '0 4px 6px rgba(0, 0, 0, 0.07)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 20px 25px rgba(0, 0, 0, 0.1)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
    '0 25px 50px rgba(0, 0, 0, 0.12)',
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f1f5f9',
          backgroundColor: '#ffffff',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderColor: '#e2e8f0',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        colorSuccess: {
          backgroundColor: '#e8fdf5',
          color: '#1ac77a',
          border: '1px solid #27f19c',
        },
        colorError: {
          backgroundColor: '#fed7d7',
          color: '#e53e3e',
          border: '1px solid #fc8181',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid',
        },
        standardSuccess: {
          backgroundColor: '#e8fdf5',
          borderColor: '#27f19c',
          color: '#1ac77a',
        },
        standardError: {
          backgroundColor: '#fed7d7',
          borderColor: '#fc8181',
          color: '#e53e3e',
        },
        standardWarning: {
          backgroundColor: '#fefcbf',
          borderColor: '#f6e05e',
          color: '#d69e2e',
        },
        standardInfo: {
          backgroundColor: '#e8f3ff',
          borderColor: '#63b3ed',
          color: '#3182ce',
        },
      },
    },
  },
});
