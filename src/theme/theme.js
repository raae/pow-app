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
  props: {
    MuiLink: {
      color: "secondary",
    },
  },
  overrides: {
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
  },
})

theme = responsiveFontSizes(theme)

export default theme
