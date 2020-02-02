const stripe = require("stripe")

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_TEST_KEY = process.env.STRIPE_SECRET_TEST_KEY

const STRIPE_SUBSCRIPTION_PRODUCT_ID = ""
const STRIPE_TEST_SUBSCRIPTION_PRODUCT_ID = "prod_GeG75i7FeaZaBn"

const STRIPE_SUBSCRIPTION_YEARLY_ID = ""
const STRIPE_TEST_SUBSCRIPTION_YEARLY_ID = "plan_GeG8NY6XiKeFkC"

const STRIPE_SUBSCRIPTION_MONTHLY_ID = ""
const STRIPE_TEST_SUBSCRIPTION_MONTHLY_ID = "plan_GeG8h6QsMLXzsF"

const configureStripe = ({ isLive }) => {
  return stripe(isLive ? STRIPE_KEY : STRIPE_TEST_KEY)
}

const transformPlanId = ({ isLive, planId }) => {
  switch (planId) {
    case "yearly":
      return isLive
        ? STRIPE_SUBSCRIPTION_YEARLY_ID
        : STRIPE_TEST_SUBSCRIPTION_YEARLY_ID
    case "monthly":
      return isLive
        ? STRIPE_SUBSCRIPTION_MONTHLY_ID
        : STRIPE_TEST_SUBSCRIPTION_MONTHLY_ID
    default:
      return null
  }
}

const validProductId = ({ isLive }) => {
  return isLive
    ? STRIPE_SUBSCRIPTION_PRODUCT_ID
    : STRIPE_TEST_SUBSCRIPTION_PRODUCT_ID
}

class StripeUtil {
  constructor({ stripeEnv, ...params }) {
    const isLive = "live" === stripeEnv
    this.stripe = configureStripe({ isLive })
    this.validProductId = validProductId({ isLive })
    this.params = {
      ...params,
      planId: transformPlanId({ isLive, planId: params.planVariant }),
    }
  }

  async createCustomer() {
    const customer = await this.stripe.customers.create()
    return {
      customerId: customer.id,
    }
  }

  async createSubscriptionSession() {
    const session = await this.stripe.checkout.sessions.create({
      customer: this.params.customerId,
      payment_method_types: ["card"],
      subscription_data: {
        items: [
          {
            plan: this.params.planId,
          },
        ],
      },
      success_url: this.params.successUrl,
      cancel_url: this.params.cancelUrl,
    })
    return { sessionId: session.id }
  }

  async getSubscriptionForCustomer() {
    const subscriptions = await this.stripe.subscriptions.list({
      // Does not list canceled subscriptions
      customer: this.params.customerId,
    })

    const subscription = subscriptions.data.find((subscription) => {
      return this.validProductId === subscription.plan.product
    })

    if (!subscription) {
      return {
        subscriptionIsValid: false,
      }
    }

    // Stripe subscription statuses (https://stripe.com/docs/billing/lifecycle):
    // "trialing", "active",
    // "incomplete", "incomplete_expired",
    // "past_due", "canceled", "unpaid"

    const isValidSubscription = [
      "trialing",
      "active",
      "incomplete", // Let's see if it completes, before saying invalid on incomplete_expired
      "past_due", // Let's see if retries work, before saying invalid on unpaid
    ].includes(subscription.status)
    return {
      subscriptionId: subscription.id,
      subscriptionIsValid: isValidSubscription,
    }
  }
}

module.exports = StripeUtil
