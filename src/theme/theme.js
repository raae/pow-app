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
  MuiLink: {
    color: "secondary",
  },
  MuiButton: {
    disableElevation: true,
  },
  MuiAppBar: {
    elevation: 0,
    color: "default",
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
      backgroundColor: theme.palette.background.paper,
      borderTop: `4px solid ${theme.palette.primary.main}`,
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
  },
  MuiAlert: {
    action: {
      marginTop: "8px",
      marginRight: 0,
      alignItems: "flex-start",
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
