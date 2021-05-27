import React from "react"
import { navigate } from "gatsby"
import { Typography } from "@material-ui/core"
import { AppLayout, AppPageForm } from "../../features/app"
import { AddMensesTagForm } from "../../features/settings"

const Description = ({ mensesTag = "period" }) => {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        To get started input the tag/term you would like to use to log the days
        you menstruate.
      </Typography>
      <Typography variant="body2" gutterBottom>
        POW! has no preconfigured symptoms or moods; you will use hashtags to
        keep an extra eye on what you believe is essential in your cycle.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Some examples entries:
      </Typography>
      <Typography variant="body2" color="textSecondary" component="ul">
        <li>
          First day of my <strong>#{mensesTag}</strong>, feeling{" "}
          <strong>#exhausted</strong> physically.
        </li>
        <li>
          Having an awesome day! Feeling <strong>#strong</strong> and also quite{" "}
          <strong>#horny</strong>.
        </li>
        <li>
          <strong>#{mensesTag}</strong> <strong>#cramps</strong>{" "}
          <strong>#tired</strong>
        </li>
      </Typography>
    </>
  )
}

const IncompleteTag = () => {
  return (
    <AppLayout>
      <AddMensesTagForm
        Component={AppPageForm}
        title="Customize your period tag"
        onDone={() => navigate("..")}
        description={({ isLoading, mensesTag }) => {
          if (isLoading) {
            return null
          } else {
            return <Description mensesTag={mensesTag} />
          }
        }}
      />
    </AppLayout>
  )
}

export default IncompleteTag
