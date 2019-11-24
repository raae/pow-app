import { startWith, map, exhaustMap, filter } from "rxjs/operators"
import { ofType } from "redux-observable"

import { UserSession } from "blockstack"

import slice from "./slice"

const { signInFulfilled, signInFailed } = slice.actions

const userSession = typeof window !== `undefined` ? new UserSession() : null

const initAuth = async () => {
  if (!userSession) return

  let user = null
  if (userSession.isUserSignedIn()) {
    user = userSession.loadUserData()
  } else if (userSession.isSignInPending()) {
    user = await userSession.handlePendingSignIn()
  } else {
    throw new Error("auth: No user pending or signed in")
  }

  if (!user) {
    throw new Error("auth: No user data")
  }

  return user
}

export const initEpic = (action$) =>
  action$.pipe(
    startWith({ type: "auth/init" }),
    ofType("auth/init"),
    exhaustMap(async () => {
      try {
        const user = await initAuth()
        return signInFulfilled({ user })
      } catch ({ message }) {
        return signInFailed({ error: { message } })
      }
    })
  )

export const signInEpic = (action$) =>
  action$.pipe(
    ofType("auth/signIn"),
    map(() => {
      if (!userSession) return

      const signInRedirectURI = window.location.origin + "/app"
      const manifestURI = window.location.origin + "/manifest.webmanifest"

      userSession.redirectToSignIn(signInRedirectURI, manifestURI)
      return null
    }),
    filter((action) => !!action)
  )

export const signOutEpic = (action$) =>
  action$.pipe(
    ofType("auth/signOut"),
    map(() => {
      if (!userSession) return

      const signOutRedirectURI = window.location.origin + "/"

      userSession.signUserOut(signOutRedirectURI)
      return null
    }),
    filter((action) => !!action)
  )

export default [initEpic, signInEpic, signOutEpic]
