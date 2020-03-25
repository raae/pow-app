import React from "react"
import { Link } from "../components/Link"

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
            Support:{" "}
            <Link
              target="_blank"
              rel="noopener"
              href="mailto://support@usepow.app"
            >
              support@usepow.app
            </Link>
          </>
        ) : (
          <>
            Subscribe to the POW!{" "}
            <Link href="https://lillylabs.ck.page/a5f42d2b44">Newsletter</Link>.
          </>
        )}
      </p>
    </>
  )
}

export default BrandFooter
