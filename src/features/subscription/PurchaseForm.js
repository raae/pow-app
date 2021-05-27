import React from "react"
import PropTypes from "prop-types"
import { isFunction } from "lodash"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  Box,
  FormControl,
  FormHelperText,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  FormLabel,
} from "@material-ui/core"

import { subscriptionPlanSchema } from "./slice"
import { useSubscription } from "./useSubscription"

export const PurchaseForm = ({ Component, onDone, description, ...props }) => {
  const { isLoading, purchaseSubscription } = useSubscription()

  const validationSchema = yup.object({
    subscriptionPlan: subscriptionPlanSchema,
  })

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleReset,
    setErrors,
  } = useFormik({
    initialValues: {
      subscriptionPlan: "yearly",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { error } = await purchaseSubscription({
        plan: values.subscriptionPlan,
      })

      if (error) {
        setErrors({
          subscriptionPlan: error.message,
        })
      } else {
        onDone()
      }
    },
  })

  const disabled = isSubmitting || isLoading

  return (
    <Component
      onSubmit={handleSubmit}
      onReset={handleReset}
      disabled={disabled}
      description={isFunction(description) ? description({}) : description}
      {...props}
    >
      <FormControl
        component="fieldset"
        error={Boolean(errors.subscriptionPlan)}
      >
        <Box mb={1}>
          <FormLabel component="legend" color="secondary">
            Choose your subscription plan
          </FormLabel>
        </Box>
        <RadioGroup
          aria-label="Subscription Plan"
          name="subscriptionPlan"
          value={values.subscriptionPlan}
          onChange={handleChange}
        >
          <FormControlLabel
            value="monthly"
            control={<Radio />}
            label={
              <Typography>
                USD <strong>4.50</strong> per month
              </Typography>
            }
          />
          <FormControlLabel
            value="yearly"
            control={<Radio />}
            label={
              <>
                <Typography component="span">
                  USD <strong>45.00</strong> per year
                </Typography>
                <Typography color="textSecondary" component="span">
                  {" "}
                  = 2 months free
                </Typography>
              </>
            }
          />
        </RadioGroup>
        {Boolean(values.subscriptionPlan) && (
          <FormHelperText>{errors.subscriptionPlan}</FormHelperText>
        )}
      </FormControl>
    </Component>
  )
}

PurchaseForm.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["form"])])
    .isRequired,
  title: PropTypes.string,
  onDone: PropTypes.func,
  description: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}

PurchaseForm.defaultProps = {
  Component: "form",
  onDone: () => {},
}
