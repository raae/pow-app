import React from "react"
import { navigate } from "gatsby"
import { Typography } from "@material-ui/core"
import { AppLayout, AppPageForm } from "../features/app"
import { AddMensesTagForm, MensesTags } from "../features/settings"
import { PROFILE } from "../features/navigation"

const Description = () => {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        You may change your chosen period tag.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Or more correctly add a period tag. These tags:{" "}
        <MensesTags withMainTag /> will still indicate menstruation days, so
        please do not reuse them for other purposes.
      </Typography>
    </>
  )
}

const Tag = () => {
  return (
    <AppLayout>
      <AddMensesTagForm
        Component={AppPageForm}
        title="Change period tag"
        onDone={() => navigate(PROFILE.to)}
        description={({ isLoading }) => {
          if (isLoading) {
            return null
          } else {
            return <Description />
          }
        }}
      />
    </AppLayout>
  )
}

export default Tag
