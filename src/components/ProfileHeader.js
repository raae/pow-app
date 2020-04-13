import React from "react"

class ProfileHeader extends React.Component {
  render() {
    return (
      <header classname="top">
        <h1>Email of the Day</h1>
        <h3 classname="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    )
  }
}

export default ProfileHeader
