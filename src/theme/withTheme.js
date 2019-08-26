import React from "react"
import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import theme from "./theme"

const withStorage = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  )
}

export default withStorage
