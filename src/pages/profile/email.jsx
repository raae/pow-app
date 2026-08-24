import React from "react"
import { useNavigate } from "react-router-dom"

import { AppLayout, AppPageForm } from "../../features/app"
import { EmailForm } from "../../features/user"
import { PROFILE } from "../../features/navigation"

const ProfileIndexPage = () => {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <EmailForm
        Component={AppPageForm}
        title="Change email"
        onDone={() => navigate(PROFILE.to)}
      />
    </AppLayout>
  )
}

export default ProfileIndexPage
