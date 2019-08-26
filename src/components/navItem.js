import React from "react"
import { Link } from "gatsby"
import TodayIcon from "@material-ui/icons/Today"

const navItem = (variant) => {
  switch (variant) {
    case "app":
      return {
        component: Link,
        to: "/app",
      }
    case "profile":
      return {
        component: Link,
        to: "/profile",
      }

    case "today":
      return {
        "aria-label": "Scroll to today",
        icon: <TodayIcon />,
      }

    default:
      return null
  }
}

export default navItem
