import React from "react"
import { useSelector } from "react-redux"
import { Typography } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

import { Link, useAppNavItem, useSignOutNavItem } from "../navigation"

import { selectUsername } from "./slice"

const ErrorAlert = ({ error }) => {
  const appNavItem = useAppNavItem()
  const signOutNavItem = useSignOutNavItem()
  const username = useSelector(selectUsername)

  if (!error) return null

  return (
    <Alert severity="error">
      <Typography component="div" variant="body2">
        {error.name === "UserAlreadySignedIn" ? (
          <>
            You are already logged in as <strong>{username}</strong>. Go to{" "}
            <Link {...appNavItem}>app</Link> or{" "}
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
