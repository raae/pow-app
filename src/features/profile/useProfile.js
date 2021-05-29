import { useCallback } from "react"
import { useUser } from "../user"

const validate = (value) => {
  const isValid = ["-1", "0", "1"].includes(value)
  if (!isValid) {
    throw new Error(`Invalid value: ${value}`)
  } else {
    return value
  }
}

export const useProfile = () => {
  const {
    user: { profile },
    isLoading,
    updateUser,
  } = useUser()

  const handleSetNewsletterStatus = useCallback(
    (value) => {
      updateUser({
        profile: { newsletter: validate(value) },
      })
    },
    [updateUser]
  )

  const handleSetWelcomeStatus = useCallback(
    (value) => {
      updateUser({
        profile: { welcomeCompleted: validate(value) },
      })
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
