import React from "react"

import { FormControlLabel, Switch } from "@material-ui/core"
import { useUser } from "../user"

const NewsletterSwitch = (props) => {
  const { user, updateUser } = useUser()

  const handleChange = (name) => (event) => {
    // Handle newsletter subscription change

    const profileChange = {
      [name]: event.target.checked ? "1" : "0",
    }

    updateUser({
      profile: profileChange,
    })
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={user?.profile?.newsletter === "1" ? true : false}
          onChange={handleChange("newsletter")}
          value="newsletter"
          {...props}
        />
      }
      label="I would like to receive the POW! Newsletter"
    />
  )
}

export default NewsletterSwitch
