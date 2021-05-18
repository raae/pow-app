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
import { MensesTags } from "./MensesTags"

const useStyles = makeStyles((theme) => ({
  avatar: {},
}))

const SettingsCard = ({ editNavItem }) => {
  const classes = useStyles()
  const { mainMensesTag, mensesTags } = useSettings()

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
                  menstruation day: <MensesTags />.
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
