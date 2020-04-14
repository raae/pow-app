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
  emailRef = React.createRef()

  createEmail = (event) => {
    event.preventDefault()
    const email = {
      email: this.emailRef.current.value,
    }
    // console.log(this.emailRef.current.value)
    console.log(email)
    this.props.navigate(`/profile`)
  }
  render() {
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
      </div>
    )
  }
}

export default ProfileEditPage
