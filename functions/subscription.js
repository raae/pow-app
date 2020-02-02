const _ = require("lodash")
const StripeUtil = require("./utils")

exports.handler = async ({ httpMethod, queryStringParameters: params }) => {
  const stripe = new StripeUtil(params)
  try {
    let response = {}

    if (httpMethod === "POST") {
      const session = await stripe.createSubscriptionSession()
      response = {
        ...session,
      }
    } else if (httpMethod === "GET") {
      const subscription = await stripe.getSubscriptionForCustomer()
      response = {
        ...subscription,
      }
    } else {
      throw new Error("Unsupported httpMethod", httpMethod)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response, null, 2),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: error.message,
        },
        null,
        2
      ),
    }
  }
}
