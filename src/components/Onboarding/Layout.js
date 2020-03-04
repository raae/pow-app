import React from "react"

import {
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Button,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import BackIcon from "@material-ui/icons/KeyboardBackspace"
import DoneIcon from "@material-ui/icons/FiberManualRecord"

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(4) * -1,
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

const LastIcon = () => {
  return <DoneIcon color="disabled" />
}

const Onboarding = ({ steps, activeStep, handleBack }) => {
  const classes = useStyles()

  return (
    <Stepper
      className={classes.root}
      activeStep={activeStep}
      orientation="vertical"
      elevation={1}
      square={false}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>
            {step.label}
            {step.optional && (
              <Typography variant="caption"> Optional</Typography>
            )}
          </StepLabel>
          <StepContent>
            {step.handleSubmit ? (
              <form className={classes.form} onSubmit={step.handleSubmit}>
                {step.content}
                <div className={classes.actions}>
                  {!step.submitOnly && (
                    <IconButton
                      aria-label="back"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      <BackIcon />
                    </IconButton>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                    disabled={step.disabled}
                    className={classes.button}
                  >
                    {step.submitLabel}
                  </Button>
                </div>
              </form>
            ) : (
              <>{step.content}</>
            )}
          </StepContent>
        </Step>
      ))}
      <Step key={steps.length}>
        <StepLabel StepIconComponent={LastIcon}></StepLabel>
      </Step>
    </Stepper>
  )
}

export default Onboarding
