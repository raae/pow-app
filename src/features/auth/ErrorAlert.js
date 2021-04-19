import React from "react"
import { Typography } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import { Link, useAppNavItem, useSignOutNavItem } from "../navigation"

import { useUser } from "../user"

const ErrorAlert = ({ error }) => {
  const appNavItem = useAppNavItem()
  const signOutNavItem = useSignOutNavItem()
  const { user } = useUser()

  if (!error) return null

  return (
    <Alert severity="error">
      <Typography component="div" variant="body2">
        {error.name === "UserAlreadySignedIn" ? (
          <>
            You are already logged in as <strong>{user?.username}</strong>. Go
            to <Link {...appNavItem}>app</Link> or{" "}
            <Link {...signOutNavItem}>sign out</Link>.
          </>
        ) : (
          <>{error.message}</>
        )}
      </Typography>
    </Alert>
  )
}

export default ErrorAlert
