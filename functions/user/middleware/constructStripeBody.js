const createError = require("http-errors")

const Stripe = require("stripe")

module.exports = ({ secretKey }) => {
  return async (request, response, next) => {
    const { context } = request
    try {
      const stripe = Stripe(context.STRIPE_SECRET_KEY)
      const event = stripe.webhooks.constructEvent(
        request.body,
        request.headers["stripe-signature"],
        context[secretKey]
      )

      request.body = event.data.object
      console.log(request.body)
      next()
    } catch (error) {
      const { message } = error.response?.data || error.request?.data || error
      next(new createError.Unauthorized("Stripe: " + message))
    }
  }
}
