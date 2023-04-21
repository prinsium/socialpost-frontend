//no use of this component
import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            color: "#f0f0f0",
          },
        }),
      },
    },}})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            color: "#adbfcf",
          },
        }),
      },
    },
  },
});

export {darkTheme, lightTheme};