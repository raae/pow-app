/* globals fathom */

import React, { useState } from "react"

import { useDataActions } from "../../database"
import { entryIdFromDate } from "../../utils/days"

import { tagsFromText } from "../../utils/tags"

import UserForm from "../UserForm"
import PaymentForm from "../PaymentForm"

import Layout from "./Layout"
import Tag from "./Tag"
import Cycle from "./Cycle"

const initialValues = {
  tag: "",
  lastStart: null,
  daysBetween: "",
  subscriptionPlan: "yearly",
}

const textFieldProps = {
  color: "secondary",
  variant: "outlined",
  margin: "normal",
}

const Onboarding = () => {
  const { insertSetting, insertEntry } = useDataActions()

  const [values, setValues] = useState(initialValues)
  const [activeStep, setActiveStep] = useState(0)

  const [isPending, setIsPending] = useState()

  const handleSettingsChange = (name) => (event) => {
    let value = null

    if (name === "tag") {
      value = event.target.value
      value = tagsFromText("#" + value)[0] || ""
    } else if (name === "newsletter") {
      value = event.target.checked
    } else if (name === "lastStart") {
      value = event
    } else {
      value = event.target.value
    }

    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleBack = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleSaveOnboardingTag = async (event) => {
    setIsPending(true)

    if (event && event.preventDefault) {
      event.preventDefault()
    }

    await insertSetting("tag", values.tag)

    handleNext()
    setIsPending(false)
  }

  const handleSaveOnboardingInitData = async (event) => {
    setIsPending(true)

    if (event && event.preventDefault) {
      event.preventDefault()
    }

    if (values.daysBetween) {
      await insertSetting("daysBetween", values.daysBetween)
    }

    if (values.lastStart) {
      const entryId = entryIdFromDate(values.lastStart)
      await insertEntry(entryId, {
        note: `#${values.tag}`,
      })
    }

    handleNext()
    setIsPending(false)
  }

  const trackGoal = (goalId) => {
    try {
      fathom("trackGoal", goalId, 0)
    } catch (error) {
      console.log("No fathom, cannot track goal")
    }
  }

  const steps = [
    {
      label: "Create account",
      content: (
        <UserForm
          variant="signup"
          onSubmitFulfilled={(event) => {
            handleNext(event)
            trackGoal("HGGOZCXZ")
          }}
          standalone={false}
        />
      ),
    },
    {
      label: "Personalize",
      content: (
        <Tag
          values={values}
          onChange={handleSettingsChange}
          textFieldProps={textFieldProps}
        />
      ),
      submitOnly: true,
      handleSubmit: (event) => {
        handleSaveOnboardingTag(event)
        trackGoal("2JMQXAFB")
      },
      submitLabel: "Next",
    },
    {
      label: "Personalize",
      content: (
        <Cycle
          values={values}
          onChange={handleSettingsChange}
          textFieldProps={textFieldProps}
        />
      ),
      optional: true,
      submitOnly: true,
      disabled: isPending,
      handleSubmit: (event) => {
        handleSaveOnboardingInitData(event)
        trackGoal("OSGGXYF1")
      },
      submitLabel: "Next",
    },
    {
      label: "Pay",
      content: (
        <PaymentForm
          submitLabel="Take charge"
          standalone={false}
          onDone={(event) => {
            trackGoal("BLBWSO16")
          }}
        />
      ),
    },
  ]

  return (
    <Layout steps={steps} activeStep={activeStep} handleBack={handleBack} />
  )
}

export default Onboarding
