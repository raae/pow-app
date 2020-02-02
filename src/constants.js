const isSSG = typeof window === `undefined`
const liveUrl = "usepow.app"
const isLive = !isSSG && window.location.origin === liveUrl

export const BASE_URL = !isSSG ? window.location.origin : ""

export const STRIPE_ENV = isLive ? "live" : "test"

export const STRIPE_KEY = isLive
  ? process.env.GATSBY_STRIPE_KEY
  : process.env.GATSBY_STRIPE_TEST_KEY

export const GATSBY_AUTH_KEY = process.env.GATSBY_AUTH_KEY

if (!isLive) {
  console.table({ BASE_URL, STRIPE_ENV, STRIPE_KEY, GATSBY_AUTH_KEY })
}
