import React, { useState } from "react"
import { useAuthActions } from "../auth"

const ProfileEditPage3 = () => {
  const { updateUser } = useAuthActions()
  function createEmail(event) {
    // 1. Prevent that form from naughtyly ____ auto
    event.preventDefault()
    // 2. Get that text from the input
    const email = event.target.elements.emailInput.value
    // 2. Send that input to Daniel V.'s Userbase
    updateUser({ email: email })
  }
  return (
    <form onSubmit={createEmail}>
      <div>
        <label htmlFor="emailInput">Email:</label>
        <input id="emailInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProfileEditPage3
