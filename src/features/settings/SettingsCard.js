import React from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { tail } from "lodash"
import {
  Avatar,
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { Settings as SettingsIcon } from "@material-ui/icons"

import { selectMensesTags, selectMainMensesTag } from "./slice"

import SettingsMensesTagForm from "./SettingsMensesTagForm"

const useStyles = makeStyles((theme) => ({
  avatar: {},
}))

const SettingsCard = ({ editNavItem }) => {
  const classes = useStyles()

  const mainMensesTag = useSelector(selectMainMensesTag)
  const mensesTags = useSelector(selectMensesTags)
  const restTags = tail(mensesTags)

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
        <Box mb={2}>
          {!mainMensesTag ? (
            <>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                POW! tracks your cycles using hashtags
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Input the term you would like to use to indicate menstruation
                days.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                <strong>#{mainMensesTag}</strong> is your chosen menstruation
                tag
              </Typography>

              {restTags.length > 0 && (
                <Typography
                  className={classes.space}
                  variant="caption"
                  color="textSecondary"
                  gutterBottom
                >
                  But these past menstruation tags also indicate a menstruation
                  day:{" "}
                  {restTags.map((tag, index) => [
                    index > 0 &&
                      (index === restTags.length - 1 ? " and " : ", "),
                    <strong key={index}>#{tag}</strong>,
                  ])}
                  .
                </Typography>
              )}
            </>
          )}
        </Box>

        {!mainMensesTag && (
          <SettingsMensesTagForm>
            <Button type="submit" color="secondary" variant="outlined">
              Save
            </Button>
          </SettingsMensesTagForm>
        )}

        {mainMensesTag && editNavItem && (
          <Button {...editNavItem} variant="outlined" color="secondary" />
        )}
      </CardContent>
    </Card>
  )
}

SettingsCard.propTypes = {
  editNavItem: PropTypes.shape({
    component: PropTypes.elementType,
    to: PropTypes.string,
    children: PropTypes.node,
  }),
}

export default SettingsCard
