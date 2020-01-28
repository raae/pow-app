const _ = require("lodash")
let STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY

if (process.env.CONTEXT !== "production") {
  STRIPE_API_KEY = process.env.STRIPE_SECRET_TEST_KEY
}

const stripe = require("stripe")(STRIPE_API_KEY)

exports.handler = async () => {
  try {
    const result = await stripe.customers.create({ metadata: { type: "user" } })

    return {
      statusCode: 200,
      body: JSON.stringify({ customer_id: result.id }, null, 2),
    }
  } catch (error) {
    console.warn(JSON.stringify(error, null, 2))
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error,
        },
        null,
        2
      ),
    }
  }
}
