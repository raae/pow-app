import React from "react"
import { Typography } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { Link } from "../../navigation"

const PasswordNote = () => {
  return (
    <Alert severity="info">
      <Typography component="div">
        There is no password recovery in apps securing your data with
        encryption. So please <strong>do</strong> write down this password
        somewhere safe. I recommend using a password manager and my favorite is{" "}
        <Link href="https://1password.com/">1Password</Link>.
      </Typography>
    </Alert>
  )
}

export default PasswordNote
