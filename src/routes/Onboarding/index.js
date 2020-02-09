import React, { useState, useEffect } from "react"
import { Router } from "@reach/router"
import { useDispatch } from "react-redux"

import SEO from "../../components/Seo"
import WelcomeRoute from "./welcome"
import TagRoute from "./tag"

import { updateMenstruationTag } from "../../store/settings"

const OnboardingRoute = () => {
  const defaultTag = "period"
  const [displayTag, setDisplayTag] = useState(defaultTag)
  const [tag, setTag] = useState()
  const dispatch = useDispatch()

  const onTagChange = (event) => {
    let value = event.target.value

    value = value.replace(/\s/g, "")
    value = value.replace(/#/g, "")

    setTag(value)
  }

  const completeOnBoarding = () => {
    dispatch(updateMenstruationTag({ tag: displayTag }))
  }

  useEffect(() => {
    setDisplayTag(tag || defaultTag)
  }, [tag, defaultTag])

  return (
    <div>
      <SEO title="Onboarding" />
      <Router>
        <WelcomeRoute
          path="/"
          next={{
            path: "tag",
            label: "Sounds good",
            onClick: () => {},
          }}
        />
        <TagRoute
          path="/tag"
          tag={tag}
          onTagChange={onTagChange}
          placeholderTag={defaultTag}
          displayTag={displayTag}
          prev={{ path: "./" }}
          next={{
            path: "/app",
            label: `Use #${tag || defaultTag}`,
            onClick: completeOnBoarding,
          }}
        />
      </Router>
    </div>
  )
}

export default OnboardingRoute
