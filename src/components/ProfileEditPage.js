import React from "react"

class ProfileEditPage extends React.Component {
  render() {
    return (
      <form className="email-edit">
        <input type="text" required placeholder="🦄@usepow.app" />
        <button type="submit">Update</button>
      </form>
    )
  }
}

export default ProfileEditPage
