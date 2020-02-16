import React, { useState, useEffect } from "react"

import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core"
import LastDateInput from "./LastDateInput"

import localforage from "localforage"

const useStyles = makeStyles((theme) => ({
  root: {
    "& h3 + p, & h3 + ul": {
      marginTop: "-0.5rem",
    },
    "& p + ul": {
      marginTop: "-1rem",
    },
    "& hr": {
      margin: "2rem 0",
    },
    "& ul": {
      paddingLeft: "1.5em",
      listStyleType: "circle",
      "@media only screen and (max-width: 40rem)": {
        paddingLeft: "1.225em",
      },
    },
  },
  cycle: {
    display: "inline-block",
    "& > *:first-child": {
      marginTop: "0.5em",
    },
    "& > *:last-child > *": {
      marginTop: "1.5em",
      minWidth: "12em",
    },
    "& > *:last-child > *:first-child": {
      marginRight: "1em",
    },
  },
  icon: {
    marginRight: "3px",
    marginTop: "2px",
  },
}))

const placeholders = {
  tag: "period",
  lastStart: null,
  cycleLength: "28",
  menstruationLength: "4",
}

const initialValues = {
  tag: "",
  lastStart: null,
  cycleLength: "",
  menstruationLength: "",
  subscriptionPlan: "yearly",
}

const Onboarding = () => {
  const classes = useStyles()

  const [values, setValues] = useState(initialValues)
  const [tag, setTag] = useState(placeholders.tag)

  useEffect(() => {
    setTag(values.tag || placeholders.tag)
  }, [values])

  useEffect(() => {
    const ENTER_CODE = 13
    const handleKeyPress = (event) => {
      if (event.which === ENTER_CODE) {
        document.querySelectorAll("input").forEach((item) => item.blur())
      }
    }
    document.addEventListener("keypress", handleKeyPress)
    return () => {
      document.removeEventListener("keypress", handleKeyPress)
    }
  }, [])

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

  const completeOnboarding = () => {
    localforage
      .setItem("onboarding", values)
      .then(function() {
        console.log("Saved to local storage")
        // redirect to log in
      })
      .catch(function({ message }) {
        console.log("Error saving to local storage", message)
        // redirect to log in
      })
  }

  const textFieldProps = {
    color: "secondary",
    variant: "outlined",
    margin: "none",
  }

  return (
    <div className={classes.root}>
      <h3>Take charge with hashtags</h3>
      <p>
        With POW! you track symptoms, moods, actions, or whatever you would like
        to keep a close eye on, using hashtags.
      </p>
      <p>
        Think of it as writing an Instagram caption or tweet, highlighting key
        trends with hashtags.
      </p>
      <p>It can be short and sweet, or more like a diary entry:</p>
      <ul>
        <li>Feeling #energized and ready to rule the world.</li>
        <li>Really #bloated and in a #funky mood.</li>
        <li>#sexytime</li>
        <li>#{tag} started today.</li>
        <li>
          Very #upbeat today, hope it stays this way for a couple of more days.
        </li>
      </ul>

      <h3>Your menstruation tag</h3>
      <p>This tag is used on the days you menstruate.</p>
      <ul>
        <li>You can stick with the default,</li>
        <li>or input whatever works for you.</li>
      </ul>

      <TextField
        {...textFieldProps}
        label="Your menstruation tag"
        value={values.tag}
        onChange={handleChange("tag")}
        placeholder={placeholders.tag}
        inputProps={{
          autoCorrect: "off",
          autoCapitalize: "none",
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
      />

      <p>Some example #{tag} entries:</p>
      <ul>
        <li>Feeling #tired and also #{tag}.</li>
        <li>#{tag}</li>
        <li>#{tag} #cramps #tired</li>
      </ul>

      <h3>Your cycle</h3>
      <p>
        To get you of to a good start it helps to know a little about your
        cycle.
      </p>
      <ul>
        <li>POW! will calibrate as you add entries.</li>
        <li>If you are unsure, feel free to skip this section.</li>
      </ul>
      <div className={classes.cycle}>
        <LastDateInput
          value={values.lastStart}
          onChange={handleChange("lastStart")}
          inputProps={textFieldProps}
        />
        <div>
          <TextField
            {...textFieldProps}
            label="Days between menstruation"
            value={values.cycleLength}
            type="number"
            onChange={handleChange("cycleLength")}
            placeholder={placeholders.cycleLength}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />
          <TextField
            {...textFieldProps}
            label="Days of menstruation"
            value={values.menstruationLength}
            type="number"
            onChange={handleChange("menstruationLength")}
            placeholder={placeholders.menstruationLength}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      <h3>Your subscription</h3>
      <p>
        Pay monthly, or get 2 months for free by going for a yearly
        subscription.
      </p>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Subscription Plan"
          name="subscriptionPlan"
          value={values.subscriptionPlan}
          onChange={handleChange("subscriptionPlan")}
        >
          <FormControlLabel
            value="monthly"
            control={<Radio />}
            label={
              <Typography>
                USD <strong>4.00</strong> per year
              </Typography>
            }
          />
          <FormControlLabel
            value="yearly"
            control={<Radio />}
            label={
              <Typography>
                USD <strong>40.00</strong> per year
              </Typography>
            }
          />
        </RadioGroup>
      </FormControl>

      <Divider variant="inset" />

      <Button onClick={completeOnboarding} variant="contained" color="primary">
        Take charge
      </Button>
    </div>
  )
}

export default Onboarding
