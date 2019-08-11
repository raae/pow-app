import { useState, useEffect } from "react"
import { AppConfig, UserSession } from "blockstack"

const appConfig = new AppConfig(["store_write"])
const userSession = new UserSession({ appConfig })

const useAuth = ({ force } = {}) => {
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
  }
}

export default useAuth
