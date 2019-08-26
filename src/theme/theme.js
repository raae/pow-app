import { red, deepPurple } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e53935",
    },
    secondary: deepPurple,
  },
  props: {
    MuiLink: {
      color: "secondary",
    },
  },
})

export default theme
