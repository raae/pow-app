import React from "react"
import PropTypes from "prop-types"
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

import { useSettings } from "./useSettings"
import SettingsMensesTagForm from "./SettingsMensesTagForm"

const useStyles = makeStyles((theme) => ({
  avatar: {},
}))

const SettingsCard = ({ editNavItem }) => {
  const classes = useStyles()
  const { mainMensesTag, mensesTags } = useSettings()
  const restTagJsx = mensesTags
    .filter((tag) => tag !== mainMensesTag)
    .map((tag, index, restTags) => {
      const tagJsx = <strong key={index}>{tag}</strong>
      if (index === 0) {
        return tagJsx
      } else if (index < restTags.length - 1) {
        return [", ", tagJsx]
      } else {
        return [" and ", tagJsx]
      }
    })

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
                <strong>{mainMensesTag}</strong> is your current chosen
                menstruation tag
              </Typography>

              {mensesTags.length > 1 && (
                <Typography
                  className={classes.space}
                  variant="caption"
                  color="textSecondary"
                  gutterBottom
                >
                  However these past menstruation tags still indicate a
                  menstruation day: {restTagJsx}.
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
