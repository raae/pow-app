import React from "react"
import { AppAuthLayout } from "../features/app"
import { HOME } from "../features/navigation"
import batmanPhoto from "../images/Photo_by_Teo_Zac_unsplash_com_at_teo_2.jpeg"

const NotFoundPage = () => {
  return (
    <AppAuthLayout title="Not Found">
      <p>
        Nothing to see here, go back to <a href={HOME.to}>POW!</a>
      </p>
      <img
        src={batmanPhoto}
        alt="Lost little LEGO Batman"
        style={{ maxWidth: "100%" }}
      />
      <p>
        Photo by <a href="https://unsplash.com/@teo">Teo Zac</a> on{" "}
        <a href="https://unsplash.com/@teo">Unsplash</a>.
      </p>
    </AppAuthLayout>
  )
}

export default NotFoundPage
