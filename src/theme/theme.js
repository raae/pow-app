import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import "typeface-seymour-one"

const primaryColor = "#dd1a05" // "#e53935"
const secondaryColor = "#6a1b9a" // "#542c85"

// A custom theme for this app
let theme = createMuiTheme({
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontWeightBolder: 900,
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
})

theme.props = {
  MuiAppBar: {
    elevation: 0,
    color: "default",
  },
  MuiButton: {
    disableElevation: true,
  },
  MuiCard: {
    component: "section",
    variant: "outlined",
  },
  MuiCardHeader: {
    component: "header",
    titleTypographyProps: { component: "h2" },
  },
  MuiPaper: {
    component: "section",
  },
  MuiLink: {
    color: "secondary",
  },
  MuiTextField: {
    margin: "normal",
    variant: "outlined",
    InputLabelProps: { shrink: true },
  },
}

theme.overrides = {
  MuiMenuItem: {
    root: {
      minHeight: "48px !important",
    },
  },
  MuiAppBar: {
    colorDefault: {
      backgroundColor: theme.palette.background.default,
    },
  },
  MuiAlert: {
    action: {
      marginTop: "8px",
      marginRight: 0,
      alignItems: "flex-start",
    },
  },
  MuiCardHeader: {
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  MuiCardContent: {
    root: {
      padding: theme.spacing(4),
      "&:nth-child(2)": {
        paddingTop: theme.spacing(2),
      },
    },
  },
  MuiListItemIcon: {
    root: {
      minWidth: "auto",
      marginRight: theme.spacing(2),
    },
  },
  MuiLink: {
    root: {
      fontWeight: 500,
      "&:hover": {
        color: "currentColor",
        transition: "color 0.2s",
      },
    },
    underlineHover: {
      textDecoration: "underline",
    },
  },
}

theme = responsiveFontSizes(theme)

export default theme
