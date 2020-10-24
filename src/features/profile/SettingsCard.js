import React from "react"

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
} from "@material-ui/core"
import { Settings as SettingsIcon } from "@material-ui/icons"

import { SettingsForm } from "../settings"

const useStyles = makeStyles((theme) => ({
  avatar: {},
  listItem: {
    display: "flex",
    flexWrap: "wrap",
  },
}))

const SettingsCard = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <SettingsIcon />
          </Avatar>
        }
        title="Settings"
      />
      <CardContent>
        <SettingsForm standalone={false} />
      </CardContent>
    </Card>
  )
}

SettingsCard.propTypes = {}

export default SettingsCard
