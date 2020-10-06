import React, { useState } from "react"
import { navigate } from "gatsby"
import { useDispatch } from "react-redux"
import { updateUser, selectUserEmail } from "../auth"

export default function ProfileEditPasSwordPage() {
  const dispatch = useDispatch()
  const createEmail = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting
    event.preventDefault()
    // 2. Listen for those PasSwords from those inputs
    const oldPasSword = event.target.elements.oldPasSwordInput.value
    const newPasSword = event.target.elements.newPasSwordInput.value

    // 3. Do somethings like, send those PasSwords to Daniel's and  ...'s Userbase
    const { error } = await dispatch(
      updateUser({ currentPassword: oldPasSword, newPassword: newPasSword })
    )

    // 3. Do somethings like, send that customer back to /profile or give alert if error
    if (error) {
      //setIsPending(false)
      // what does this mean?
      alert(error.message)
    } else {
      navigate(`/profile`)
    }
  }
  return (
    <form onSubmit={createEmail}>
      <div>
        <label htmlFor="oldPasSwordInput">Old pasSword</label>
        <input id="oldPasSwordInput" type="password" />
      </div>
      <div>
        <label htmlFor="newPasSwordInput">New pasSword</label>
        <input id="newPasSwordInput" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
