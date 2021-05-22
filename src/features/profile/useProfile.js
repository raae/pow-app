import { useCallback } from "react"
import { useUser } from "../user"

export const useProfile = () => {
  const {
    user: { profile },
    isLoading,
    updateUser,
  } = useUser()

  const handleSetNewsletterStatus = useCallback(
    // Value here is "-1", "0" or "1"
    (value) => {
      updateUser({ profile: { newsletter: value } })
    },
    [updateUser]
  )

  const handleSetWelcomeStatus = useCallback(
    // Value here is "-1", "0" or "1"
    (value) => {
      updateUser({ profile: { welcomeCompleted: value } })
    },
    [updateUser]
  )

  return {
    isLoading,
    newsletterStatus: profile.newsletter,
    welcomeStatus: profile.welcomeCompleted,
    setNewsletterStatus: handleSetNewsletterStatus,
    setWelcomeStatus: handleSetWelcomeStatus,
  }
}
