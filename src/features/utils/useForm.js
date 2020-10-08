import React, { useState } from "react"

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults)
  function updateValue(event) {
    let value = event.target.value
    setValues({
      // copy in the old values
      ...values,
      // deconstruct the news
      [event.target.name]: value,
    })
  }
  return { values, updateValue }
}
