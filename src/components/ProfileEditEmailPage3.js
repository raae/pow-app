import React, { useState } from "react"
import { useAuthActions } from "../auth"
import { navigate } from "gatsby"

const ProfileEditEmailPage3 = () => {
  const { updateUser } = useAuthActions()
  const [error, setError] = useState()
  const [status, setStatus] = useState()

  const ProgramYourSpy = async (event) => {
    // 1. Go follow that Fox
    // and prevent that Fox if she tries to submit the actual lov-e-mail to Queen Mary
    event.preventDefault()
    // 2. Listen for when the fox finds the hiding place of the lov-Email
    const email = event.target.elements.emailInput.value
    alert(`You ${email}`)
    // 3. Escape that email hide to DanielV's Userbase
    setStatus("pending")
    const result = await updateUser({ email: email })
    if (result.error) {
      setError(result.error)
      setStatus("idle")
    } else {
      setError(false)
      setStatus("idle")
      // 4. Evade that customer safely back to pages /profile
      navigate(`/profile`)
    }
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
