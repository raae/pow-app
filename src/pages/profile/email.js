import React from "react"
import { navigate } from "gatsby"

import { AppLayout, AppPageForm } from "../../features/app"
import { EmailForm } from "../../features/user"

const ProfileIndexPage = () => {
  return (
    <AppLayout>
      <EmailForm
        Component={AppPageForm}
        title="Change email"
        onDone={() => navigate("..")}
      />
    </AppLayout>
  )
}

export default ProfileIndexPage
