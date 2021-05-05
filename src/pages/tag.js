import { navigate } from "gatsby"
import React from "react"
import { AppLayout, AppPageForm } from "../features/app"
import { SettingsMensesTagForm } from "../features/settings"
import { PROFILE } from "../features/navigation"

const Tag = () => {
  return (
    <AppLayout>
      <SettingsMensesTagForm
        Component={AppPageForm}
        title="Add menses tag"
        onDone={() => navigate(PROFILE.to)}
      />
    </AppLayout>
  )
}

export default Tag
