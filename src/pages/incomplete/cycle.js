import React from "react"
import { Typography } from "@material-ui/core"
import { navigate } from "gatsby"

import { AppLayout, AppPageForm } from "../../features/app"
import { InitialCycleForm } from "../../features/onboarding"

const Description = ({ mensesTag = "period" }) => {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        To start making sense of your cycle POW! needs to know the day of your
        last, or current, <strong>{mensesTag}</strong>.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>No rush</strong>, let POW! know when you are ready.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Don't know your approximate <strong>{mensesTag}</strong> cycle length?
        <br />
        Skip it, and POW! will start out using the standard 28 days.
      </Typography>
    </>
  )
}

const IncompleteCycle = () => {
  return (
    <AppLayout>
      <InitialCycleForm
        Component={AppPageForm}
        title="Initial cycle"
        description={({ mensesTag }) => <Description mensesTag={mensesTag} />}
        onDone={() => navigate("..")}
      />
    </AppLayout>
  )
}

export default IncompleteCycle
