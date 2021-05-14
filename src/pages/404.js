//import HOME from "../features/navigation/navItems"
//navigate(HOME.to)

//https://www.lego.com/en-no/product/batman-classic-tv-series-batmobile-76188













import React from "react"
import { AppAuthLayout } from "../features/app"
import {HOME} from "../features/navigation"
import {StaticImage} from "gatsby-plugin-image"

const NotFoundPage = () => {
    return (
      <>
        <AppAuthLayout title="Not Found">

            <p>Nothing to see here, go back to <a href={HOME.to}>POW!</a></p>
            <StaticImage
              src="https://images.unsplash.com/photo-1554579653-17cdf3bfbca6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzkxfHxsZWdvJTIwYmF0bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            />
            <p>Photo by <a href="https://unsplash.com/@teo">Teo Zac</a> on <a href="https://unsplash.com/@teo">Unsplash</a>.</p>

        </AppAuthLayout>
      </>
    )}
export default NotFoundPage;