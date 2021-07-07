const createError = require("http-errors")
const Stripe = require("stripe")

const Userbase = require("../services/userbase")
const Userlist = require("../services/userlist")

const isStripeProd = (context) => {
  return context === "production"
}

module.exports = async (userbaseUserId, context) => {
  const {
    USERBASE_ADMIN_API_ACCESS_TOKEN,
    USERLIST_PUSH_KEY,
    STRIPE_SECRET_KEY,
  } = context

  const userbase = Userbase(USERBASE_ADMIN_API_ACCESS_TOKEN)
  const userlist = Userlist(USERLIST_PUSH_KEY)
  const stripe = Stripe(STRIPE_SECRET_KEY)
  const stripeEnv = isStripeProd(context.context)
    ? "prodStripeData"
    : "testStripeData"

  try {
    // Get the Userbase User and pluck data wanted
    const userbaseUser = await userbase.getUserbaseUser({ userbaseUserId })

    const {
      userId,
      email,
      username,
      creationDate,
      size,
      protectedProfile = {},
      profile = {},
    } = userbaseUser
    const { newsletter } = profile
    const {
      subscriptionId,
      subscriptionStatus,
      subscriptionPlanId,
      cancelSubscriptionAt,
    } = userbaseUser[stripeEnv]

    const properties = {
      username: username,
      size: size,
      subscription_status: subscriptionStatus,
      subscription_id: subscriptionId,
      subscription_plan_id: subscriptionPlanId,
      subscription_cancel_at: cancelSubscriptionAt,
    }

    if (newsletter == "1") {
      // Matches both 1 and "1"
      properties.newsletter = new Date(0)
    } else if (newsletter) {
      // Hopefully a date
      properties.newsletter = new Date(newsletter)
    }

    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      properties.subscription_created_at = new Date(subscription.created * 1000)
    } else if (protectedProfile.stripeCustomerId) {
      // Older users that cancelled before migrating to Userbase's integrated payment
      properties.subscription_id = protectedProfile.stripeCustomerId
      properties.subscription_plan_id = protectedProfile.stripePlanId
      properties.subscription_status = "canceled"
    }

    // Push data on user into Userlist
    await userlist.upsertUserlistSubscriber({
      identifier: userId,
      email: email,
      signed_up_at: creationDate,
      properties: properties,
    })

    return {
      message: "upsertUser success",
      userbaseUserId: userbaseUser.userId,
    }
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError("upsertUser: " + message)
  }
}
