import React from "react"
import { Link, Grid, Container } from "@material-ui/core"

const BrandFooter = () => {
  return (
    <Container>
      <Grid container>
        <Grid sm={12} md={6}>
          Made with ❤ by{" "}
          <Link target="_blank" rel="noopener" href="https://raae.codes">
            @raae
          </Link>{" "}
          and family.
        </Grid>
        <Grid sm={12} md={6} style={{ textAlign: "right" }}>
          <Link target="_blank" rel="noopener" href="http://eepurl.com/gBCgT9">
            Newsletter
          </Link>{" "}
          |{" "}
          <Link
            target="_blank"
            rel="noopener"
            href="https://www.producthunt.com/posts/pow-3"
          >
            Product Hunt
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default BrandFooter
