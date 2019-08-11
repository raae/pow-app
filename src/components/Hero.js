import React from "react"
import { Container, Typography } from "@material-ui/core"

const Hero = ({ children }) => {
  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        {children}
      </Typography>
    </Container>
  )
}

export default Hero
