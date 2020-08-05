import { Link } from "gatsby"
import { BASE_URL } from "../constants"

export const useSignUpNavItem = () => {
  return {
    children: "Sign up",
    component: Link,
    to: "/signup",
  }
}

export const useSignInNavItem = () => {
  return {
    children: "Log in",
    component: Link,
    to: "/cycle",
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
    children: "Cycle",
    component: Link,
    to: "/cycle",
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
    href: BASE_URL,
    component: "a",
    target: "_blank",
    rel: "noopener",
  }
}
