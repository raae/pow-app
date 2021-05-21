import React from "react"
import { Link } from "gatsby"

import {
  AccountCircle as ProfileIcon,
  List as TimelineIcon,
  OpenInNew as WebsiteIcon,
  // Help as SupportIcon,
  Telegram as FeedbackIcon,
  Face as TwitterIcon,
  HighlightOff as SignOutIcon,
  PhoneAndroid as ChatIcon,
  PlaylistAddCheck as ChangelogIcon,
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
    to: "/timeline/",
  }
}

export const useSignOutNavItem = () => {
  return {
    children: "Sign out",
    component: Link,
    to: "/signout/",
  }
}

export const useProfileNavItem = () => {
  return {
    children: "Profile",
    component: Link,
    to: "/profile/",
  }
}

export const useAppNavItem = () => {
  return {
    children: "Timeline",
    component: Link,
    to: "/timeline/",
  }
}

export const useBetaNavItem = () => {
  return {
    children: "Beta",
    component: Link,
    to: "/beta/",
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

export const HOME = {
  primary: "Home",
  to: "/",
  ...INTERNAL,
}

export const INCOMPLETE = {
  to: "/incomplete/",
  ...INTERNAL,
}

export const TIMELINE = {
  primary: "Timeline",
  icon: <TimelineIcon />,
  to: "/timeline/",
  ...INTERNAL,
}

export const SIGN_OUT = {
  primary: "Log out",
  icon: <SignOutIcon />,
  to: "/signout/",
  ...INTERNAL,
}

export const SIGN_IN = {
  label: "Log in",
  primary: "Log in",
  to: "/login/",
  ...INTERNAL,
}

export const SIGN_UP = {
  label: "Create account",
  primary: "Sign up",
  href: "https://usepow.app/signup",
  to: "/signup/",
  ...EXTERNAL,
}

export const PROFILE = {
  primary: "Profile",
  icon: <ProfileIcon />,
  to: "/profile/",
  ...INTERNAL,
}

// export const SUPPORT = {
//   primary: "Need help?",
//   secondary: "support@usepow.app",
//   icon: <SupportIcon />,
//   href: "mailto:support@usepow.app",
//   ...EXTERNAL,
// }

export const FEEDBACK = {
  primary: "hello@usepow.app",
  secondary: "Send us your questions and/or feedback",
  icon: <FeedbackIcon />,
  href: "mailto:hello@usepow.app",
  ...EXTERNAL,
}

export const TWITTER = {
  primary: "Made with ❤",
  secondary: "by @raae and family",
  icon: <TwitterIcon />,
  href: "https://twitter.com/raae",
  ...EXTERNAL,
}

export const WEBSITE = {
  primary: "Website (usepow.app)",
  icon: <WebsiteIcon />,
  href: "https://usepow.app",
  ...EXTERNAL,
}

export const CHANGELOG = {
  primary: "Changelog",
  icon: <ChangelogIcon />,
  href: "https://usepow.app/changelog",
  ...EXTERNAL,
}

export const USER_CHAT = {
  primary: "Let's talk",
  secondary: "Book a call with @raae",
  icon: <ChatIcon />,
  href: "https://calendly.com/raae/pow-user",
  ...EXTERNAL,
}
