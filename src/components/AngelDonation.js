import React, { useState } from "react"
import {
  Paper,
  InputAdornment,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core"

import { BASE_URL } from "./../constants"
import StripeButton from "./StripeButton"

const LINE_ITEM = {
  name: "POW! Angel",
  description:
    "Donation to keep POW! open source and support @raae's efforts to educate developers on privacy in apps",
  images: [`${BASE_URL}/angel.jpg`],
  quantity: 1,
}

const OPTIONS = [8, 18, 54, 120]

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: "inline-block",
  },
  buttonGroup: {
    margin: theme.spacing(0.75) * -1,
    "& button": {
      margin: theme.spacing(0.75),
    },
  },
  form: {
    marginTop: theme.spacing(3),
  },
}))

const AngelDonation = ({ lineItem = LINE_ITEM, options = OPTIONS }) => {
  const classes = useStyles()

  const [values, setValues] = useState({
    amount: options[2],
    text: options[2],
    valid: true,
  })

  const handleAmountChange = (newAmount) => {
    setValues({
      amount: newAmount,
      text: newAmount,
      valid: true,
    })
  }

  const handleInputChange = (event) => {
    const value = event.target.value.trim()
    const intValue = parseInt(value, 10)

    if (isNaN(intValue)) {
      setValues({
        amount: 0,
        text: value,
        valid: false,
      })
    } else {
      handleAmountChange(intValue)
    }
  }

  const currentLineItem = {
    ...lineItem,
    amount: values.amount * 100,
    currency: "usd",
  }

  return (
    <Paper square className={classes.root} component="aside">
      <div className={classes.buttonGroup}>
        {options.map((option, index) => (
          <Button
            key={index}
            value={option}
            size="large"
            variant="outlined"
            color={option === values.text ? "primary" : undefined}
            onClick={() => handleAmountChange(option)}
          >
            {`$ ${option}`}
          </Button>
        ))}
      </div>

      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          label="Amount"
          value={values.text}
          inputMode="numeric"
          onChange={handleInputChange}
          fullWidth
          helperText="Select above, or type a custom amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: (
              <StripeButton
                color="primary"
                size="large"
                lineItem={currentLineItem}
              >
                Join
              </StripeButton>
            ),
          }}
        />
      </form>
    </Paper>
  )
}

export default AngelDonation
