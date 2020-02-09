import React from "react"
import { Router, Link } from "@reach/router"
import { Button } from "@material-ui/core"

import SEO from "../components/Seo"
import BrandLayout from "../components/BrandLayout"
import BrandCopy from "../components/BrandCopy"

const IntroPage = ({ next }) => {
  return (
    <BrandLayout>
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
          <li>
            Very #upbeat today, hope it stays this way for a couple of more
            days.
          </li>
        </ul>
        <p>
          The same is true for tracking the days of your period, so make sure to
          configure a hashtag that works for you like #period, #codered or a
          term from your own language.
        </p>
      </BrandCopy>
      <br />
      {next && (
        <Button variant="outlined" color="primary" component={Link} to={next}>
          Got it, lets begin!
        </Button>
      )}
    </BrandLayout>
  )
}

const OnboardingRoute = () => {
  // If user has onboarded redirect to app
  return (
    <div>
      <SEO title="Onboarding" />
      <Router>
        <IntroPage path="/" next="/app" />
      </Router>
    </div>
  )
}

export default OnboardingRoute
