import React from "react"
import { Link, Typography } from "@material-ui/core"
import { navigate } from "gatsby"

import { AppLayout, AppPageForm } from "../../features/app"
import { PurchaseForm } from "../../features/subscription"

const Description = () => {
  // TODO: Customize to subscription status,
  // in case of "cancelled" and other after onboading payment.

  return (
    <>
      <Typography variant="body1" gutterBottom>
        <strong>60 days money back guaranty</strong>; you may cancel and get a
        refund at any point during the first 60 days.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Payment handled by <Link href="https://stripe.com">Stripe</Link>.
      </Typography>
    </>
  )
}

const IncompletePayment = () => {
  return (
    <AppLayout>
      <PurchaseForm
        Component={AppPageForm}
        title="Payment"
        description={() => <Description />}
        onDone={() => navigate("..")}
      />
    </AppLayout>
  )
}

export default IncompletePayment
