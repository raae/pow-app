import { useAuthActions, useAuthState } from "../auth"

import { Link as GatsbyLink } from "gatsby"

export const useSignUpAction = () => {
  return {
    label: "Sign up",
    component: GatsbyLink,
    to: "signup",
  }
}

export const useSignInAction = () => {
  const { user, isPending } = useAuthState()
  const sendToApp = user || isPending

  return {
    label: "Sign in",
    component: GatsbyLink,
    to: sendToApp ? "/day" : "/login",
    disabled: isPending,
  }
}

export const useSignOutAction = () => {
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
