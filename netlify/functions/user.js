const serverless = require("serverless-http")

// The function's public URL — /.netlify/functions/user/* — is wired into
// external services (the Stripe webhook, the sign-up hook); the filename and
// this base path must not change.
const app = require("../functions-lib/user/index.js")(
  "/.netlify/functions/user"
)

module.exports.handler = serverless(app)
