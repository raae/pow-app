import React from "react"
import { Link } from "gatsby"

import {
  ShowChart as ReportsIcon,
  AccountCircle as SettingsIcon,
  List as LogIcon,
} from "@material-ui/icons"

export default [
  {
    label: "Log",
    icon: <LogIcon />,
    component: Link,
    to: "/app",
  },
  {
    label: "Reports",
    text: "Coming soon",
    icon: <ReportsIcon />,
    disabled: true,
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    component: Link,
    to: "/app/settings",
  },
]
