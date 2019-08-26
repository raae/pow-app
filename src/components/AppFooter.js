import React from "react"
import { Link } from "@material-ui/core"

const AppFooter = () => {
  return (
    <>
      Made with ❤ <br /> by{" "}
      <Link target="_blank" rel="noopener" href="https://raae.codes">
        @raae
      </Link>{" "}
      and family.
    </>
  )
}

export default AppFooter
