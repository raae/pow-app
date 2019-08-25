import React from "react"
import { Link } from "gatsby"
import TodayIcon from "@material-ui/icons/Today"

const navItem = (variant) => {
  switch (variant) {
    case "profile":
      return {
        label: "Profile",
        variant: "outlined",
        component: Link,
        to: "/profile",
      }

    case "today":
      return {
        "aria-label": "Scroll to today",
        icon: <TodayIcon color="primary" />,
      }

    default:
      return null
  }
}

export default navItem
