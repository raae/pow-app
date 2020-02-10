import React, { useState, useEffect } from "react"
import { Router } from "@reach/router"
import { useDispatch } from "react-redux"

import SEO from "../../components/Seo"
import WelcomeRoute from "./welcome"
import TagRoute from "./tag"
import EmailRoute from "./email"

import { updateMenstruationTag } from "../../store/settings"

const DEFAULTS = {
  tag: "period",
  email: "",
  updates: true,
  newsletter: false,
}

const OnboardingRoute = () => {
  const [state, setState] = useState({ ...DEFAULTS, ...{ tag: "" } })
  const [settings, setSettings] = useState(DEFAULTS)
  const dispatch = useDispatch()

  const handleChange = (name) => (event) => {
    let value = event.target.value

    if (name === "tag") {
      value = value.replace(/\s/g, "")
      value = value.replace(/#/g, "")
    }

    if (name === "updates" || name === "newsletter") {
      value = event.target.checked
    }

    setState({
      ...state,
      [name]: value,
    })
  }

  useEffect(() => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        ...state,
      }
      updated.tag = updated.tag || DEFAULTS.tag
      return updated
    })
  }, [state])

  const completeOnBoarding = () => {
    dispatch(updateMenstruationTag({ tag: settings.tag }))
  }

  const props = {
    handleChange: handleChange,
    defaults: DEFAULTS,
    state: state,
    settings: settings,
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
          {...props}
          prev={{ path: "../" }}
          next={{
            path: "../email",
            label: `Use #${settings.tag}`,
          }}
        />
        <EmailRoute
          path="/email"
          {...props}
          prev={{ path: "../tag" }}
          next={{
            path: "/app",
            label: settings.email ? `Stay in the loop` : `Stay out of the loop`,
            onClick: completeOnBoarding,
          }}
        />
      </Router>
    </div>
  )
}

export default OnboardingRoute
