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
  //   MuiCard: {
  //     defaultProps: {
  //       variant: "outlined"
  //     },
  //     styleOverrides: {
  //       root: ({ ownerState, theme }) => ({
  //         ...{
  //           padding: theme.spacing(2),
  //           borderWidth: "1.5px",
  //           borderColor: "grey",
  //           backgroundColor: "#1b252f"
  //         },
  //       }),
  //     },
  //   },
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            color: "white"
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            color: "white"
          },
        }),
      },
    },
  //   MuiIconButton: {
  //     styleOverrides: {
  //       root: ({ ownerState, theme }) => ({
  //         ...{
  //           color: "#adbfcf"
  //         },
  //       }),
  //     },
  //   },
  //   MuiContainer: {
  //     defaultProps: {
  //       maxWidth: "md",
  //     },
  //     styleOverrides: {
  //       root: ({ ownerState, theme }) => ({
  //         ...{
  //           backgroundColor: "#1b252f",
  //           color: "#1b252f"
  //         },
  //       }),
  //     },
  //   },
  //   MuiMenuItem: {
  //     styleOverrides: {
  //       root: ({ ownerState, theme }) => ({
  //         ...{
  //           backgroundColor: "#1b252f",
  //           color: "#adbfcf"
  //         },
  //       }),
  //     },
  //   },
  //   MuiMenu: {
  //     styleOverrides: {
  //       root: ({ ownerState, theme }) => ({
  //         ...{
  //           color: "#1b252f",
  //         },
  //       }),
  //     },
  //   },
  },
});

export {darkTheme, lightTheme};