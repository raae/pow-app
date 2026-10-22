import { createRequire } from "module"

// Exercises the deployed entry (netlify/functions/user.js). It lives here
// because every file in netlify/functions is deployed as a function.
// The function is CommonJS, so load it (and the axios/stripe instances it
// shares) through require rather than ESM imports.
const require = createRequire(import.meta.url)
const axios = require("axios")
const Stripe = require("stripe")

const WEBHOOK_SECRET = "whsec_test"

const outbound = []

// Stand in for the Userbase admin API and ConvertKit.
axios.defaults.adapter = async (config) => {
  outbound.push(`${config.method.toUpperCase()} ${config.url}`)
  let data = {}
  if (config.url.startsWith("users/")) {
    data = {
      userId: "u1",
      email: "pow@example.com",
      creationDate: "2026-01-01",
      protectedProfile: {},
    }
  } else if (config.url.startsWith("auth-tokens/")) {
    data = { userId: "u1" }
  } else if (config.url.includes("subscribe")) {
    data = { subscription: { subscriber: { id: 42 } } }
  }
  return { data, status: 200, statusText: "OK", headers: {}, config }
}

process.env.STRIPE_SECRET_KEY = "sk_test_dummy"
process.env.STRIPE_WEBHOOK_SUBSCRIBED_SECRET_DEPLOY_PREVIEW = WEBHOOK_SECRET
process.env.USERBASE_ADMIN_API_ACCESS_TOKEN = "token"
process.env.CONVERTKIT_API_SECRET = "secret"
process.env.CONVERTKIT_FORM_ID = "form"

const { handler } = require("../../functions/user.js")

const invoke = (path, { body, headers = {}, query = {} }) =>
  handler(
    {
      path: `/.netlify/functions/user${path}`,
      httpMethod: "POST",
      headers: { "content-type": "application/json", ...headers },
      queryStringParameters: query,
      multiValueQueryStringParameters: Object.fromEntries(
        Object.entries(query).map(([key, value]) => [key, [value]])
      ),
      body,
      isBase64Encoded: false,
    },
    {}
  )

const subscriptionEvent = JSON.stringify({
  id: "evt_test",
  object: "event",
  type: "customer.subscription.created",
  data: {
    object: {
      current_period_start: 1760000000,
      metadata: { __userbase_user_id: "u1" },
    },
  },
})

describe("user function", () => {
  beforeEach(() => {
    outbound.length = 0
  })

  test("accepts a correctly signed Stripe webhook (raw body intact)", async () => {
    const signature = Stripe(
      "sk_test_dummy"
    ).webhooks.generateTestHeaderString({
      payload: subscriptionEvent,
      secret: WEBHOOK_SECRET,
    })

    const response = await invoke("/subscribed", {
      body: subscriptionEvent,
      headers: { "stripe-signature": signature },
      query: { context: "deploy-preview" },
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toMatchObject({
      userbaseUserId: "u1",
      convertKitSubscriberId: 42,
    })
    expect(outbound).toContain("GET users/u1")
  })

  test("rejects a webhook with a bad signature", async () => {
    const response = await invoke("/subscribed", {
      body: subscriptionEvent,
      headers: { "stripe-signature": "t=1,v1=bad" },
      query: { context: "deploy-preview" },
    })

    expect(response.statusCode).toBe(401)
    expect(outbound).toEqual([])
  })

  test("requires a context query param", async () => {
    const response = await invoke("/subscribed", { body: subscriptionEvent })

    expect(response.statusCode).toBe(400)
  })

  test("handles the sign-up hook", async () => {
    const response = await invoke("/created", {
      body: JSON.stringify({ userbaseUserId: "u1", userbaseAuthToken: "tok" }),
      query: { context: "production" },
    })

    expect(response.statusCode).toBe(200)
    expect(outbound).toContain("GET auth-tokens/tok")
  })
})
