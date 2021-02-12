const upsertUser = require("../upsertUser")

module.exports = async ({ body, context }) => {
  return upsertUser(
    { userbaseUserId: body.userbaseUserId, subscriptionDate: new Date() },
    context
  )
}
