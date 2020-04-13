import React from "react"
// import Header from "./Header"
import ProfileHeader from "./ProfileHeader"
import ProfileOrder from "./ProfileOrder"
import ProfileInventory from "./ProfileInventory"

class ProfileEditPage extends React.Component {
  render() {
    return (
      <form className="email-edit">
        <input type="text" required placeholder="🦄@usepow.app" />
        <button type="submit">Update</button>
        <ProfileHeader />
        <ProfileOrder />
        <ProfileInventory />
      </form>
    )
  }
}

export default ProfileEditPage
