import React, { useState } from "react"

import {
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Button,
  Paper,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core"
import BackIcon from "@material-ui/icons/KeyboardBackspace"
import DoneIcon from "@material-ui/icons/FiberManualRecord"

import Logo from "../Logo"

import Tag from "./Tag"
import Cycle from "./Cycle"
import Payment from "./Payment"

const initialValues = {
  tag: "",
  lastStart: null,
  daysBetween: "",
  subscriptionPlan: "yearly",
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& p + ul": {
      marginTop: "-1em",
    },
    "& ul": {
      paddingLeft: "1.5em",
      listStyleType: "circle",
      "@media only screen and (max-width: 40rem)": {
        paddingLeft: "1.225em",
      },
    },
  },
  stepper: {
    marginLeft: theme.spacing(4) * -1,
  },
  form: {
    padding: theme.spacing(3, 2),
    "& > div + .MuiTypography-root": {
      marginTop: theme.spacing(2),
    },
    "& > fieldset + .MuiTypography-root": {
      marginTop: theme.spacing(3),
    },
  },
  actions: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2) * -1,
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
}))

const textFieldProps = {
  color: "secondary",
  variant: "outlined",
  margin: "normal",
}

const LastIcon = () => {
  return <DoneIcon color="disabled" />
}

const Onboarding = () => {
  const classes = useStyles()

  const [values, setValues] = useState(initialValues)
  const [activeStep, setActiveStep] = React.useState(0)

  const handleChange = (name) => (event) => {
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

  const handleNext = (event) => {
    event.preventDefault()
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = (event) => {
    event.preventDefault()
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleAccount = (event) => {
    event.preventDefault()
    console.log("create account")
    handleNext(event)
  }

  const handleComplete = (event) => {
    event.preventDefault()
    console.log("completed")
  }

  const steps = [
    { label: "Create account", Component: "div", handleSubmit: handleAccount },
    { label: "Personalize", Component: Tag, handleSubmit: handleNext },
    {
      label: "Personalize",
      Component: Cycle,
      optional: true,
      handleSubmit: handleNext,
    },
    { label: "Pay", Component: Payment, handleSubmit: handleComplete },
  ]

  return (
    <Paper elevation={0} className={classes.root}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map(({ label, optional, Component, handleSubmit }, index) => (
          <Step key={index}>
            <StepLabel>
              {label}
              {optional && <Typography variant="caption"> Optional</Typography>}
            </StepLabel>
            <StepContent>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Component
                  values={values}
                  onChange={handleChange}
                  textFieldProps={textFieldProps}
                />
                <div className={classes.actions}>
                  <IconButton
                    aria-label="back"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    <BackIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Take charge" : "Next"}
                  </Button>
                </div>
              </form>
            </StepContent>
          </Step>
        ))}
        <Step key={steps.length}>
          <StepLabel StepIconComponent={LastIcon}></StepLabel>
        </Step>
      </Stepper>
    </Paper>
  )
}

export default Onboarding
