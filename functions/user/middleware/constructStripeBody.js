const createError = require("http-errors")

const Stripe = require("stripe")

module.exports = ({ webhookSecretName }) => {
  return async (request, response, next) => {
    const { context } = request
    const webhookSecret = context[webhookSecretName]
    try {
      const stripe = Stripe(context.STRIPE_SECRET_KEY)
      const event = stripe.webhooks.constructEvent(
        request.body,
        request.headers["stripe-signature"],
        webhookSecret
      )

      request.body = event.data.object
      next()
    } catch (error) {
      const { message } = error.response?.data || error.request?.data || error
      next(new createError.Unauthorized("Stripe: " + message))
    }
  }
}
