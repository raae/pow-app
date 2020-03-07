import { BASE_URL } from "../constants"
import { useAuthState } from "../auth"

import { Link } from "gatsby"

export const useSignUpNavItem = () => {
  return {
    label: "Sign up",
    component: Link,
    to: "/signup",
  }
}

export const useSignInNavItem = () => {
  const { user, isPending } = useAuthState()
  const sendToApp = user || isPending

  return {
    label: "Log in",
    component: Link,
    to: sendToApp ? "/cycle" : "/login",
    disabled: isPending,
  }
}

export const useSignOutNavItem = () => {
  const { user, isPending } = useAuthState()
  return {
    label: "Sign out",
    component: Link,
    to: "/signout",
    disabled: !user || isPending,
  }
}

export const useProfileNavItem = () => {
  return {
    label: "Profile",
    component: Link,
    to: "/profile",
  }
}

export const useAppNavItem = () => {
  return {
    label: "Cycle",
    component: Link,
    to: "/cycle",
  }
}

export const useBetaNavItem = () => {
  return {
    label: "Beta",
    component: Link,
    to: "/beta",
  }
}

export const useWebsiteNavItem = () => {
  return {
    label: "POW! Website",
    component: "a",
    target: "_blank",
    rel: "noopener",
    href: BASE_URL,
  }
}
