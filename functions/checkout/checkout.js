const Stripe = require("stripe")
const axios = require("axios")

function getEnvVariables(variables, { keys, context = "" }) {
  const contextSuffix = `${context}`.toUpperCase().replace(/-/g, "_")

  return keys.reduce((acc, key) => {
    let envKey = `${key}_${contextSuffix}`
    acc[key] = variables[envKey] || variables[key]
    return acc
  }, {})
}

function getStripeEvent(req, { context }) {
  const keys = ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_CHECKOUT_SECRET"]

  try {
    // Deploy preview
    const {
      STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_CHECKOUT_SECRET,
    } = getEnvVariables(process.env, { keys, context })

    console.log({ STRIPE_SECRET_KEY, STRIPE_WEBHOOK_CHECKOUT_SECRET })

    const stripe = Stripe(STRIPE_SECRET_KEY)
    const event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      STRIPE_WEBHOOK_CHECKOUT_SECRET
    )

    console.log(`Valid Stripe ${context} event`)
    return event
  } catch (error) {
    console.warn(`Not a valid Stripe ${context} event:`, error.message)
    return undefined
  }
}

exports.handler = async (req) => {
  try {
    let context = "production"
    let event = getStripeEvent(req, { context })

    if (!event) {
      context = "deploy-preview"
      event = getStripeEvent(req, { context })
    }

    if (!event) {
      context = "development"
      event = getStripeEvent(req, { context })
    }

    if (!event || event.type !== "checkout.session.completed") {
      throw new Error("Not a valid Stripe event")
    }

    const {
      USERBASE_ADMIN_API_ACCESS_TOKEN,
      STRIPE_SECRET_KEY,
    } = getEnvVariables(process.env, {
      keys: ["USERBASE_ADMIN_API_ACCESS_TOKEN", "STRIPE_SECRET_KEY"],
      context,
    })

    const stripe = Stripe(STRIPE_SECRET_KEY)
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
