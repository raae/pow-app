export const ENV = process.env.ENV

export const IS_SSG = typeof window === `undefined`

export const BASE_URL = !IS_SSG ? window.location.origin : ""

export const USERBASE_APP_ID = process.env.GATSBY_USERBASE_APP_ID

export const STRIPE_KEY = process.env.GATSBY_STRIPE_KEY
export const STRIPE_MONTHLY_PLAN_ID = process.env.GATSBY_STRIPE_MONTHLY_PLAN_ID
export const STRIPE_YEARLY_PLAN_ID = process.env.GATSBY_STRIPE_YEARLY_PLAN_ID

export const SESSION_LENGTH =
  parseInt(process.env.GATSBY_USERBASE_SESSION_LENGTH) || 24 * 7 // a week

export const FATHOM_ONBOARDING_1 = process.env.GATSBY_FATHOM_ONBOARDING_1
export const FATHOM_ONBOARDING_2 = process.env.GATSBY_FATHOM_ONBOARDING_2
export const FATHOM_ONBOARDING_3 = process.env.GATSBY_FATHOM_ONBOARDING_3
export const FATHOM_ONBOARDING_4 = process.env.GATSBY_FATHOM_ONBOARDING_4
export const FATHOM_FEEDBACK = process.env.GATSBY_FATHOM_FEEDBACK
export const FATHOM_CHANGELOG = process.env.GATSBY_FATHOM_CHANGELOG
export const FATHOM_MADE_BY = process.env.GATSBY_FATHOM_MADE_BY
export const FATHOM_SUPPORT = process.env.GATSBY_FATHOM_SUPPORT
export const FATHOM_EXPORT = process.env.GATSBY_FATHOM_EXPORT
export const FATHOM_DELETE_ALL_ENTRIES = process.env.GATSBY_FATHOM_DELETE_ALL_ENTRIES
export const FATHOM_DELETE_ALL_ENTRIES_CONFIRMED = process.env.GATSBY_FATHOM_DELETE_ALL_ENTRIES_CONFIRMED

export const ENTRIES_DATABASE = { databaseName: "entries", entity: "Entry" }
export const SETTINGS_DATABASE = { databaseName: "settings", entity: "Setting" }

export const DATABASES = [ENTRIES_DATABASE, SETTINGS_DATABASE]
