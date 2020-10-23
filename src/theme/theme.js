import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import "typeface-seymour-one"

const primaryColor = "#e53935"
const secondaryColor = "#542c85"

// A custom theme for this app
let theme = createMuiTheme({
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

console.log(theme.props)

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
  },
  MuiCardHeader: {
    component: "header",
  },
  MuiLink: {
    color: "secondary",
  },
  MuiTextField: {
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
