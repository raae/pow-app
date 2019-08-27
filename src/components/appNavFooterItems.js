import React from "react"

import {
  OpenInNew as WebsiteIcon,
  Ballot as ProductHuntIcon,
} from "@material-ui/icons"

export default [
  {
    label: "Support POW!",
    text: "on Product Hunt",
    icon: <ProductHuntIcon />,
    component: "a",
    target: "_blank",
    rel: "noopener",
    href: "https://www.producthunt.com/",
  },
  {
    label: "Open Website",
    icon: <WebsiteIcon />,
    component: "a",
    target: "_blank",
    rel: "noopener",
    href: "/",
  },
]
