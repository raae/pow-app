import { useEffect, useRef } from "react"
import { UserSession, AppConfig } from "blockstack"

import { useStore } from "./store"

const FILE_PATH = "version-0.json"

const defaultState = {
  isPending: true,
}

const makeUserSession = () => {
  // Options are supposed to be optional,
  // but for some reason this throws in SSR
  const options = {
    appConfig: new AppConfig(),
  }
  return new UserSession(options)
}

const useBlockstack = () => {
  const userSession = useRef(makeUserSession()).current

  const [{ auth }, setState] = useStore()
  const { user, isPending } = auth || defaultState

  const updateAuthState = ({ user, isPending }) => {
    setState((state) => ({
      ...state,
      auth: {
        user,
        isPending,
      },
    }))
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
    if (!user) return

    try {
      return userSession.putFile(FILE_PATH, JSON.stringify(json))
    } catch (error) {
      console.warn(error)
    }
  }

  const getJson = async () => {
    if (!user) return

    try {
      const content = await userSession.getFile(FILE_PATH)
      return JSON.parse(content)
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    if (!userSession || user) return

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
      user: user,
      isPending: isPending,
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
