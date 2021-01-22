const Stripe = require("stripe")
const axios = require("axios")
const overrideEnvs = require("./env")

overrideEnvs()

const {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_CHECKOUT_SECRET,
  USERBASE_ADMIN_API_ACCESS_TOKEN,
  STRIPE_WEBHOOK_CHECKOUT_SECRET_DEPLOY_PREVIEW,
  STRIPE_SECRET_KEY_DEPLOY_PREVIEW,
  CONTEXT,
} = process.env

exports.handler = async (req) => {
  try {
    console.log("plain", {
      webhookSecret: STRIPE_WEBHOOK_CHECKOUT_SECRET,
      secretKey: STRIPE_SECRET_KEY,
      context: CONTEXT,
    })

    console.log("preview", {
      webhookSecret: STRIPE_WEBHOOK_CHECKOUT_SECRET_DEPLOY_PREVIEW,
      secretKey: STRIPE_SECRET_KEY_DEPLOY_PREVIEW,
    })

    const stripe = Stripe(STRIPE_SECRET_KEY)

    const event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      STRIPE_WEBHOOK_CHECKOUT_SECRET
    )

    if (event.type === "checkout.session.completed") {
      const userbaseId = event.data.object.client_reference_id
      const customerId = event.data.object.customer
      const planId = event.data.object.display_items[0].plan.id

      const customer = await stripe.customers.update(customerId, {
        metadata: { userbaseId: userbaseId },
      })

      await axios.post(
        "https://v1.userbase.com/v1/admin/users/" + userbaseId,
        {
          protectedProfile: {
            stripeEmail: customer.email,
            stripePlanId: planId,
            stripeCustomerId: customer.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${USERBASE_ADMIN_API_ACCESS_TOKEN}`,
          },
        }
      )
    }

    console.log(`Stripe webhook succeeded`)

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`)

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }
}
