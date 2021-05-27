import React from "react"
import PropTypes from "prop-types"
import { isFunction } from "lodash"
import { useFormik } from "formik"
import * as yup from "yup"

import { cycleLengthSchema } from "../../settings"
import { useOnboarding } from "../useOnboarding"
import { entryDateSchema } from "../../entries"

import MensesDateField from "./MensesDateField"
import CycleLengthField from "./CycleLengthField"

export const InitialCycleForm = ({
  Component,
  onDone,
  description,
  ...props
}) => {
  const { isLoading, mainMensesTag, setInitialCycle } = useOnboarding()

  const validationSchema = yup.object({
    mensesDate: entryDateSchema,
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
    onSubmit: async (values) => {
      const { errors: submitErrors } = await setInitialCycle(values)

      if (submitErrors) {
        setErrors(submitErrors)
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
      description={
        isFunction(description)
          ? description({
              isLoading,
              mensesTag: mainMensesTag,
            })
          : description
      }
      {...props}
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

InitialCycleForm.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["form"])])
    .isRequired,
  title: PropTypes.string,
  onDone: PropTypes.func,
}

InitialCycleForm.defaultProps = {
  Component: "form",
  onDone: () => {},
}
