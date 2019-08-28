import React from "react"

import {
  OpenInNew as WebsiteIcon,
  Email as SupportIcon,
  Face as TwitteIcon,
} from "@material-ui/icons"

export default [
  // {
  //   label: "Support POW!",
  //   text: "on Product Hunt",
  //   icon: <ProductHuntIcon />,
  //   component: "a",
  //   target: "_blank",
  //   rel: "noopener",
  //   href: "https://www.producthunt.com/",
  // },
  {
    label: "Support",
    text: "via email",
    icon: <SupportIcon />,
    component: "a",
    target: "_blank",
    rel: "noopener",
    href: "mailto:pow@raae.codes",
  },
  {
    label: "@raae",
    text: "on Twitter",
    icon: <TwitteIcon />,
    component: "a",
    target: "_blank",
    rel: "noopener",
    href: "https://twitter.com/raae",
  },
  {
    label: "Back to",
    text: "Website",
    icon: <WebsiteIcon />,
    component: "a",
    target: "_blank",
    rel: "noopener",
    href: "/",
  },
]
