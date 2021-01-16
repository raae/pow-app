export const IS_SSG = typeof window === `undefined`

export const BASE_URL = !IS_SSG ? window.location.origin : ""

export const USERBASE_APP_ID = process.env.GATSBY_USERBASE_APP_ID

export const STRIPE_KEY = process.env.GATSBY_STRIPE_KEY
export const STRIPE_MONTHLY_PLAN_ID = process.env.GATSBY_STRIPE_MONTHLY_PLAN_ID
export const STRIPE_YEARLY_PLAN_ID = process.env.GATSBY_STRIPE_YEARLY_PLAN_ID

export const SESSION_LENGTH =
  parseInt(process.env.GATSBY_USERBASE_SESSION_LENGTH) || 24 * 7 // a week

export const ENTRIES_DATABASE = { databaseName: "entries", entity: "Entry" }
export const SETTINGS_DATABASE = { databaseName: "settings", entity: "Setting" }

export const DATABASES = [ENTRIES_DATABASE, SETTINGS_DATABASE]
