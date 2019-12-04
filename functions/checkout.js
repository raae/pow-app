let STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY

if (process.env.CONTEXT !== "production") {
  STRIPE_API_KEY = process.env.STRIPE_SECRET_TEST_KEY
}

const stripe = require("stripe")(STRIPE_API_KEY)

exports.handler = async ({ body }) => {
  const params = JSON.parse(body)
  try {
    const lineItems = params.line_items ? params.line_items : [params.line_item]
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: params.success_url,
      cancel_url: params.cancel_url,
    })
    const body = {
      session_id: session.id,
    }
    console.info(body)
    return {
      statusCode: 200,
      body: JSON.stringify(body, null, 2),
    }
  } catch (error) {
    console.warn(error)
    const body = {
      error: error.message,
    }
    return {
      statusCode: 500,
      body: JSON.stringify(body, null, 2),
    }
  }
}
