import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import { findKey } from "lodash"
import * as yup from "yup"

import { cycleLengthSchema } from "../../settings"
import { useOnboarding } from "../useOnboarding"
import { entryDateSchema } from "../../entries"
import { useAuth } from "../../auth"

import MensesDateField from "./MensesDateField"
import CycleLengthField from "./CycleLengthField"

export const CycleSettingsForm = ({
  Component,
  title,
  description,
  onDone,
}) => {
  const {
    mainMensesTag,
    setInitialCycleLength,
    setInitialMensesDate,
  } = useOnboarding()

  const { isAuthenticated } = useAuth()

  const validationSchema = yup.object({
    mensesDate: entryDateSchema.nullable(),
    cycleLength: cycleLengthSchema.nullable(),
  })

  const {
    touched,
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleReset,
    setErrors,
  } = useFormik({
    initialValues: {
      mensesDate: null,
      cycleLength: null,
    },
    validationSchema: validationSchema,
    onSubmit: async ({ mensesDate, cycleLength }) => {
      const submitErrors = {
        mensesDate: null,
        cycleLength: null,
      }

      if (mensesDate) {
        const { error: dateError } = await setInitialMensesDate(mensesDate)
        if (dateError) {
          submitErrors.mensesDate = dateError.message
        }
      }

      if (cycleLength) {
        const { error: lengthError } = await setInitialCycleLength(cycleLength)
        if (lengthError) {
          submitErrors.cycleLength = lengthError.message
        }
      }

      const hasError = findKey(submitErrors, (error) => Boolean(error))

      if (hasError) {
        setErrors(submitErrors)
      } else {
        onDone()
      }
    },
  })

  const disabled = isSubmitting || !isAuthenticated

  return (
    <Component
      onSubmit={handleSubmit}
      onReset={handleReset}
      disabled={disabled}
      title={title}
      description={description}
    >
      <MensesDateField
        fullWidth
        id="mensesDate"
        name="mensesDate"
        mensesTag={mainMensesTag}
        value={values.mensesDate}
        onChange={handleChange}
        error={touched.mensesDate && Boolean(errors.mensesDate)}
        helperText={touched.mensesDate && errors.mensesDate}
        disabled={disabled}
      />
      <CycleLengthField
        fullWidth
        id="cycleLength"
        name="cycleLength"
        mensesTag={mainMensesTag}
        value={values.cycleLength}
        onChange={handleChange}
        error={touched.cycleLength && Boolean(errors.cycleLength)}
        helperText={touched.cycleLength && errors.cycleLength}
        disabled={disabled}
      />
    </Component>
  )
}

CycleSettingsForm.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["form"])])
    .isRequired,
  title: PropTypes.string,
  onDone: PropTypes.func,
}

CycleSettingsForm.defaultProps = {
  Component: "form",
  onDone: () => {},
}
