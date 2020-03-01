const isProduction = process.env.CONTEXT === "production"

exports.STRIPE_SECRET_KEY = isProduction
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_TEST_KEY

exports.STRIPE_WEBHOOK_SECRET = isProduction
  ? process.env.STRIPE_WEBHOOK_SECRET
  : process.env.STRIPE_WEBHOOK_TEST_SECRET

exports.USERBASE_APP_ID = isProduction
  ? process.env.GATSBY_USERBASE_APP_ID
  : process.env.GATSBY_USERBASE_TEST_APP_ID

// Both test and production userbase apps are in the same admin account
exports.USERBASE_ADMIN_API_ACCESS_TOKEN =
  process.env.USERBASE_ADMIN_API_ACCESS_TOKEN
