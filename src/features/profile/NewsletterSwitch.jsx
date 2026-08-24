import React from "react"
import { FormControlLabel, Switch } from "@material-ui/core"

import { useProfile } from "./useProfile"

const NewsletterSwitch = () => {
  const { isLoading, newsletterStatus, setNewsletterStatus } = useProfile()

  const handleChangeNewsletterStatus = async (event) => {
    const status = event.target.checked ? "1" : "0"
    await setNewsletterStatus(status)
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={newsletterStatus === "1" ? true : false}
          onChange={handleChangeNewsletterStatus}
          disabled={isLoading}
        />
      }
      label="I would like to receive the POW! Newsletter"
    />
  )
}

export default NewsletterSwitch
