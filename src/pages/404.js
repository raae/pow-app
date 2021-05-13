//import HOME from "../features/navigation/navItems"
//navigate(HOME.to)

//https://www.lego.com/en-no/product/batman-classic-tv-series-batmobile-76188













import React from "react"
import { AppAuthLayout } from "../features/app"
import {HOME} from "../features/navigation"

const NotFoundPage = () => {
    return (
      <>
        <AppAuthLayout title="Not Found">

            <p>Jump in my old school batmobile and I'll give you a ride to my beauuuuutiful mansion for some good old fashioned fun. Or....</p>

            <a href={HOME.to}>Go to POW!</a>
        </AppAuthLayout>
      </>
    )}
export default NotFoundPage;