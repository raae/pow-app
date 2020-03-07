const isSSG = typeof window === `undefined`
const liveUrl = "usepow.app"
const isLive = !isSSG && window.location.origin.endsWith(liveUrl)

export const BASE_URL = !isSSG ? window.location.origin : ""

export const STRIPE_KEY = isLive
  ? process.env.GATSBY_STRIPE_KEY
  : process.env.GATSBY_STRIPE_TEST_KEY

export const USERBASE_APP_ID = isLive
  ? process.env.GATSBY_USERBASE_APP_ID
  : process.env.GATSBY_USERBASE_TEST_APP_ID

export const GATSBY_AUTH_KEY = process.env.GATSBY_AUTH_KEY

export const DATABASES = [
  { databaseName: "entries", entity: "Entry" },
  { databaseName: "settings", entity: "Setting" },
]
