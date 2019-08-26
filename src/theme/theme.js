import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e53935",
    },
    secondary: {
      main: "#3f51b5",
    },
  },
  props: {
    MuiLink: {
      color: "secondary",
    },
  },
})

export default theme
