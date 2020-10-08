import React from "react"
import useForm from "../features/utils/useForm"

export default function OrderPage() {
  const { values, updateValue } = useForm({
    pasSword: "",
    email: "",
  })
  return (
    <>
      <form>
        <fieldset>
          <legend>TimeShip Dashboard</legend>
          <label htmlFor="pasSword">pasSword</label>
          <input
            type="password"
            name="pasSword"
            //value={pasSword.values}
            onChange={updateValue}
          />
          <label>Email Adress</label>
          <input type="email" />
          <label>Year</label>
          <input type="number" />
        </fieldset>
      </form>
    </>
  )
}
