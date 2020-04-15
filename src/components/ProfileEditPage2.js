import React, { useState } from "react"

const ProfileEditPage2 = () => {
  const [email, setEmail] = useState("")

  addEmail = (email) => {
    // 1. Ta
    const emails = { ...this.state.emails }
    // 2. Add our new emails to that emails variable
    emails[`email${Date.now()}`] = email
    // 3. Set the new emails object to state
    this.setEmail({
      emails,
    })
  }
  emailRef = React.createRef()

  createEmail = (event) => {
    event.preventDefault()
    const email = {
      email: this.emailRef.current.value,
    }
    // console.log(this.emailRef.current.value)
    console.log(email)
    this.props.navigate(`/profile`)
    event.currentTarget.reset()
  }

  return (
    <div>
      <form className="email-edit" onSubmit={this.createEmail}>
        <input
          type="text"
          ref={this.emailRef}
          required
          placeholder="unicorn@usepow.app"
        />
        <button type="submit">Update</button>
      </form>
      <div>
        <GatsbyLink to="/profile/">profile</GatsbyLink>
      </div>
    </div>
  )
}

export default ProfileEditPage2
