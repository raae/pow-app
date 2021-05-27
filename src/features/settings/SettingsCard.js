import React from "react"
import PropTypes from "prop-types"
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
} from "@material-ui/core"
import { Settings as SettingsIcon } from "@material-ui/icons"

import { useSettings } from "./useSettings"
import SettingsMensesTagForm from "./SettingsMensesTagForm"
import { MensesTags } from "./MensesTags"
import { CardContentSection } from "../../components"

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
        {!mainMensesTag ? (
          <CardContentSection
            title="POW! tracks your cycles using hashtags"
            subheader="Input the term you would like to use to indicate menstruation
                days."
          >
            <SettingsMensesTagForm>
              <Button type="submit" color="secondary" variant="outlined">
                Save
              </Button>
            </SettingsMensesTagForm>
          </CardContentSection>
        ) : (
          <CardContentSection
            title={
              <>
                <strong>{mainMensesTag}</strong> is your current chosen
                menstruation tag
              </>
            }
            subheader={
              <>
                However these past tag{mensesTags.length > 1 ? "s" : ""} still
                indicate menstruation <MensesTags />, so please do not reuse
                them for other purposes.
              </>
            }
          >
            {editNavItem && (
              <Button {...editNavItem} variant="outlined" color="secondary" />
            )}
          </CardContentSection>
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
