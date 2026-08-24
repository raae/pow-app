import React from "react"

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link,
  makeStyles,
} from "@material-ui/core"
import { Favorite as BetaIcon } from "@material-ui/icons"

import { CardContentSection } from "../../components"

import { USER_CHAT } from "../navigation"

const useStyles = makeStyles((theme) => ({
  avatar: {},
  listItem: {
    display: "flex",
    flexWrap: "wrap",
  },
}))

const BetaCard = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <BetaIcon />
          </Avatar>
        }
        title="Help make POW! better?"
      />
      <CardContent>
        <CardContentSection
          title="Let's talk!"
          subheader={
            <>
              Help make POW! better for you by{" "}
              <Link {...USER_CHAT}>signing up for a 30-minute</Link> chat with
              me, Benedicte (@raae), so I can learn more about what you need
              from POW!
            </>
          }
        >
          <Typography variant="caption" color="textSecondary">
            We'll talk using Whereby video conferencing, but you decide if you
            want the camera on or off — no need to install or sign up for
            anything.
          </Typography>
        </CardContentSection>
      </CardContent>
    </Card>
  )
}

BetaCard.propTypes = {}

export default BetaCard
