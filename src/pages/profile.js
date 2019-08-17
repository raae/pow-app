import React from "react"
import { Link } from "gatsby"

import AppTemplate from "../templates/app"
import useBlockstack from "./../hooks/useBlockstack"
import Profile from "../components/Profile"

const App = () => {
  const { user, signOut } = useBlockstack()

  const navItems = [
    {
      label: "Back to app",
      variant: "outlined",
      component: Link,
      to: "/app",
    },
  ]

  return (
    <AppTemplate navItems={navItems}>
      <Profile user={user} signOut={signOut}></Profile>
    </AppTemplate>
  )
}

export default App
