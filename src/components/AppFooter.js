import React from "react"
import { Link } from "@material-ui/core"

const AppFooter = () => {
  return (
    <>
      Made with ❤ <br /> by{" "}
      <Link target="_blank" rel="noopener" href="https://twitter.com/raae">
        @raae
      </Link>{" "}
      of{" "}
      <Link target="_blank" rel="noopener" href="https://lillylabs.no">
        Lilly Labs
      </Link>
      .
    </>
  )
}

export default AppFooter
