import { Link } from "gatsby"
import { useSelector } from "react-redux"

import { BASE_URL } from "../constants"

import { selectAuthUser, selectAuthIsPending } from "../auth/slice"

export const useSignUpNavItem = () => {
  return {
    label: "Sign up",
    component: Link,
    to: "/signup",
  }
}

export const useSignInNavItem = () => {
  const user = useSelector(selectAuthUser)
  const isPending = useSelector(selectAuthIsPending)

  const sendToApp = user || isPending

  return {
    label: "Log in",
    component: Link,
    to: sendToApp ? "/cycle" : "/login",
  }
}

export const useSignOutNavItem = () => {
  return {
    label: "Sign out",
    component: Link,
    to: "/signout",
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
