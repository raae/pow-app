import React from "react"
import { Link } from "gatsby"

import {
  AccountCircle as ProfileIcon,
  List as TimelineIcon,
  OpenInNew as WebsiteIcon,
  Email as SupportIcon,
  Face as TwitteIcon,
  HighlightOff as SignOutIcon,
} from "@material-ui/icons"

export const useSignUpNavItem = () => {
  return {
    children: "Sign up",
    component: Link,
    href: "https://usepow.app/signup",
  }
}

export const useSignInNavItem = () => {
  return {
    children: "Log in",
    component: Link,
    to: "/timeline",
  }
}

export const useSignOutNavItem = () => {
  return {
    children: "Sign out",
    component: Link,
    to: "/signout",
  }
}

export const useProfileNavItem = () => {
  return {
    children: "Profile",
    component: Link,
    to: "/profile",
  }
}

export const useAppNavItem = () => {
  return {
    children: "Timeline",
    component: Link,
    to: "/timeline",
  }
}

export const useBetaNavItem = () => {
  return {
    children: "Beta",
    component: Link,
    to: "/beta",
  }
}

export const useWebsiteNavItem = () => {
  return {
    children: "POW! Website",
    href: "https://usepow.app",
    component: Link,
  }
}

const EXTERNAL = {
  target: "_blank",
  rel: "noopener",
  component: "a",
}

const INTERNAL = {
  component: Link,
}

export const TIMELINE = {
  primary: "Timeline",
  icon: <TimelineIcon />,
  to: "/timeline",
  ...INTERNAL,
}

export const SIGNOUT = {
  primary: "Log out",
  icon: <SignOutIcon />,
  to: "/signout",
  ...INTERNAL,
}

export const PROFILE = {
  primary: "Profile",
  icon: <ProfileIcon />,
  to: "/profile",
  ...INTERNAL,
}

export const SUPPORT = {
  primary: "Support",
  secondary: "support@usepow.app",
  icon: <SupportIcon />,
  href: "mailto:support@usepow.app",
  ...EXTERNAL,
}

export const TWITTER = {
  primary: "Made with ❤",
  secondary: "by @raae and family",
  icon: <TwitteIcon />,
  href: "https://twitter.com/raae",
  ...EXTERNAL,
}

export const WEBSITE = {
  primary: "Website (usepow.app)",
  icon: <WebsiteIcon />,
  href: "http://usepow.app",
  ...EXTERNAL,
}
