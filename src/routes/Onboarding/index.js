import React, { useState, useEffect } from "react"
import { Router } from "@reach/router"
import { useDispatch } from "react-redux"

import SEO from "../../components/Seo"
import WelcomeRoute from "./welcome"
import TagRoute from "./tag"

import { updateMenstruationTag } from "../../store/settings"

const DEFAULTS = {
  tag: "period",
}

const OnboardingRoute = () => {
  const [state, setState] = useState({})
  const [settings, setSettings] = useState(DEFAULTS)
  const dispatch = useDispatch()

  const onChange = (name) => (event) => {
    let value = event.target.value

    if (name === "tag") {
      value = value.replace(/\s/g, "")
      value = value.replace(/#/g, "")
    }

    setState({
      ...state,
      [name]: value,
    })
  }

  useEffect(() => {
    setSettings((prev) => ({ ...prev, ...state }))
  }, [state])

  const completeOnBoarding = () => {
    dispatch(updateMenstruationTag({ tag: settings.tag }))
  }

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
          onChange={onChange}
          defaults={DEFAULTS}
          state={state}
          settings={settings}
          prev={{ path: "../" }}
          next={{
            path: "/app",
            label: `Use #${settings.tag}`,
            onClick: completeOnBoarding,
          }}
        />
      </Router>
    </div>
  )
}

export default OnboardingRoute
