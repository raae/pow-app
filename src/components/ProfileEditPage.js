import React from "react"
import { Link as GatsbyLink } from "gatsby"
// import Header from "./Header"
// import ProfileHeader from "./ProfileHeader"
// import ProfileOrder from "./ProfileOrder"
// import ProfileInventory from "./ProfileInventory"
import ProfileAddYearForm from "./ProfileAddYearForm"
// <ProfileOrder />
// <ProfileInventory />
// <ProfileHeader tagline="The TimeShip lives inside POW!" />
class ProfileEditPage extends React.Component {
  render() {
    return (
      <div>
        <form className="email-edit">
          <input type="text" required placeholder="🦄@usepow.app" />
          <button type="submit">Update</button>
        </form>
        <button type="button" component={GatsbyLink} to={`/profile/`}>
          Profile
        </button>
      </div>
    )
  }
}

export default ProfileEditPage
