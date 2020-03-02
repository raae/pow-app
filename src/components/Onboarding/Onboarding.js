import React, { useState, useEffect } from "react"

import { useDataActions } from "../../database"
import { useQueryParam } from "../../utils/useQueryParam"
import { entryIdFromDate } from "../../utils/days"

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
  const step = useQueryParam("step")

  const { insertSetting, insertEntry } = useDataActions()
  const [values, setValues] = useState(initialValues)
  const [activeStep, setActiveStep] = useState(0)

  const [isPending, setIsPending] = useState()

  useEffect(() => {
    if (step) {
      setActiveStep(parseInt(step, 10))
    }
  }, [step])

  const handleSettingsChange = (name) => (event) => {
    let value = null

    if (name === "tag") {
      value = event.target.value
      value = value.replace(/\s/g, "")
      value = value.replace(/#/g, "")
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

  const handleSaveOnboarding = async (event) => {
    setIsPending(true)

    if (event && event.preventDefault) {
      event.preventDefault()
    }

    await insertSetting("tag", values.tag)

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

  const steps = [
    {
      label: "Create account",
      content: (
        <UserForm
          variant="signup"
          onSubmitFulfilled={handleNext}
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
      handleSubmit: handleNext,
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
      disabled: isPending,
      handleSubmit: handleSaveOnboarding,
      submitLabel: "Next",
    },
    {
      label: "Pay",
      content: <PaymentForm submitLabel="Take charge" standalone={false} />,
    },
  ]

  return (
    <Layout steps={steps} activeStep={activeStep} handleBack={handleBack} />
  )
}

export default Onboarding
