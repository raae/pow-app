const constants = require("./constants")
const stripe = require("stripe")(constants.STRIPE_SECRET_KEY)
const request = require("request-promise-native")

exports.handler = async (req) => {
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      constants.STRIPE_WEBHOOK_SECRET
    )

    if (event.type === "checkout.session.completed") {
      const userbaseId = event.data.object.client_reference_id
      const customerId = event.data.object.customer
      const planId = event.data.object.display_items[0].plan.id

      const customer = await stripe.customers.update(customerId, {
        metadata: { userbaseId: userbaseId },
      })

      console.log(JSON.stringify(customer, null, 2))

      // set payment flag on user's protected profile
      await request({
        method: "POST",
        uri: "https://v1.userbase.com/v1/admin/users/" + userbaseId,
        auth: {
          bearer: constants.USERBASE_ADMIN_API_ACCESS_TOKEN,
        },
        json: true,
        body: {
          protectedProfile: {
            stripeEmail: customer.email,
            stripePlanId: planId,
            stripeCustomerId: customer.id,
          },
        },
      }).promise()
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
