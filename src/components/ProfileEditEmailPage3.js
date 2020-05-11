import React from "react"

function ProfileEditEmailPage3() {
  function createEmail(event) {
    event.preventDefault()
    const email = event.target.elements.emailInput.value
    alert(`You ${email}`)
  }
  return (
    <form onSubmit={createEmail}>
      <div>
        <label htmlFor="emailInput">Email</label>
        <input id="emailInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProfileEditEmailPage3
