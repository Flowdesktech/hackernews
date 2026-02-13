import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff6b2d" },
    secondary: { main: "#5d8aff" },
    background: {
      default: "#0b0f14",
      paper: "#121822",
    },
    text: {
      primary: "#f5f7fb",
      secondary: "#a6b0c0",
    },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h4: { fontWeight: 700, letterSpacing: -0.4 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    body1: { fontSize: "0.98rem" },
    body2: { fontSize: "0.92rem" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(135deg, rgba(255,107,45,0.18), rgba(18,24,34,0.92))",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255,255,255,0.08)",
          borderRadius: 14,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255,255,255,0.08)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
        containedPrimary: {
          boxShadow: "none",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,107,45,0.95), rgba(255,140,90,0.95))",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12 },
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.12)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});

export default theme;
