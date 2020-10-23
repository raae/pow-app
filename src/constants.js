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

export const SESSION_LENGTH = process.env.SESSION_LENGTH || 24 * 7 // a week

export const ENTRIES_DATABASE = { databaseName: "entries", entity: "Entry" }
export const SETTINGS_DATABASE ={ databaseName: "settings", entity: "Setting" }

export const DATABASES = [
  ENTRIES_DATABASE,
  SETTINGS_DATABASE
]
