import React from "react"
import { Link } from "../components/Link"
import { BASE_URL } from "../constants"

const BrandFooter = ({ variant }) => {
  return (
    <>
      <p>
        Made with ❤ <br /> by{" "}
        <Link target="_blank" rel="noopener" href="https://twitter.com/raae">
          @raae
        </Link>{" "}
        of{" "}
        <Link target="_blank" rel="noopener" href="https://lillylabs.no">
          Lilly Labs
        </Link>
        .
        <br />
        {variant === "app" ? (
          <>
            Go to to homepage{" "}
            <Link target="_blank" rel="noopener" href={BASE_URL}>
              usepow.app
            </Link>
            .
          </>
        ) : (
          <>
            Not ready to sign up? Subscribe to the POW!{" "}
            <Link href="https://lillylabs.ck.page/a5f42d2b44">Newsletter</Link>.
          </>
        )}
      </p>
    </>
  )
}

export default BrandFooter
