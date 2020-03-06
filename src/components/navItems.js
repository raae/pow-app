import { useAuthActions, useAuthState } from "../auth"

import { Link as GatsbyLink } from "gatsby"

export const useSignUpNavItem = () => {
  return {
    label: "Sign up",
    component: GatsbyLink,
    to: "signup",
  }
}

export const useSignInNavItem = () => {
  const { user, isPending } = useAuthState()
  const sendToApp = user || isPending

  return {
    label: "Sign in",
    component: GatsbyLink,
    to: sendToApp ? "/day" : "/login",
    disabled: isPending,
  }
}

export const useSignOutNavItem = () => {
  const { signOut } = useAuthActions()
  const { user, isPending } = useAuthState()
  return {
    label: "Sign out",
    component: "button",
    type: "button",
    onClick: (event) => {
      event.preventDefault()
      signOut()
    },
    disabled: !user || isPending,
  }
}

export const useAccountNavItem = () => {
  return {
    label: "Account",
    component: GatsbyLink,
    to: "/account",
  }
}

export const useBillingNavItem = () => {
  return {
    label: "Billing",
    component: GatsbyLink,
    to: "/billing",
  }
}
