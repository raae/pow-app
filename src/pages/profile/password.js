import React from "react"
import { navigate } from "gatsby"

import { AppLayout, AppPageForm } from "../../features/app"
import { PasswordForm } from "../../features/user"

const ProfileIndexPage = () => {
  return (
    <AppLayout>
      <PasswordForm
        Component={AppPageForm}
        title="Change password"
        onDone={() => navigate("..")}
      />
    </AppLayout>
  )
}

export default ProfileIndexPage
