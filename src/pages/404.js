//import HOME from "../features/navigation/navItems"
//navigate(HOME.to)

//https://www.lego.com/en-no/product/batman-classic-tv-series-batmobile-76188













import React from "react"
import { AppAuthLayout } from "../features/app"
import {HOME} from "../features/navigation"
import {StaticImage} from "gatsby-plugin-image"
//import Photo_by_Teo_Zac_unsplash_com_at_teo_2 from "../images/Photo_by_Teo_Zac_unsplash_com_at_teo_2.jpeg"

const NotFoundPage = () => {
    return (
      <>
        <AppAuthLayout title="Not Found">

            <p>Nothing to see here, go back to <a href={HOME.to}>POW!</a></p>
            <StaticImage
              src="../images/Photo_by_Teo_Zac_unsplash_com_at_teo_2.jpeg"
              alt="Lost little LEGO Batman"

            />
            <p>Photo by <a href="https://unsplash.com/@teo">Teo Zac</a> on <a href="https://unsplash.com/@teo">Unsplash</a>.</p>

        </AppAuthLayout>
      </>
    )}
export default NotFoundPage;