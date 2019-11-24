const _ = require("lodash")

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_SECRET_TEST_KEY = process.env.STRIPE_SECRET_TEST_KEY

const isAuthorized = ({ authorization }) => {
  return authorization && authorization.includes(process.env.GATSBY_AUTH_KEY)
}

exports.handler = async ({ headers, queryStringParameters: params }) => {
  if (!isAuthorized(headers)) {
    return {
      statusCode: 401,
      body: "Unauthorized",
    }
  }

  try {
    let stripe = require("stripe")(STRIPE_SECRET_KEY)

    if (!params.stripePublicKey || params.stripePublicKey.includes("test")) {
      stripe = require("stripe")(STRIPE_SECRET_TEST_KEY)
    }

    const result = await stripe.events.list({
      type: "checkout.session.completed",
      limit: 100,
    })

    const eventsBySkuId = _.groupBy(
      result.data,
      "data.object.display_items[0].sku.id"
    )

    const eventsCountBySkuId = _.mapValues(
      eventsBySkuId,
      (value) => value.length
    )

    return {
      statusCode: 200,
      body: JSON.stringify(eventsCountBySkuId, null, 2),
    }
  } catch (error) {
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
