import { useState, useEffect, useRef } from "react"
import { UserSession } from "blockstack"

const FILE_PATH = "test/test.json"

const useBlockstack = () => {
  const userSession = useRef(new UserSession()).current
  const [isPending, setIsPending] = useState(true)
  const [user, setUser] = useState(null)

  const signIn = () => {
    if (!userSession) return

    const signInRedirectURI = window.location.origin + "/app"
    const manifestURI = window.location.origin + "/manifest.webmanifest"

    setIsPending(true)
    userSession.redirectToSignIn(signInRedirectURI, manifestURI)
  }

  const signOut = () => {
    if (!userSession) return

    const signOutRedirectURI = window.location.origin + "/"

    setIsPending(true)
    userSession.signUserOut(signOutRedirectURI)
  }

  const putJson = async json => {
    if (!userSession) return

    try {
      return userSession.putFile(FILE_PATH, JSON.stringify(json))
    } catch (error) {
      console.warn(error)
    }
  }

  const getJson = async () => {
    if (!userSession) return

    try {
      const content = await userSession.getFile(FILE_PATH)
      return JSON.parse(content)
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    if (!userSession) return

    if (userSession.isUserSignedIn()) {
      setIsPending(false)
      setUser(userSession.loadUserData())
    } else if (userSession.isSignInPending()) {
      setIsPending(true)
      userSession.handlePendingSignIn().then(userData => {
        setUser(userData)
        setIsPending(false)
      })
    } else {
      setIsPending(false)
    }
  }, [])

  return {
    user,
    isAuthenticated: !!user,
    isPending,
    signIn,
    signOut,
    putJson,
    getJson,
  }
}

export default useBlockstack
