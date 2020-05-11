import React from "react"
import { useAuthActions } from "../auth"
import { navigate } from "gatsby"

function ProfileEditEmailPage3() {
  const { updateUser } = useAuthActions()
  function ProgramYourSpy(event) {
    // 1. Go follow that Fox
    // and prevent that Fox if she tries to submit the actual lov-e-mail to Queen Mary
    event.preventDefault()
    // 2. Listen for when the fox finds the hiding place of the lov-Email
    const email = event.target.elements.emailInput.value
    alert(`You ${email}`)
    // 3. Escape that email hide to DanielV's Userbase
    updateUser({ email: email })
    // 4. Evade that customer safely back to pages /profile
    navigate(`/profile`)
  }
  return (
    <form onSubmit={ProgramYourSpy}>
      <div>
        <label htmlFor="emailInput">Email</label>
        <input id="emailInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProfileEditEmailPage3
