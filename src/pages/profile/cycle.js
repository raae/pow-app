import React from "react"
import { navigate } from "gatsby"
import { Typography } from "@material-ui/core"

import { AppLayout, AppPageForm } from "../../features/app"
import { CycleSettingsForm } from "../../features/onboarding"

const ProfileIndexPage = () => {
  return (
    <AppLayout>
      <CycleSettingsForm
        Component={AppPageForm}
        title="Change initial cycle data"
        description={
          <Typography color="textSecondary" gutterBottom>
            To get you off to a good start it helps to know a little about your
            cycle. POW! will calibrate as you add entries. If you are unsure,
            feel free to skip this section.
          </Typography>
        }
        onDone={() => navigate("..")}
      />
    </AppLayout>
  )
}

export default ProfileIndexPage
