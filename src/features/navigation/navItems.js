import { Link } from "gatsby"

export const useSignUpNavItem = () => {
  return {
    children: "Sign up",
    component: "a",
    rel: "noopener",
    href: "https://usepow.app/sign-up",
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
    component: "a",
    target: "_blank",
    rel: "noopener",
  }
}
