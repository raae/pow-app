













import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { AppAuthLayout } from "../features/app"
//import HOME from "../features/navigation/navItems"
import HOME from "../features/navigation"
//https://www.lego.com/en-no/product/batman-classic-tv-series-batmobile-76188

const KrakenPage = () => {
    return (
      <>
        <AppAuthLayout title="Not Found">
            <StaticImage
            src="https://olavea.gtsb.io/static/0ba2a0378390c6896b2b576f08446b2f/b16d7/Joker_pink_1.webp"
            alt="LEGO Joker BANG!"
            layout="fullWidth"
            aspectRatio={21 / 9}
            />
            <p>Jump in my old school batmobile and I'll give you a ride to my beauuuuutiful mansion for some good old fashioned fun.</p>
            <a href="https://www.lego.com/en-no/product/batman-classic-tv-series-batmobile-76188">Old school LEGO Batmobile™ $29.99, will ship in 60 days</a>
            <div></div>
            <a href="https://www.lego.com/en-no/product/batman-classic-tv-series-batmobile-76188">The Joker™ Manor, Retired Product</a>
            <div></div>
            <Link to={HOME}>Go POW!</Link>
        </AppAuthLayout>
      </>
    )}
export default KrakenPage;