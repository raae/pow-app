// Client env vars are baked into the bundle by Vite at build time.
// They keep their historical GATSBY_ prefix (see envPrefix in vite.config.js)
// so the variables configured in the Netlify UI — including the
// _PRODUCTION/_DEPLOY_PREVIEW variants swapped in by
// netlify-plugin-contextual-env — need no renaming.
const env = import.meta.env

// Tests run without a DOM
export const BASE_URL =
  typeof window !== "undefined" ? window.location.origin : ""

export const USERBASE_APP_ID = env.GATSBY_USERBASE_APP_ID

export const STRIPE_KEY = env.GATSBY_STRIPE_KEY
export const STRIPE_MONTHLY_PLAN_ID = env.GATSBY_STRIPE_MONTHLY_PLAN_ID
export const STRIPE_YEARLY_PLAN_ID = env.GATSBY_STRIPE_YEARLY_PLAN_ID

export const SESSION_LENGTH =
  parseInt(env.GATSBY_USERBASE_SESSION_LENGTH) || 24 * 7 // a week

export const FATHOM_ONBOARDING_1 = env.GATSBY_FATHOM_ONBOARDING_1
export const FATHOM_ONBOARDING_2 = env.GATSBY_FATHOM_ONBOARDING_2
export const FATHOM_ONBOARDING_3 = env.GATSBY_FATHOM_ONBOARDING_3
export const FATHOM_ONBOARDING_4 = env.GATSBY_FATHOM_ONBOARDING_4
export const FATHOM_FEEDBACK = env.GATSBY_FATHOM_FEEDBACK
export const FATHOM_CHANGELOG = env.GATSBY_FATHOM_CHANGELOG
export const FATHOM_MADE_BY = env.GATSBY_FATHOM_MADE_BY
export const FATHOM_SUPPORT = env.GATSBY_FATHOM_SUPPORT
export const FATHOM_EXPORT = env.GATSBY_FATHOM_EXPORT
export const FATHOM_DELETE_ALL_MENSES_TAGS =
  env.GATSBY_FATHOM_DELETE_ALL_MENSES_TAGS
export const FATHOM_DELETE_ALL_ENTRIES = env.GATSBY_FATHOM_DELETE_ALL_ENTRIES
export const FATHOM_DELETE_ALL_ENTRIES_CONFIRMED =
  env.GATSBY_FATHOM_DELETE_ALL_ENTRIES_CONFIRMED

export const ENTRIES_DATABASE = { databaseName: "entries", entity: "Entry" }
export const SETTINGS_DATABASE = { databaseName: "settings", entity: "Setting" }

export const DATABASES = [ENTRIES_DATABASE, SETTINGS_DATABASE]

// A missing critical var would otherwise surface as `undefined` deep inside
// the auth or payment flow — make it loud on first load instead.
const REQUIRED = {
  GATSBY_USERBASE_APP_ID: USERBASE_APP_ID,
  GATSBY_STRIPE_KEY: STRIPE_KEY,
  GATSBY_STRIPE_MONTHLY_PLAN_ID: STRIPE_MONTHLY_PLAN_ID,
  GATSBY_STRIPE_YEARLY_PLAN_ID: STRIPE_YEARLY_PLAN_ID,
}

const missing = Object.keys(REQUIRED).filter((key) => !REQUIRED[key])

if (missing.length > 0) {
  console.error(`Missing environment variable(s): ${missing.join(", ")}`)
}
