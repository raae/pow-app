import React, { useState } from "react"
import { Link as GatsbyLink } from "gatsby"
import { useAuthActions } from "../auth"

const ProfileEditPage3 = () => {
  function createEmail(event) {
    event.preventDefault()
    console.dir(event.target.elements.emailInput.value)
    const email = event.target.elements.emailInput.value
    alert(`You ${email}`)
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

// emailRef = React.createRef()

// createEmail = (event) => {
//   event.preventDefault()
//   const email = {
//     email: this.emailRef.current.value,
//   }
//   // console.log(this.emailRef.current.value)
//   console.log(email)
//   this.props.navigate(`/profile`)
//   event.currentTarget.reset()
// }
