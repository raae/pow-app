import React, { useState } from "react"
import { useAuthActions } from "../auth"
import { navigate } from "gatsby"

const ProfileEditPage3 = () => {
  const { updateUser } = useAuthActions()
  function createEmail(event) {
    // 1. Prevent that form from naughtily self-submitting

    event.preventDefault()

    // 2. Get that email from the input

    const email = event.target.elements.emailInput.value

    // 3. Send that email to Daniel V.'s Userbase

    updateUser({ email: email })

    // 4. Send that customer back to /profile

    navigate(`/profile`)
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
