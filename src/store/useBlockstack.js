import { useEffect, useRef } from "react"
import { UserSession, AppConfig } from "blockstack"

import { useStore } from "./store"

const FILE_PATH = "version-0.json"

const makeUserSession = () => {
  // Options are supposed to be optional,
  // but for some reason this throws an error in SSR
  const options = {
    appConfig: new AppConfig(),
  }
  return new UserSession(options)
}

const useBlockstack = () => {
  const userSession = useRef(makeUserSession()).current

  const [{ auth }, setState] = useStore()

  const updateAuthState = ({ user, isPending }) => {
    setState((state) => ({
      ...state,
      auth: {
        user,
        isPending,
      },
    }))
  }

  const getValue = (key) => {
    if (!auth.hasOwnProperty(key)) {
      console.warn(`No ${key} on auth slice of state`, auth)
    }
    return auth[key]
  }

  const signIn = () => {
    if (!userSession) return

    const signInRedirectURI = window.location.origin + "/app"
    const manifestURI = window.location.origin + "/manifest.webmanifest"

    updateAuthState({ isPending: true })

    userSession.redirectToSignIn(signInRedirectURI, manifestURI)
  }

  const signOut = () => {
    if (!userSession) return

    const signOutRedirectURI = window.location.origin + "/"

    // No need really as user is redirected
    updateAuthState({ isPending: true })

    userSession.signUserOut(signOutRedirectURI)
  }

  const putJson = async (json) => {
    if (!auth.user) return

    console.log("putJson", FILE_PATH, json)
    try {
      return userSession.putFile(FILE_PATH, JSON.stringify(json))
    } catch (error) {
      console.warn(error)
    }
  }

  const getJson = async () => {
    if (!auth.user) return

    try {
      const content = await userSession.getFile(FILE_PATH)
      const parsedContent = JSON.parse(content)
      console.log("getJson", FILE_PATH, parsedContent)
      return parsedContent
    } catch (error) {
      console.warn("getJson", error)
    }
  }

  useEffect(() => {
    if (!userSession || auth.user) return

    if (userSession.isUserSignedIn()) {
      const user = userSession.loadUserData()
      updateAuthState({ user, isPending: false })
    } else if (userSession.isSignInPending()) {
      updateAuthState({ isPending: true })
      userSession.handlePendingSignIn().then((user) => {
        updateAuthState({ user, isPending: false })
      })
    } else {
      updateAuthState({ isPending: false })
    }
  }, [])

  return [
    {
      auth,
      user: getValue("user"),
      isPending: getValue("isPending"),
    },
    {
      signIn,
      signOut,
      putJson,
      getJson,
    },
  ]
}

export default useBlockstack
