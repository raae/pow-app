













import React from "react"
import {Link} from "gatsby"
import { AppAuthLayout } from "../features/app"
//import HOME from "../features/navigation/navItems"
import HOME from "../features/navigation"
//https://www.lego.com/en-no/product/batman-classic-tv-series-batmobile-76188

const KrakenPage = () => {
    return (
      <>
        <AppAuthLayout title="Not Found">

            <p>Jump in my old school batmobile and I'll give you a ride to my beauuuuutiful mansion for some good old fashioned fun.</p>

            <Link to={HOME}>Go POW!</Link>
        </AppAuthLayout>
      </>
    )}
export default KrakenPage;