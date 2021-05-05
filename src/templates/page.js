import React from "react"
import { Container, makeStyles } from "@material-ui/core"

import { Seo, Logo } from "../features/app"

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
  },
}))

const PageTemplate = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Seo />

        <h1>
          <Logo component="a" href="https://usepow.app">
            !
          </Logo>
        </h1>
        {children}
      </Container>
    </div>
  )
}

export default PageTemplate
