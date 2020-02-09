import React from "react"

import BrandLayout from "../../components/BrandLayout"
import BrandCopy from "../../components/BrandCopy"

import Navigation from "./navigation"

const WelcomeRoute = ({ prev, next }) => {
  return (
    <BrandLayout footer={null}>
      <BrandCopy>
        <h1>Welcome</h1>
        <p>
          With POW! you track symptoms, moods, actions, or whatever you would
          like to keep a close eye on, using hashtags.
        </p>
        <p>
          Think of it as writing an Instagram caption or tweet, highlighting key
          terms.
        </p>
        <p>It can be short and sweet, or more like a diary entry:</p>
        <ul>
          <li>Feeling #energized and ready to rule the world.</li>
          <li>Really #bloated and in a #funky mood.</li>
          <li>#sexytime</li>
          <li>#period started today.</li>
          <li>
            Very #upbeat today, hope it stays this way for a couple of more
            days.
          </li>
        </ul>
        <Navigation prev={prev} next={next} />
      </BrandCopy>
    </BrandLayout>
  )
}

export default WelcomeRoute
