import React from "react"
import { Link } from "../navigation"

const AppFooter = ({ variant }) => {
  return (
    <>
      <p>
        Made with ❤ <br /> by{" "}
        <Link target="_blank" rel="noopener" href="https://twitter.com/raae">
          @raae
        </Link>{" "}
        and family.
        <br />
        <>
          <Link
            target="_blank"
            rel="noopener"
            href="mailto://support@usepow.app"
          >
            support@usepow.app
          </Link>
        </>
      </p>
    </>
  )
}

export default AppFooter
