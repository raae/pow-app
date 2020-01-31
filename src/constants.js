const isSSG = typeof window === `undefined`
const liveUrl = "usepow.app"
const isLive = !isSSG && window.location.origin === liveUrl

export const BASE_URL = !isSSG ? window.location.origin : ""

export const STRIPE_KEY = isLive
  ? process.env.GATSBY_STRIPE_KEY
  : process.env.GATSBY_STRIPE_TEST_KEY

export const STRIPE_MONTHLY_PLAN = "plan_GeG8h6QsMLXzsF"
export const STRIPE_YEARLY_PLAN = "plan_GeG8NY6XiKeFkC"
export const STRIPE_LIFETIME_PLAN = "sku_GeGAvjKLSvxFDd"

export const GATSBY_AUTH_KEY = process.env.GATSBY_AUTH_KEY

if (!isLive) {
  console.table({ BASE_URL, STRIPE_KEY, GATSBY_AUTH_KEY })
}
