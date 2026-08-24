import React from "react"
import { useNavigate } from "react-router-dom"

import { AppLayout, AppPageForm } from "../../features/app"
import { PasswordForm } from "../../features/user"
import { PROFILE } from "../../features/navigation"

const ProfileIndexPage = () => {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <PasswordForm
        Component={AppPageForm}
        title="Change password"
        onDone={() => navigate(PROFILE.to)}
      />
    </AppLayout>
  )
}

export default ProfileIndexPage
