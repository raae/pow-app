import React from "react"
import { Link } from "gatsby"

import AppTemplate from "../templates/app"
import useAuth from "./../hooks/useAuth"

import Hero from "./../components/Hero"

const AppPage = () => {
  const { isPending } = useAuth()

  const navItems = [
    {
      label: "Profile",
      disabled: isPending,
      variant: "outlined",
      component: Link,
      to: "/profile",
    },
  ]

  return (
    <AppTemplate navItems={navItems}>
      <Hero>Track your period</Hero>
    </AppTemplate>
  )
}

export default AppPage
